import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(import.meta.env.VITE_DB_FILE_NAME!);

export { db };