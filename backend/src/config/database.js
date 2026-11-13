import pg from 'pg';
import { config } from './env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.databaseUrl,
  connectionTimeoutMillis: 5000,
});

export async function checkDatabaseConnection() {
  const result = await pool.query('SELECT 1');
  return result.rowCount === 1;
}
