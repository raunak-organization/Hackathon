'use client';

import React from 'react';
import { Terminal } from 'lucide-react';

export const LogsTerminal = () => {
  return (
    <div className="mb-10">
      {/* Title */}
      <h2 className="flex items-center gap-2 mb-5 text-[1.15rem] font-semibold tracking-tight text-(--text-primary)">
        <Terminal size={20} />
        System Logs
      </h2>

      {/* Terminal */}
      <div className="bg-[#0b0c0f] rounded-(--border-radius) border border-(--border) overflow-hidden font-mono shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-(--border)">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />

          <span className="ml-4 text-[0.8rem] text-(--text-secondary)">
            Deploying api-service...
          </span>
        </div>

        {/* Content */}
        <div className="p-6 h-[300px] overflow-y-auto text-[0.85rem] leading-relaxed">
          {/* Line */}
          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:42:01</span>
            <span className="text-(--text-primary)">
              [INFO] Starting deployment process for api-service...
            </span>
          </div>

          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:42:05</span>
            <span className="text-(--text-primary)">
              [INFO] Fetching latest commit: 8f9a2b1...
            </span>
          </div>

          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:42:10</span>
            <span className="text-(--text-primary)">
              [INFO] Installing dependencies via pnpm...
            </span>
          </div>

          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:42:45</span>
            <span className="text-(--accent-green)">
              [SUCCESS] Dependencies installed.
            </span>
          </div>

          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:42:48</span>
            <span className="text-(--text-primary)">
              [INFO] Running tests (Jest)...
            </span>
          </div>

          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:43:10</span>
            <span className="text-(--accent-amber)">
              [WARN] 2 tests skipped in User service.
            </span>
          </div>

          <div className="mb-1 text-[#a1a1aa]">
            <span className="mr-4 text-[#52525b]">10:43:12</span>
            <span className="text-(--text-primary)">
              [INFO] Building Docker image...
            </span>
          </div>

          {/* Last line */}
          <div className="mt-6 text-[#a1a1aa]">
            <span className="text-(--text-primary)">
              Building layers...
              <span className="ml-1 animate-pulse">_</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
