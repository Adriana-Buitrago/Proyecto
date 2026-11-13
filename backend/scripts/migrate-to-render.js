import 'dotenv/config';
import pg from 'pg';

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
  events: [
    'id', 'name', 'event_type', 'date', 'location',
    'duration_hours', 'description', 'image_url',
  ],
  equipment: [
    'id', 'name', 'category', 'brand', 'quantity',
    'status', 'price_per_day', 'description',
  ],
};

async function migrate() {
  const client = await destination.connect();

  try {
    for (const table of Object.keys(tables)) {
      const existing = await client.query(
        `SELECT COUNT(*)::int AS total FROM ${table}`
      );

      if (existing.rows[0].total !== 0) {
        throw new Error(`La tabla ${table} no está vacía. Migración cancelada.`);
      }
    }

    await client.query('BEGIN');

    for (const [table, columns] of Object.entries(tables)) {
      const result = await source.query(
        `SELECT ${columns.join(', ')} FROM ${table} ORDER BY id`
      );

      for (const row of result.rows) {
        const values = columns.map((column) => row[column]);
        const placeholders = values.map((_, index) => `$${index + 1}`);

        await client.query(
          `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`,
          values
        );
      }

      console.log(`${table}: ${result.rowCount} registros preparados.`);
    }

    await client.query('COMMIT');
    console.log('Migración a Render completada correctamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migración cancelada:', error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await source.end();
    await destination.end();
  }
}

migrate().catch((error) => {
  console.error('Error de migración:', error.message);
  process.exitCode = 1;
});
