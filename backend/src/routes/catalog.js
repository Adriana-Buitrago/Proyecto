import { Router } from 'express';
import { pool } from '../config/database.js';

const router = Router();

router.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar eventos');
    res.status(500).json({ error: 'No fue posible consultar los eventos' });
  }
});

router.get('/equipment', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar equipos');
    res.status(500).json({ error: 'No fue posible consultar los equipos' });
  }
});

export default router;
