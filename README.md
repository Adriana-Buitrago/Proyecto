# DJ / Sonido y Luces

Proyecto desarrollado durante las semanas 1, 2, 3, 4, 5, 6 y 7 del bootcamp. Incluye una aplicación móvil construida con React Native, Expo y TypeScript, y un backend desarrollado con Node.js, Express y PostgreSQL.

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
- React Hook Form.
- Zod.
- @hookform/resolvers.
- TanStack Query.
- @tanstack/react-query-persist-client.
- @tanstack/query-async-storage-persister.
- @react-native-async-storage/async-storage.
- react-native-mmkv.
- expo-secure-store.
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
- **Navegación:** incorpora las pestañas Eventos, Equipos y Guardados, manteniendo las pantallas de detalle.

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

La información de los equipos guardados se administra mediante Zustand en memoria.

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

[https://dj-sonido-luces-api.onrender.com](https://dj-sonido-luces-api.onrender.com/)

La aplicación móvil utiliza esta dirección para consultar los eventos y equipos.

### Endpoints disponibles

| **Método** | **Endpoint** | **Descripción** |
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

Se creó el servicio `src/services/api.ts`, encargado de consultar la API y adaptar los nombres de los campos recibidos desde PostgreSQL a los tipos utilizados por TypeScript.

Las pantallas `EventsScreen.tsx` y `EquipmentScreen.tsx` consultan los siguientes endpoints:

- `/api/events`: carga los eventos desde el backend.
- `/api/equipment`: carga los equipos desde el backend.

Se conservaron el diseño de las pantallas, el buscador del catálogo, los estados de carga y error, y la navegación existente.

La integración fue comprobada mediante la ejecución de TypeScript con `pnpm exec tsc --noEmit`, sin errores.

### Migración de datos a Render

Se realizó la migración de los datos iniciales desde PostgreSQL local hacia una base de datos PostgreSQL administrada en Render.

| **Tabla** | **Registros en origen** | **Registros en destino** |
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

| **Endpoint** | **Resultado** |
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

| **Característica** | **Origen local** | **Destino** |
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

## Semana 6 — Formularios y validaciones con React Hook Form y Zod

Durante esta semana se mejoró la gestión de equipos de la aplicación móvil mediante formularios reutilizables, validaciones de datos y conexión con los servicios del backend.

### Formularios reutilizables

Se implementó un sistema de formularios compartidos para registrar y editar equipos.

Funcionalidades implementadas:

- **React Hook Form:** administración del estado de los formularios y control de los campos.
- **Zod:** definición de esquemas para validar los datos ingresados.
- **@hookform/resolvers:** integración entre React Hook Form y Zod.
- **EquipmentForm.tsx:** componente reutilizable para crear y editar equipos.
- **FormField.tsx:** componente para representar campos de entrada con sus respectivos mensajes de validación.
- **equipmentSchema.ts:** esquema de validación para los datos de los equipos.

### Validaciones implementadas

Se establecieron reglas para garantizar que la información ingresada sea correcta:

- El nombre del equipo es obligatorio y tiene un límite de caracteres.
- La categoría debe estar seleccionada.
- La marca es obligatoria.
- La cantidad debe ser un número entero igual o superior a cero.
- El estado del equipo es obligatorio.
- El precio por día debe ser un número entero igual o superior a cero.
- La descripción es obligatoria y tiene un límite de caracteres.

Los campos incorrectos muestran mensajes de error en español y resaltan visualmente el campo que requiere corrección.

### Creación y edición de equipos

Se ampliaron las funcionalidades del catálogo para permitir administrar los equipos desde la aplicación móvil.

- **Crear equipos:** permite registrar nuevos equipos mediante un formulario validado y enviar la información al backend.
- **Editar equipos:** permite recuperar los datos de un equipo existente, precargar el formulario y actualizar su información.
- **Detalle del equipo:** se mantiene la consulta de información y se incorpora el acceso a la edición.
- **Estados de carga:** se bloquean las acciones durante el envío de información para evitar operaciones repetidas.
- **Manejo de errores:** se muestran mensajes cuando ocurre algún problema durante la creación o actualización.

### Navegación

Se actualizó `AppNavigator.tsx` para incorporar la pantalla `EquipmentEditScreen.tsx` y sus parámetros de navegación en `navigation.ts`.

### Dependencias incorporadas

| **Dependencia** | **Función** |
|---|---|
| `react-hook-form` | Administración de formularios |
| `zod` | Validación y transformación de datos |
| `@hookform/resolvers` | Integración de Zod con React Hook Form |

### Archivos principales incorporados o modificados

```text
src/
├── components/
│   ├── EquipmentForm.tsx
│   └── FormField.tsx
├── schemas/
│   └── equipmentSchema.ts
├── screens/
│   ├── EquipmentScreen.tsx
│   ├── EquipmentDetailScreen.tsx
│   └── EquipmentEditScreen.tsx
├── services/
│   └── api.ts
├── navigation/
│   └── AppNavigator.tsx
└── types/
    └── navigation.ts
```

### Pruebas y verificación

Se realizaron pruebas funcionales en los siguientes entornos:

- Navegador web.
- Dispositivo Android mediante Expo Go.

Se verificaron las siguientes operaciones:

1. Consulta del catálogo de equipos.
2. Creación de equipos.
3. Edición de equipos existentes.
4. Validación de campos obligatorios.
5. Rechazo de cantidades y precios negativos.
6. Rechazo de valores decimales en campos enteros.
7. Visualización de mensajes de validación.
8. Navegación entre el listado, el detalle y la edición.

También se ejecutó el siguiente comando para verificar los tipos de TypeScript:

```bash
pnpm exec tsc --noEmit
```

**Resultado:** las pruebas funcionales se completaron correctamente en navegador y dispositivo móvil. La verificación de TypeScript finalizó sin errores.

### Resultado de la Semana 6

La aplicación cuenta con formularios reutilizables, validaciones centralizadas mediante Zod y funcionalidades de creación y edición de equipos conectadas con el backend. Las pruebas se realizaron satisfactoriamente en navegador y dispositivo móvil.

## Semana 7 — Persistencia local

Durante esta semana se implementaron mecanismos de almacenamiento local en la aplicación móvil DJ Sonido y Luces, utilizando AsyncStorage, MMKV y Expo SecureStore. También se incorporó TanStack Query para administrar las consultas y conservar información en caché.

### Persistencia de consultas con AsyncStorage y TanStack Query

Se implementó un sistema de persistencia de la caché de consultas mediante TanStack Query y AsyncStorage.

Funcionalidades implementadas:

- **TanStack Query:** administración de las consultas y estados de carga de eventos y equipos.
- **PersistQueryClientProvider:** integración del proveedor encargado de recuperar y conservar la caché de consultas.
- **AsyncStorage:** almacenamiento persistente de la información de la caché en el dispositivo.
- **Persistencia de eventos:** conserva la información consultada desde el backend para facilitar su disponibilidad posterior.
- **Persistencia de equipos:** permite recuperar la información previamente consultada desde el almacenamiento local.
- **Configuración de caché:** se establecieron tiempos de conservación y actualización de la información.

Las pantallas `EventsScreen.tsx` y `EquipmentScreen.tsx` utilizan `useQuery` para consultar los datos y administrar los estados de carga y error.

La configuración principal se encuentra en:

- `src/services/queryClient.ts`
- `src/services/queryPersistence.ts`
- `App.tsx`

### Preferencias de usuario con MMKV

Se incorporó MMKV como mecanismo de almacenamiento local síncrono para guardar las preferencias de la aplicación.

Funcionalidades implementadas:

- **Almacenamiento síncrono:** configuración de MMKV mediante `createMMKV`.
- **Preferencia de tema:** permite seleccionar entre tema claro y oscuro.
- **Preferencias de notificaciones:** permite activar o desactivar las notificaciones.
- **Persistencia de preferencias:** los valores se almacenan localmente para conservar la configuración del usuario.
- **Hook personalizado:** se creó `usePreferences.ts` para centralizar la lectura y actualización de las preferencias.

La configuración del almacenamiento se encuentra en `src/services/storage.ts`.

### Almacenamiento seguro con Expo SecureStore

Se implementó Expo SecureStore para almacenar información sensible de manera protegida en el dispositivo.

Funcionalidades implementadas:

- **Guardar información segura:** permite almacenar una clave de acceso del administrador.
- **Recuperar información:** permite consultar la información previamente guardada.
- **Eliminar información:** permite eliminar los datos almacenados de forma segura.
- **Hook personalizado:** se creó `useSecureStorage.ts` para administrar las operaciones de almacenamiento seguro.
- **Servicio de almacenamiento:** se implementó `secureStorage.ts` para centralizar las operaciones de SecureStore.

### Pantalla de configuración

Se incorporó una nueva pantalla denominada `SettingsScreen.tsx`, integrada a la navegación principal de la aplicación.

La pantalla permite:

- Cambiar la preferencia de tema.
- Activar y desactivar las notificaciones.
- Guardar una clave de acceso del administrador.
- Consultar si existe una clave almacenada.
- Eliminar la clave guardada.

Se agregó una cuarta pestaña denominada **Configuración**, manteniendo las secciones existentes de Eventos, Equipos y Guardados.

### Dependencias incorporadas

| **Dependencia** | **Función** |
|---|---|
| `@react-native-async-storage/async-storage` | Almacenamiento persistente asíncrono |
| `react-native-mmkv` | Almacenamiento local síncrono de preferencias |
| `expo-secure-store` | Almacenamiento seguro de información sensible |
| `@tanstack/react-query` | Administración de consultas y caché |
| `@tanstack/react-query-persist-client` | Persistencia de la caché de consultas |
| `@tanstack/query-async-storage-persister` | Adaptador de persistencia con AsyncStorage |

### Archivos principales incorporados o modificados

```text
app-movil/
├── App.tsx
└── src/
    ├── hooks/
    │   ├── usePreferences.ts
    │   └── useSecureStorage.ts
    ├── navigation/
    │   └── AppNavigator.tsx
    ├── screens/
    │   ├── EventsScreen.tsx
    │   ├── EquipmentScreen.tsx
    │   └── SettingsScreen.tsx
    └── services/
        ├── queryClient.ts
        ├── queryPersistence.ts
        ├── secureStorage.ts
        └── storage.ts
```

### Configuración y ejecución en Android

Se generó el proyecto nativo de Android mediante Expo Prebuild para incorporar las dependencias que requieren código nativo, especialmente MMKV.

Para preparar el entorno se requiere:

- Android Studio.
- Android SDK y Android SDK Platform-Tools.
- Java Development Kit.
- Un emulador Android o dispositivo físico compatible.

Comandos principales de ejecución:

```bash
cd app-movil
pnpm install
pnpm exec expo prebuild --platform android
pnpm exec expo run:android
```

**Nota:** MMKV requiere una compilación nativa. Por esta razón, la aplicación debe ejecutarse mediante un desarrollo nativo y no únicamente desde Expo Go.

### Pruebas y verificación

Se ejecutó la comprobación de TypeScript mediante:

```bash
pnpm exec tsc --noEmit
```

**Resultado:** la verificación de TypeScript finalizó sin errores.

### Resultado de la Semana 7

La aplicación incorpora tres mecanismos de almacenamiento local con propósitos diferentes: AsyncStorage para conservar la caché de consultas, MMKV para las preferencias de usuario y Expo SecureStore para información sensible.

Además, se integró TanStack Query en las pantallas de eventos y equipos, y se agregó una pantalla de configuración para administrar las preferencias y la información segura del usuario.

---

# Estructura general del proyecto

```text
Proyecto/
├── app-movil/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── navigation/
│   │   ├── schemas/
│   │   ├── screens/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   ├── android/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── README.md
├── backend/
│   ├── database/
│   ├── deploy/
│   ├── evidence/
│   ├── scripts/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── .gitignore
├── README.md
├── entregable-s05-configuracion-y-verificacion.md
└── entregable-s07-persistencia-local.md
```

# Decisiones de diseño

- Se utiliza una identidad visual oscura con acentos violetas y cian, inspirada en escenarios y luces de DJ.
- `mockData.ts` conserva los tipos de datos utilizados por la aplicación y los datos de prueba originales.
- Las pantallas de eventos y equipos consultan la API pública desplegada en Render.
- El servicio `src/services/api.ts` adapta los datos recibidos del backend a los tipos de TypeScript.
- Los IDs son únicos y estables para que `FlatList` utilice `keyExtractor` correctamente.
- Se mantiene una organización modular mediante carpetas para datos, navegación, pantallas, almacenamiento global, hooks, esquemas de validación, componentes y tipos.
- Los formularios de equipos utilizan React Hook Form para administrar los campos y Zod para validar la información.
- Se reutilizan componentes para mantener una estructura consistente en los formularios de creación y edición.
- Se conserva una identidad visual uniforme entre las pantallas de listado, detalle y edición de equipos.
- Se utiliza TanStack Query para administrar las consultas y la caché de datos.
- AsyncStorage conserva la caché de consultas para facilitar la disponibilidad de los datos.
- MMKV almacena las preferencias de usuario mediante operaciones síncronas.
- Expo SecureStore protege la información sensible almacenada en el dispositivo.

# Estado actual del proyecto

El proyecto cuenta con siete semanas de desarrollo:

- **Semanas 1 a 4:** aplicación móvil con componentes, catálogo, navegación y gestión de estado global mediante Zustand.
- **Semana 5:** backend con Node.js y Express, PostgreSQL, Docker, pruebas funcionales y migración de datos verificada en Render.
- **Semana 6:** formularios reutilizables, validaciones con React Hook Form y Zod, creación y edición de equipos conectadas con el backend.
- **Semana 7:** persistencia local mediante AsyncStorage, MMKV y Expo SecureStore, integración de TanStack Query y pantalla de configuración.

La migración de datos está completada y verificada. La API está desplegada públicamente en Render y las pantallas de eventos y equipos de la aplicación móvil están integradas con ella.

La aplicación permite consultar, crear y editar equipos, gestionar equipos guardados, validar formularios y conservar información mediante mecanismos de almacenamiento local.

El proyecto mantiene una arquitectura modular, con separación entre la aplicación móvil, los servicios de backend, los componentes de interfaz, la navegación, los hooks y los mecanismos de almacenamiento.