import path from 'node:path';
import fs from 'node:fs';
import { deployModel } from '../module/deploy/deploy.model.js';
import { runCommand } from '../utils/exec.js';
import { appendLog } from './logger.service.js';
import { BadRequestError, NotFoundError } from '../utils/appError.js';
import { projectModel } from '../module/project/project.model.js';

type PackageJson = {
  scripts?: Record<string, string>;
};

const updateStatus = async (
  id: string,
  status: 'pending' | 'building' | 'success' | 'failed',
) => {
  await deployModel.findByIdAndUpdate(id, { status });
};

export const runBuild = async (deploymentId: string) => {
  const deployment = await deployModel.findById(deploymentId);
  if (!deployment) throw new NotFoundError('Deployment not found');

  const project = await projectModel.findById(deployment.projectId);
  if (!project) throw new NotFoundError('Project not found');

  const repoUrl = project.repoUrl;

  const rootDir = path.resolve(process.cwd(), '..', '..');

  const baseDir = path.join(rootDir, 'storage', 'deployments', deploymentId);

  const repoDir = path.join(baseDir, 'repo');
  const isolatedDir = path.join(baseDir, 'app'); // 👈 IMPORTANT
  const outputDir = path.join(baseDir, 'public');

  // reset
  fs.rmSync(baseDir, { recursive: true, force: true });
  fs.mkdirSync(baseDir, { recursive: true });

  try {
    await updateStatus(deploymentId, 'building');

    // 1. clone repo
    await runCommand('git', ['clone', repoUrl, repoDir], deploymentId);

    // 2. detect app root inside repo
    const appDir = fs.existsSync(path.join(repoDir, 'package.json'))
      ? repoDir
      : findAppDir(repoDir);

    const indexHtmlPath = path.join(repoDir, 'index.html');
    const hasIndexHtml = fs.existsSync(indexHtmlPath);

    const packageJsonPath = path.join(appDir, 'package.json');
    const hasPackageJson = fs.existsSync(packageJsonPath);

    // =========================================================
    // CASE 1: STATIC SITE (NO package.json)
    // =========================================================
    if (hasIndexHtml && !hasPackageJson) {
      fs.cpSync(repoDir, outputDir, { recursive: true });

      await deployModel.findByIdAndUpdate(deploymentId, {
        status: 'success',
        deployUrl: `/api/static/${deploymentId}`,
        buildPath: 'public',
      });

      await projectModel.findByIdAndUpdate(deployment.projectId, {
        currentDeploymentId: deploymentId,
      });

      appendLog(deploymentId, 'Static site deployed\n');
      return;
    }

    if (!hasPackageJson) {
      throw new BadRequestError('No package.json found');
    }

    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJson;

    if (!packageJson.scripts?.build) {
      throw new BadRequestError('Build script missing');
    }

    // =========================================================
    // 🔥 ISOLATION STEP (IMPORTANT)
    // =========================================================

    // copy ONLY app into clean sandbox
    fs.mkdirSync(isolatedDir, { recursive: true });

    fs.cpSync(appDir, isolatedDir, {
      recursive: true,
      filter: (src) => {
        // exclude node_modules, .git, etc
        return !src.includes('node_modules') && !src.includes('.git');
      },
    });

    // =========================================================
    // 3. INSTALL (inside isolated folder ONLY)
    // =========================================================
    await runCommand('npm', ['install'], deploymentId, isolatedDir);

    // =========================================================
    // 4. BUILD (inside isolated folder ONLY)
    // =========================================================
    await runCommand('npm', ['run', 'build'], deploymentId, isolatedDir);

    // =========================================================
    // 5. detect build output
    // =========================================================
    const possibleDirs = ['dist', 'build', 'out'];
    let buildPath = '';

    for (const folder of possibleDirs) {
      const full = path.join(isolatedDir, folder);
      if (fs.existsSync(full)) {
        buildPath = full;
        break;
      }
    }

    if (!buildPath) {
      throw new NotFoundError('Build output not found');
    }

    // =========================================================
    // 6. copy to public storage
    // =========================================================
    fs.mkdirSync(outputDir, { recursive: true });

    fs.cpSync(buildPath, outputDir, { recursive: true });

    // =========================================================
    // 7. save deployment
    // =========================================================
    await deployModel.findByIdAndUpdate(deploymentId, {
      status: 'success',
      deployUrl: `/api/static/${deploymentId}`,
      buildPath: 'public',
    });

    await projectModel.findByIdAndUpdate(deployment.projectId, {
      currentDeploymentId: deploymentId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';

    appendLog(deploymentId, `\nERROR: ${message}`);
    await updateStatus(deploymentId, 'failed');
  }
};

// helper
const findAppDir = (dir: string): string => {
  if (fs.existsSync(path.join(dir, 'package.json'))) return dir;

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const full = path.join(dir, item);

    if (
      fs.existsSync(full) &&
      fs.statSync(full).isDirectory() &&
      fs.existsSync(path.join(full, 'package.json'))
    ) {
      return full;
    }
  }

  return dir;
};
