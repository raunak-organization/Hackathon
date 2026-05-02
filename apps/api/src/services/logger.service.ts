import { deployModel } from '../module/deploy/deploy.model.js';

const logBuffer: Record<string, string[]> = {};

export const appendLog = (deploymentId: string, log: string) => {
  if (!logBuffer[deploymentId]) {
    logBuffer[deploymentId] = [];
  }

  logBuffer[deploymentId].push(log);
};

setInterval(async () => {
  for (const deploymentId in logBuffer) {
    const logs = logBuffer[deploymentId];

    if (!logs?.length) continue;

    await deployModel.findByIdAndUpdate(deploymentId, {
      $push: {
        logs: {
          $each: logs,
        },
      },
    });
    logBuffer[deploymentId] = [];
  }
}, 2000);
