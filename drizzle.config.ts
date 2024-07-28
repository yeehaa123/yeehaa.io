import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });
export default defineConfig({
  schema: './src/offcourse/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: "file:offcourse.db",
  },
});
