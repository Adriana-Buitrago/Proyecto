# DJ / Sonido y Luces

Proyecto desarrollado durante las semanas 1, 2, 3, 4 y 5 del bootcamp. Incluye una aplicación móvil construida con React Native, Expo y TypeScript, y un backend desarrollado con Node.js, Express y PostgreSQL.

## Dominio

Aplicación de gestión para un servicio de DJ, sonido e iluminación. El modelo contempla cuatro entidades principales:

- `events`: tipos de eventos y servicios ofrecidos.
- `equipment`: equipos disponibles para eventos.
- `clients`: personas o empresas que contratan el servicio.
- `bookings`: reservas que relacionan cliente, evento, fecha y precio.

## Tecnologías utilizadas

### Aplicación móvil
- React Native.
- Expo.
- TypeScript.
- React Navigation 7.
- Zustand.
- pnpm.

### Backend e infraestructura
- Node.js.
- Express.
- PostgreSQL.
- Docker y Docker Compose.
- Render PostgreSQL.
- Render Web Service para el despliegue público de la API.
- SHA-256 para verificar la integridad de los datos.

---

# Desarrollo por semanas

## Semana 1 — Componentes básicos

Muestra tarjetas de eventos utilizando:

- `View`
- `Text`
- `Image`
- `ScrollView`
- `Pressable`
- Flexbox.

## Semana 2 — Catálogo y búsqueda

Implementa un catálogo de equipos con:

- `FlatList` para mostrar los equipos.
- `TextInput` para realizar búsquedas en tiempo real.
- `useMemo` y `useCallback`.
- Estado vacío cuando no hay resultados.
- `KeyboardAvoidingView` para mejorar la experiencia de búsqueda.

## Semana 3 — Navegación con React Navigation

Implementa la navegación entre las secciones de Eventos y Equipos, con pantallas de listado y detalle.

- **Navegación por pestañas (Bottom Tabs):** permite cambiar entre las secciones de Eventos y Equipos.
- **Navegación Stack:** permite acceder al detalle de un evento o equipo seleccionado.
- **Listado de eventos:** muestra información como nombre, fecha, ubicación y descripción.
- **Catálogo de equipos:** presenta los equipos disponibles, su categoría, precio por día y descripción.
- **Paso de parámetros:** permite identificar el evento o equipo seleccionado y mostrar su información.
- **Datos de prueba:** utiliza datos locales almacenados en `src/data/mockData.ts`.
- **TypeScript:** organiza los tipos y parámetros de navegación en `src/types/navigation.ts`.
- **Safe Area:** adapta las pantallas para respetar las áreas seguras del dispositivo.

## Semana 4 — Estado global con Zustand

Implementa Zustand para administrar el estado global de los equipos guardados, permitiendo compartir información entre diferentes pantallas sin necesidad de pasar propiedades manualmente.

### Funcionalidades implementadas

- **Estado global:** creación del almacén `savedStore.ts` utilizando Zustand.
- **Guardar equipos:** permite agregar equipos seleccionados a la lista de guardados.
- **Evitar duplicados:** comprueba si un equipo ya está guardado antes de agregarlo.
- **Eliminar equipos:** permite quitar equipos de la lista de guardados.
- **Consultar estado:** utiliza `isItemSaved` para comprobar si un equipo está guardado.
- **Pantalla de guardados:** muestra los equipos almacenados y permite eliminarlos.
- **Contador dinámico:** muestra en la pestaña Guardados la cantidad de equipos almacenados y se actualiza automáticamente.
- **Estado vacío:** presenta un mensaje cuando no existen equipos guardados.
- **Navegación:** incorpora las pestañas Eventos, Inicio y Guardados, manteniendo las pantallas de detalle.

### Estructura de archivos principales

```text
src/
├── data/
│   └── mockData.ts
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── EquipmentDetailScreen.tsx
│   ├── EquipmentScreen.tsx
│   ├── EventDetailScreen.tsx
│   ├── EventsScreen.tsx
│   └── SavedScreen.tsx
├── store/
│   └── savedStore.ts
└── types/
    └── navigation.ts
```

### Gestión del estado global

El archivo `src/store/savedStore.ts` contiene:

- `savedItems`: almacena los equipos guardados.
- `addItem`: agrega un equipo a la lista.
- `removeItem`: elimina un equipo mediante su identificador.
- `isItemSaved`: comprueba si un equipo ya se encuentra guardado.

La información se administra en memoria mediante Zustand. No se ha implementado almacenamiento persistente.

## Semana 5 — Backend, Docker y migración a Render

Durante esta semana se implementó una infraestructura backend para complementar el proyecto.

### Backend

Se desarrolló una API utilizando Node.js y Express, conectada a PostgreSQL.

Funcionalidades implementadas:

- Consulta de eventos.
- Consulta de equipos.
- Verificación de disponibilidad de la API.
- Comprobación de conexión con PostgreSQL.
- Consulta de información almacenada en Render.

### Despliegue público de la API

La API se encuentra desplegada en Render:

https://dj-sonido-luces-api.onrender.com

La aplicación móvil utiliza esta dirección para consultar los eventos y equipos.

### Endpoints disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Verifica la respuesta general de la API |
| GET | `/api/health` | Comprueba la conexión con PostgreSQL principal |
| GET | `/api/events` | Consulta los eventos |
| GET | `/api/equipment` | Consulta los equipos |
| GET | `/api/cloud/events` | Consulta los eventos en Render |
| GET | `/api/cloud/equipment` | Consulta los equipos en Render |

### Configuración con Docker

Se configuraron dos servicios mediante `backend/deploy/compose.prod.yaml`:

**PostgreSQL**
- Imagen `postgres:17-alpine`.
- Volumen persistente para los datos.
- Healthcheck mediante `pg_isready`.
- Política de reinicio `unless-stopped`.

**API**
- Construcción mediante Dockerfile.
- Puerto 3000.
- Dependencia de PostgreSQL con condición `service_healthy`.
- Healthcheck mediante `/api/health`.
- Política de reinicio `unless-stopped`.

### Healthchecks y rotación de logs

Se configuraron comprobaciones de salud para los servicios:

- PostgreSQL utiliza `pg_isready`.
- La API consulta `/api/health`.

También se configuró la rotación de logs mediante el controlador `json-file`:

- Tamaño máximo por archivo: 10 MB.
- Cantidad máxima de archivos: 3.

### Variables de entorno

El archivo `backend/.env.example` contiene las variables necesarias para configurar el entorno:

- `NODE_ENV`
- `PORT`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `CLOUD_DATABASE_URL`

Las credenciales reales se mantienen en el archivo `.env`, excluido del control de versiones mediante `.gitignore`.

### Instalación y ejecución del backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
pnpm install
```

Crear el archivo `.env` a partir de `.env.example` y configurar las credenciales correspondientes.

Iniciar los servicios:

```bash
docker compose --env-file .env -f deploy/compose.prod.yaml up -d --build
```

Consultar el estado de los contenedores:

```bash
docker compose --env-file .env -f deploy/compose.prod.yaml ps
```

Detener los servicios:

```bash
docker compose --env-file .env -f deploy/compose.prod.yaml down
```

### Pruebas automatizadas

Para ejecutar las pruebas:

```bash
pnpm test
```

Se verificaron los siguientes aspectos:

1. La API responde correctamente.
2. La API devuelve los 4 eventos.
3. La API devuelve los 12 equipos.
4. El endpoint de salud confirma la conexión con PostgreSQL.

**Resultado: 4 pruebas aprobadas y 0 fallidas.**

### Smoke test

Para ejecutar las pruebas de disponibilidad:

```bash
sh scripts/smoke-test.sh
```

Resultados obtenidos:

- API y PostgreSQL disponibles.
- 4 eventos consultados.
- 12 equipos consultados.

**Resultado general: smoke test aprobado.**

### Integración de la aplicación móvil con la API

Se creó el servicio `semana-4/src/services/api.ts`, encargado de consultar la API y adaptar los nombres de los campos recibidos desde PostgreSQL a los tipos utilizados por TypeScript.

Las pantallas `EventsScreen.tsx` y `EquipmentScreen.tsx` consultan los siguientes endpoints:

- `/api/events`: carga los eventos desde el backend.
- `/api/equipment`: carga los equipos desde el backend.

Se conservaron el diseño de las pantallas, el buscador del catálogo, los estados de carga y error, y la navegación existente.

La integración fue comprobada en Expo Go y mediante la ejecución de TypeScript con `pnpm exec tsc --noEmit`, sin errores.

### Migración de datos a Render

Se realizó la migración de los datos iniciales desde PostgreSQL local hacia una base de datos PostgreSQL administrada en Render.

| Tabla | Registros en origen | Registros en destino |
|---|---:|---:|
| `events` | 4 | 4 |
| `equipment` | 12 | 12 |
| **Total** | **16** | **16** |

La migración se ejecutó mediante:

```text
scripts/migrate-to-render.js
```

Posteriormente, se verificó la integridad de los datos mediante comparación de hashes SHA-256 utilizando:

```text
scripts/verify-migration.js
```

Los hashes de origen y destino coincidieron en ambas tablas.

### Pruebas posteriores a la migración

Se realizaron consultas desde la API hacia PostgreSQL en Render:

| Endpoint | Resultado |
|---|---|
| `/api/cloud/events` | HTTP 200; 4 eventos recibidos |
| `/api/cloud/equipment` | HTTP 200; 12 equipos recibidos |

Las dos consultas finalizaron correctamente.

La evidencia detallada de la migración se encuentra en:

```text
backend/evidence/migration-verification.txt
```

El documento de entrega de la Semana 5 se encuentra en:

```text
entregable-s05-configuracion-y-verificacion.md
```

### Diferencias entre los entornos

| Característica | Origen local | Destino |
|---|---|---|
| Motor | PostgreSQL | PostgreSQL |
| Versión | 17 | 18 |
| Infraestructura | Docker local | Render |
| Administración | Local | Servicio administrado |

La migración de las tablas y sus registros se completó correctamente, y los hashes SHA-256 confirmaron la coincidencia de los datos.

### Estrategia de reversión

Se conservó la base de datos local original después de la migración.

En caso de presentarse problemas con la base de datos en Render, se contempla:

1. Mantener disponible la base de datos local.
2. Restaurar la conexión principal mediante `DATABASE_URL`.
3. Reiniciar el servicio de la API.
4. Comprobar `/api/health`.
5. Ejecutar nuevamente las pruebas funcionales y el smoke test.

Esta estrategia está documentada como procedimiento previsto; no se ha registrado una ejecución de rollback.

---

# Estructura general del proyecto

```text
Proyecto-revision/
├── semana-4/
│   └── Aplicación móvil Expo y TypeScript
├── backend/
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── deploy/
│   │   └── compose.prod.yaml
│   ├── evidence/
│   │   └── migration-verification.txt
│   ├── scripts/
│   │   ├── migrate-to-render.js
│   │   ├── smoke-test.sh
│   │   └── verify-migration.js
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   └── server.js
│   ├── tests/
│   │   └── api.test.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── entregable-s05-configuracion-y-verificacion.md
├── .gitignore
└── README.md
```

# Decisiones de diseño

- Se utiliza una identidad visual oscura con acentos violetas y cian, inspirada en escenarios y luces de DJ.
- `mockData.ts` conserva los tipos de datos utilizados por la aplicación y los datos de prueba originales.
- Las pantallas de eventos y equipos consultan la API pública desplegada en Render.
- El servicio `src/services/api.ts` adapta los datos recibidos del backend a los tipos de TypeScript.
- Los IDs son únicos y estables para que `FlatList` utilice `keyExtractor` correctamente.
- Se mantiene una organización modular mediante carpetas para datos, navegación, pantallas, almacenamiento global y tipos.

# Estado actual del proyecto

El proyecto cuenta con cinco semanas de desarrollo:

- **Semanas 1 a 4:** aplicación móvil con componentes, catálogo, navegación y gestión de estado global mediante Zustand.
- **Semana 5:** backend con Node.js y Express, PostgreSQL, Docker, pruebas funcionales y migración de datos verificada en Render.

La migración de datos está completada y verificada. La API está desplegada públicamente en Render y las pantallas de eventos y equipos de la aplicación móvil están integradas con ella.