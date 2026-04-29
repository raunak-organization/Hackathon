import app from './src/app.js';
import { connectDB } from './src/config/database.js';
import { env } from './src/config/env.js';
import logger from './src/config/logger.js';

const PORT = env.PORT || 3000;
await connectDB();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
