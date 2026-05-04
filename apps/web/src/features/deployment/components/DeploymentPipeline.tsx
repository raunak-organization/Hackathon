'use client';

import { Rocket, Box, TestTube, CheckCircle } from 'lucide-react';

const steps = [
  { label: 'Build', icon: Box, status: 'success' },
  { label: 'Test', icon: TestTube, status: 'active' },
  { label: 'Deploy', icon: Rocket },
  { label: 'Complete', icon: CheckCircle },
];

export const DeploymentPipeline = () => {
  return (
    <div className="mb-10">
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-5">
        <Rocket size={18} />
        Active Deployment Pipeline
      </h2>

      {/* Scrollable on mobile so the pipeline stays connected */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="flex items-center justify-between p-6 sm:p-8 border rounded-lg bg-(--bg-primary) border-(--border) min-w-[360px]">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-full border
                    ${
                      step.status === 'active'
                        ? 'bg-white text-black'
                        : step.status === 'success'
                          ? 'bg-green-500 text-white border-green-500'
                          : 'text-(--text-secondary) border-(--border)'
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <span className="text-sm">{step.label}</span>
                </div>

                {i !== steps.length - 1 && (
                  <div className="flex-1 h-px bg-(--border) mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
