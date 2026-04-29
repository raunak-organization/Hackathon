import app from './src/app.js';
import { connectDB } from './src/config/database.js';
import { env } from './src/config/env.js';

const PORT = env.PORT || 3000;
await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
