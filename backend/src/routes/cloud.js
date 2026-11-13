import { Router } from 'express';
import { cloudPool } from '../config/cloudDatabase.js';

const router = Router();

router.get('/cloud/events', async (req, res) => {
  try {
    const result = await cloudPool.query(
      'SELECT * FROM events ORDER BY id'
    );

    res.json({
      source: 'Render PostgreSQL',
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error consultando eventos en Render');
    res.status(500).json({
      error: 'No fue posible consultar los eventos en la nube',
    });
  }
});

router.get('/cloud/equipment', async (req, res) => {
  try {
    const result = await cloudPool.query(
      'SELECT * FROM equipment ORDER BY id'
    );

    res.json({
      source: 'Render PostgreSQL',
      total: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error consultando equipos en Render');
    res.status(500).json({
      error: 'No fue posible consultar los equipos en la nube',
    });
  }
});

export default router;
