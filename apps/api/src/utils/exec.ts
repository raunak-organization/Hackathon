import { spawn } from 'child_process';
import { appendLog } from '../services/logger.service.js';

export const runCommand = async (
  command: string,
  args: string[],
  deploymentId: string,
  cwd?: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'pipe', shell: false });

    child.stdout.on('data', (data: Buffer) => {
      appendLog(deploymentId, data.toString());
    });

    child.stderr.on('data', (data: Buffer) => {
      appendLog(deploymentId, data.toString());
    });

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${command}`));
    });
  });
};
