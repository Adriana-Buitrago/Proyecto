import test from 'node:test';
import assert from 'node:assert/strict';

const API_URL = process.env.API_URL || 'http://localhost:3000';

test('La API debe responder correctamente', async () => {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.status, 'running');
});

test('La API debe devolver los 4 eventos', async () => {
  const response = await fetch(`${API_URL}/api/events`);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.length, 4);
  assert.equal(data[0].id, 'event-001');
});

test('La API debe devolver los 12 equipos', async () => {
  const response = await fetch(`${API_URL}/api/equipment`);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.length, 12);
  assert.equal(data[0].id, 'eq-001');
});

test('El endpoint de salud debe confirmar PostgreSQL', async () => {
  const response = await fetch(`${API_URL}/api/health`);
  const data = await response.json();

  assert.equal(response.status, 200);
  assert.equal(data.status, 'healthy');
  assert.equal(data.database, 'connected');
});
