import pg from 'pg';

const { Pool } = pg;

if (!process.env.CLOUD_DATABASE_URL) {
  throw new Error('Falta configurar CLOUD_DATABASE_URL.');
}

export const cloudPool = new Pool({
  connectionString: process.env.CLOUD_DATABASE_URL,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function checkCloudDatabaseConnection() {
  const result = await cloudPool.query('SELECT 1');
  return result.rowCount === 1;
}
