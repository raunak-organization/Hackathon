import { deployModel } from '../module/deploy/deploy.model.js';

const logBuffer: Record<string, string[]> = {};

export const appendLog = (deploymentId: string, log: string) => {
  if (!logBuffer[deploymentId]) {
    logBuffer[deploymentId] = [];
  }

  logBuffer[deploymentId].push(log);
};

// flush logs every 1 second
setInterval(async () => {
  for (const deploymentId in logBuffer) {
    const logs = logBuffer[deploymentId];

    if (!logs || logs.length === 0) continue;

    await deployModel.findByIdAndUpdate(deploymentId, {
      $push: {
        logs: {
          $each: logs,
        },
      },
    });

    logBuffer[deploymentId] = [];
  }
}, 1000);
