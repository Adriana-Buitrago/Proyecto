# Semana 2 — Inventario DJ / Sonido y Luces

## Descripción
App móvil para consultar el inventario de equipos usados en eventos de DJ, sonido e iluminación.

## Pantalla
- Encabezado del dominio y resumen de cantidades.
- Campo de búsqueda en tiempo real.
- Lista virtualizada con 12 equipos reales de ejemplo.
- Categoría, nombre, marca, cantidad, estado y descripción por tarjeta.
- Mensaje personalizado cuando no hay coincidencias.
- Botón para limpiar la búsqueda.
- Pull-to-refresh simulado.
- Diseño adaptable al teclado y tema centralizado.

## Modelo de datos
El dominio contempla `events`, `equipment`, `clients` y `bookings`. La pantalla de esta semana se centra en `equipment`, mientras que las otras tres entidades quedan modeladas en `src/types/index.ts` y `src/data/mockData.ts`.

## Decisiones de diseño
- Paleta oscura con acentos violeta y cian inspirada en equipos de escenario.
- `FlatList` para virtualizar la lista.
- `useMemo` para filtrar equipos en función de la búsqueda.
- `useCallback` para funciones que se entregan a la lista.
- `keyExtractor` usa el ID estable de cada equipo.
- Los datos son ficticios y locales; no se conecta a una API.
