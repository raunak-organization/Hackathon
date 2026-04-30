import { createBrowserLogger } from '@repo/logger';

const logger = createBrowserLogger(process.env.NEXT_PUBLIC_ENV);

export default logger;
