
import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { pool } from '../config/database.js';

const router = Router();

// Consultar eventos
router.get('/events', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar eventos:', error);

    res.status(500).json({
      error: 'No fue posible consultar los eventos',
    });
  }
});

// Consultar equipos
router.get('/equipment', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM equipment ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar equipos:', error);

    res.status(500).json({
      error: 'No fue posible consultar los equipos',
    });
  }
});

// Registrar un equipo
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
      (value) =>
        typeof value === 'string' && value.trim().length > 0
    ) ||
    !Number.isInteger(quantity) ||
    quantity < 0 ||
    !Number.isInteger(price_per_day) ||
    price_per_day < 0
  ) {
    return res.status(400).json({
      error:
        'Verifica los datos. Todos los campos son obligatorios y las cantidades y precios deben ser números enteros no negativos.',
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

// Actualizar un equipo
router.put('/equipment/:id', async (req, res) => {
  const { id } = req.params;

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
      (value) =>
        typeof value === 'string' && value.trim().length > 0
    ) ||
    !Number.isInteger(quantity) ||
    quantity < 0 ||
    !Number.isInteger(price_per_day) ||
    price_per_day < 0
  ) {
    return res.status(400).json({
      error:
        'Verifica los datos. Todos los campos son obligatorios y las cantidades y precios deben ser números enteros no negativos.',
    });
  }

  try {
    const result = await pool.query(
      `UPDATE equipment
       SET name = $1,
           category = $2,
           brand = $3,
           quantity = $4,
           status = $5,
           price_per_day = $6,
           description = $7
       WHERE id = $8
       RETURNING *`,
      [
        name.trim(),
        category.trim(),
        brand.trim(),
        quantity,
        status.trim(),
        price_per_day,
        description.trim(),
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'No se encontró el equipo solicitado.',
      });
    }

    res.json({
      message: 'Equipo actualizado correctamente',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar equipo:', error);

    res.status(500).json({
      error: 'No fue posible actualizar el equipo.',
    });
  }
});

export default router;
