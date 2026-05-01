'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = '', label, error, leftIcon, rightIcon, id, ...props },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = id || `input-${reactId}`;

    return (
      <>
        <div className={`wrapper ${className}`}>
          {label && (
            <label htmlFor={inputId} className="label">
              {label}
            </label>
          )}
          <div className="inputContainer">
            {leftIcon && <span className="leftIcon">{leftIcon}</span>}
            <input
              id={inputId}
              ref={ref}
              className={`input ${leftIcon ? 'hasLeftIcon' : ''} ${rightIcon ? 'hasRightIcon' : ''} ${error ? 'hasError' : ''}`}
              {...props}
            />
            {rightIcon && <span className="rightIcon">{rightIcon}</span>}
          </div>
          {error && <span className="errorText">{error}</span>}
        </div>
        <style jsx>{`
          .wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }
          .label {
            font-size: 0.875rem;
            color: var(--text-secondary);
            font-weight: 500;
          }
          .inputContainer {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input {
            width: 100%;
            background-color: var(--bg-primary);
            border: 1px solid var(--border);
            border-radius: var(--border-radius);
            color: var(--text-primary);
            padding: 0.6rem 0.75rem;
            font-size: 0.95rem;
            font-family: inherit;
            transition: var(--transition);
            outline: none;
          }
          .input::placeholder {
            color: #52525b;
          }
          .input:focus {
            border-color: var(--text-secondary);
            box-shadow: 0 0 0 1px rgba(161, 161, 170, 0.2);
          }
          .hasError {
            border-color: var(--accent-red);
          }
          .hasError:focus {
            border-color: var(--accent-red);
            box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
          }
          .leftIcon {
            position: absolute;
            left: 0.75rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            pointer-events: none;
          }
          .rightIcon {
            position: absolute;
            right: 0.75rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
          }
          .hasLeftIcon {
            padding-left: 2.5rem;
          }
          .hasRightIcon {
            padding-right: 2.5rem;
          }
          .errorText {
            color: var(--accent-red);
            font-size: 0.75rem;
            margin-top: 0.25rem;
          }
        `}</style>
      </>
    );
  },
);

Input.displayName = 'Input';
