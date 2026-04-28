// ─── Shared Interface ─────────────────────────────────────────────────────────
export type LogMeta = Record<string, unknown>;

export interface Logger {
  debug: (msg: string, meta?: LogMeta) => void;
  info: (msg: string, meta?: LogMeta) => void;
  warn: (msg: string, meta?: LogMeta) => void;
  error: (msg: string, meta?: LogMeta) => void;
}

export const createNodeLogger = (pinoInstance: {
  debug: (obj: LogMeta, msg: string) => void;
  info: (obj: LogMeta, msg: string) => void;
  warn: (obj: LogMeta, msg: string) => void;
  error: (obj: LogMeta, msg: string) => void;
}): Logger => ({
  debug: (msg, meta = {}) => pinoInstance.debug(meta, msg),
  info: (msg, meta = {}) => pinoInstance.info(meta, msg),
  warn: (msg, meta = {}) => pinoInstance.warn(meta, msg),
  error: (msg, meta = {}) => pinoInstance.error(meta, msg),
});

export const createBrowserLogger = (nodeEnv?: string): Logger => {
  if (nodeEnv !== 'development') {
    return {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    };
  }
  return {
    debug: (msg, meta) => console.debug(msg, ...(meta ? [meta] : [])),
    info: (msg, meta) => console.info(msg, ...(meta ? [meta] : [])),
    warn: (msg, meta) => console.warn(msg, ...(meta ? [meta] : [])),
    error: (msg, meta) => console.error(msg, ...(meta ? [meta] : [])),
  };
};
