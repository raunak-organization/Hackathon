'use client';

import React from 'react';
import { Rocket, Box, TestTube, CheckCircle } from 'lucide-react';

export const DeploymentPipeline = () => {
  return (
    <>
      <div className="section">
        <h2 className="sectionTitle">
          <Rocket size={20} />
          Active Deployment Pipeline
        </h2>

        <div className="pipelineContainer">
          <div className="pipelineStep">
            <div className="stepIcon success">
              <Box size={20} />
            </div>
            <span className="stepLabel success">Build</span>
          </div>

          <div className="pipelineConnector" />

          <div className="pipelineStep">
            <div className="stepIcon active">
              <TestTube size={20} />
            </div>
            <span className="stepLabel active">Test</span>
          </div>

          <div className="pipelineConnector" />

          <div className="pipelineStep">
            <div className="stepIcon">
              <Rocket size={20} />
            </div>
            <span className="stepLabel">Deploy</span>
          </div>

          <div className="pipelineConnector" />

          <div className="pipelineStep">
            <div className="stepIcon">
              <CheckCircle size={20} />
            </div>
            <span className="stepLabel">Complete</span>
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
        .pipelineContainer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 2rem;
          position: relative;
        }
        .pipelineStep {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          z-index: 2;
          position: relative;
        }
        .stepIcon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          transition: var(--transition);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .stepIcon.active {
          color: var(--bg-primary);
          background-color: var(--text-primary);
          border-color: var(--text-primary);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
        }
        .stepIcon.success {
          color: var(--bg-primary);
          background-color: var(--accent-green);
          border-color: var(--accent-green);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
        }
        .stepLabel {
          font-weight: 500;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .stepLabel.active,
        .stepLabel.success {
          color: var(--text-primary);
        }
        .pipelineConnector {
          flex: 1;
          height: 1px;
          background-color: var(--border);
          margin: 0 1rem;
          position: relative;
          top: -12px;
          z-index: 1;
        }
        .pipelineConnector.active {
          background-color: var(--text-secondary);
        }
      `}</style>
    </>
  );
};
