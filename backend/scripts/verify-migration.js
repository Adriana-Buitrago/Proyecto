import 'dotenv/config';
import pg from 'pg';
import { createHash } from 'node:crypto';

const { Pool } = pg;

const source = new Pool({
  host: '127.0.0.1',
  port: 5433,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const destination = new Pool({
  connectionString: process.env.CLOUD_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const tables = {
  events: 'id, name, event_type, date, location, duration_hours, description, image_url',
  equipment: 'id, name, category, brand, quantity, status, price_per_day, description',
};

function hashRows(rows) {
  return createHash('sha256')
    .update(JSON.stringify(rows))
    .digest('hex');
}

async function verify() {
  try {
    for (const [table, columns] of Object.entries(tables)) {
      const local = await source.query(
        `SELECT ${columns} FROM ${table} ORDER BY id`
      );

      const cloud = await destination.query(
        `SELECT ${columns} FROM ${table} ORDER BY id`
      );

      const localHash = hashRows(local.rows);
      const cloudHash = hashRows(cloud.rows);

      console.log(`\nTabla: ${table}`);
      console.log(`Origen:  ${local.rowCount} registros`);
      console.log(`Destino: ${cloud.rowCount} registros`);
      console.log(`Hash local: ${localHash}`);
      console.log(`Hash nube:  ${cloudHash}`);

      if (localHash !== cloudHash) {
        throw new Error(`Los hashes de ${table} no coinciden.`);
      }

      console.log(`VERIFICADO: ${table}, los hashes coinciden.`);
    }

    console.log('\nMIGRACIÓN VERIFICADA: todos los datos coinciden.');
  } catch (error) {
    console.error('\nError en la verificación:', error.message);
    process.exitCode = 1;
  } finally {
    await source.end();
    await destination.end();
  }
}

verify();
