#!/bin/sh

set -eu

API_URL="${API_URL:-http://localhost:3000}"

echo "Verificando API DJ Sonido y Luces..."

HEALTH=$(curl -fsS "$API_URL/api/health")
echo "$HEALTH" | grep -q '"status":"healthy"'
echo "$HEALTH" | grep -q '"database":"connected"'

EVENTS=$(curl -fsS "$API_URL/api/events")
EVENT_COUNT=$(printf '%s' "$EVENTS" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).length))")
[ "$EVENT_COUNT" -eq 4 ]

EQUIPMENT=$(curl -fsS "$API_URL/api/equipment")
EQUIPMENT_COUNT=$(printf '%s' "$EQUIPMENT" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).length))")
[ "$EQUIPMENT_COUNT" -eq 12 ]

echo "OK: API y PostgreSQL disponibles."
echo "OK: $EVENT_COUNT eventos consultados."
echo "OK: $EQUIPMENT_COUNT equipos consultados."
