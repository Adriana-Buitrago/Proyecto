import { Router } from 'express';
import { randomUUID } from 'node:crypto';
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

router.post('/equipment', async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    status,
    price_per_day,
    description,
  } = req.body;

  if (
    ![name, category, brand, status, description].every(
      (value) => typeof value === 'string' && value.trim().length > 0
    ) ||
    !Number.isInteger(quantity) ||
    quantity < 0 ||
    !Number.isInteger(price_per_day) ||
    price_per_day < 0
  ) {
    return res.status(400).json({
      error: 'Verifica los datos. Todos los campos son obligatorios y las cantidades y precios deben ser números enteros no negativos.',
    });
  }

  try {
    const id = `eq-${randomUUID()}`;

    const result = await pool.query(
      `INSERT INTO equipment
        (id, name, category, brand, quantity, status, price_per_day, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        id,
        name.trim(),
        category.trim(),
        brand.trim(),
        quantity,
        status.trim(),
        price_per_day,
        description.trim(),
      ]
    );

    res.status(201).json({
      message: 'Equipo registrado correctamente',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error al registrar equipo:', error);
    res.status(500).json({
      error: 'No fue posible registrar el equipo',
    });
  }
});

export default router;
