'use client';

import React from 'react';
import { Terminal } from 'lucide-react';

export const LogsTerminal = () => {
  return (
    <>
      <div className="section">
        <h2 className="sectionTitle">
          <Terminal size={20} />
          System Logs
        </h2>

        <div className="terminal">
          <div className="terminalHeader">
            <div className="terminalDot red" />
            <div className="terminalDot yellow" />
            <div className="terminalDot green" />
            <span className="terminalTitle">Deploying api-service...</span>
          </div>

          <div className="terminalContent">
            <div className="logLine">
              <span className="logTime">10:42:01</span>
              <span className="logInfo">
                [INFO] Starting deployment process for api-service...
              </span>
            </div>
            <div className="logLine">
              <span className="logTime">10:42:05</span>
              <span className="logInfo">
                [INFO] Fetching latest commit: 8f9a2b1...
              </span>
            </div>
            <div className="logLine">
              <span className="logTime">10:42:10</span>
              <span className="logInfo">
                [INFO] Installing dependencies via pnpm...
              </span>
            </div>
            <div className="logLine">
              <span className="logTime">10:42:45</span>
              <span className="logSuccess">
                [SUCCESS] Dependencies installed.
              </span>
            </div>
            <div className="logLine">
              <span className="logTime">10:42:48</span>
              <span className="logInfo">[INFO] Running tests (Jest)...</span>
            </div>
            <div className="logLine">
              <span className="logTime">10:43:10</span>
              <span className="logWarning">
                [WARN] 2 tests skipped in User service.
              </span>
            </div>
            <div className="logLine">
              <span className="logTime">10:43:12</span>
              <span className="logInfo">[INFO] Building Docker image...</span>
            </div>
            <div className="logLine" style={{ marginTop: '1.5rem' }}>
              <span className="logInfo">
                Building layers... <span className="cursor-blink">_</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .section {
          margin-bottom: 2.5rem;
        }
        .sectionTitle {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: -0.01em;
        }
        .terminal {
          background-color: #0b0c0f;
          border-radius: var(--border-radius);
          border: 1px solid var(--border);
          overflow: hidden;
          font-family: 'Geist Mono', monospace;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .terminalHeader {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background-color: #0a0a0a;
          border-bottom: 1px solid var(--border);
        }
        .terminalDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .terminalDot.red {
          background-color: #ff5f56;
        }
        .terminalDot.yellow {
          background-color: #ffbd2e;
        }
        .terminalDot.green {
          background-color: #27c93f;
        }
        .terminalTitle {
          margin-left: 1rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .terminalContent {
          padding: 1.5rem;
          height: 300px;
          overflow-y: auto;
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .logLine {
          margin-bottom: 0.25rem;
          color: #a1a1aa;
        }
        .logTime {
          color: #52525b;
          margin-right: 1rem;
        }
        .logInfo {
          color: var(--text-primary);
        }
        .logSuccess {
          color: var(--accent-green);
        }
        .logWarning {
          color: var(--accent-amber);
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
