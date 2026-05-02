import path from 'node:path';
import fs from 'node:fs';
import { deployModel } from '../module/deploy/deploy.model.js';
import { runCommand } from '../utils/exec.js';
import { appendLog } from './logger.service.js';
import { BadRequestError, NotFoundError } from '../utils/appError.js';
import { projectModel } from '../module/project/project.model.js';

const updateStatus = async (
  id: string,
  status: 'pending' | 'building' | 'success' | 'failed',
) => {
  await deployModel.findByIdAndUpdate(id, { status });
};

export const detectPackageManager = (dir: string): 'npm' | 'yarn' | 'pnpm' => {
  if (
    fs.existsSync(path.join(dir, 'pnpm-lock.yaml')) ||
    fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))
  )
    return 'pnpm';
  if (fs.existsSync(path.join(dir, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(dir, 'package-lock.json'))) return 'npm';

  const packageJsonPath = path.join(dir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as {
      packageManager?: string;
    };

    if (packageJson.packageManager?.includes('pnpm')) {
      return 'pnpm';
    }

    if (packageJson.packageManager?.includes('yarn')) {
      return 'yarn';
    }
  }

  return 'npm';
};

export const runBuild = async (deploymentId: string) => {
  const deployment = await deployModel.findById(deploymentId);
  if (!deployment) throw new NotFoundError('Deployment not found');

  const project = await projectModel.findById(deployment.projectId);
  if (!project) throw new NotFoundError('Project not found');

  const repoUrl = project.repoUrl;
  const dir = path.join(process.cwd(), 'storage', 'deployments', deploymentId);

  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });

  try {
    await updateStatus(deploymentId, 'building');

    // 1. Clone repo
    await runCommand('git', ['clone', repoUrl, dir], deploymentId);

    // 2. Validate repo structure
    const rootIndexHtml = fs.existsSync(path.join(dir, 'index.html'));
    const hasPackageJson = fs.existsSync(path.join(dir, 'package.json'));

    // 3. Detect static website
    if (rootIndexHtml && !hasPackageJson) {
      await deployModel.findByIdAndUpdate(deploymentId, {
        status: 'success',
        deployUrl: `/api/deploy/${deploymentId}`,
        buildPath: '',
      });

      await projectModel.findByIdAndUpdate(deployment.projectId, {
        currentDeploymentId: deploymentId,
      });

      appendLog(deploymentId, 'Static website detected. No build required.\n');

      return;
    }

    if (!hasPackageJson) {
      throw new BadRequestError(
        'Unsupported repo structure: no package.json or index.html found',
      );
    }

    // 4. Validate package.json exists
    const packageJsonPath = path.join(dir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      throw new NotFoundError('package.json not found');
    }

    // 3. Validate build script exists
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as {
      scripts?: Record<string, string>;
    };

    if (!packageJson.scripts?.build) {
      throw new NotFoundError('Build script not found');
    }

    // 3. Detect package manager
    const pm = detectPackageManager(dir);

    // 4. Create .env file
    if (deployment.env) {
      const envContent = Object.entries(deployment.env)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      fs.writeFileSync(path.join(dir, '.env'), envContent);
    }

    // 5. Install deps
    if (pm === 'pnpm') {
      await runCommand('pnpm', ['install'], deploymentId, dir);
    } else if (pm === 'yarn') {
      await runCommand('yarn', [], deploymentId, dir);
    } else {
      if (pm === 'npm') {
        if (fs.existsSync(path.join(dir, 'package-lock.json'))) {
          await runCommand('npm', ['ci'], deploymentId, dir);
        } else {
          await runCommand('npm', ['install'], deploymentId, dir);
        }
      }
    }

    // 6. Build
    if (pm === 'pnpm') {
      await runCommand('pnpm', ['run', 'build'], deploymentId, dir);
    } else if (pm === 'yarn') {
      await runCommand('yarn', ['build'], deploymentId, dir);
    } else {
      await runCommand('npm', ['run', 'build'], deploymentId, dir);
    }

    // 7. Detect build folder
    const possibleDirs = ['dist', 'build', 'out'];
    let buildPath = '';

    for (const folder of possibleDirs) {
      if (fs.existsSync(path.join(dir, folder))) {
        buildPath = folder;
        break;
      }
    }

    if (!buildPath) {
      throw new NotFoundError('No static output folder found after build');
    }

    if (
      fs.existsSync(path.join(dir, '.next')) &&
      !fs.existsSync(path.join(dir, 'out'))
    ) {
      throw new BadRequestError(
        'SSR frameworks not supported. Only static exports are allowed.',
      );
    }

    const deployUrl = `/api/deploy/${deploymentId}`;

    await deployModel.findByIdAndUpdate(deploymentId, {
      status: 'success',
      deployUrl,
      buildPath,
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
