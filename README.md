# DJ / Sonido y Luces — React Native (Expo + TypeScript)

Proyecto desarrollado durante las semanas 1, 2, 3 y 4 del bootcamp, utilizando React Native, Expo y TypeScript.

## Dominio

Aplicación de gestión para un servicio de DJ, sonido e iluminación. El modelo contempla cuatro entidades:

- `events`: tipos de eventos y servicios ofrecidos.
- `equipment`: equipos disponibles para eventos.
- `clients`: personas o empresas que contratan el servicio.
- `bookings`: reservas que relacionan cliente, evento, fecha y precio.

## Tecnologías utilizadas

- React Native.
- Expo.
- TypeScript.
- React Navigation 7.
- Zustand para la gestión del estado global.
- pnpm como gestor de paquetes.

## Ejecutar el proyecto

Entra a la carpeta de la semana que quieras probar y ejecuta:

```bash
pnpm install
pnpm start
```

Para iniciar Expo mediante Tunnel:

```bash
pnpm exec expo start --tunnel
```

Escanea el código QR con Expo Go compatible con el SDK configurado o abre un simulador.

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

La información se administra en memoria mediante Zustand. No se ha implementado almacenamiento persistente ni conexión a una base de datos.

## Decisiones de diseño

- Se utiliza una identidad visual oscura con acentos violetas y cian, inspirada en escenarios y luces de DJ.
- Los datos son ficticios y locales (`mockData.ts`); no hay backend ni pagos reales.
- Los IDs son únicos y estables para que `FlatList` utilice `keyExtractor` correctamente.
- El código utiliza TypeScript explícito y evita el uso de `any`.
- Se mantiene una organización modular mediante carpetas para datos, navegación, pantallas, almacenamiento global y tipos.

## Estado del proyecto

El proyecto cuenta con cuatro semanas de desarrollo, incorporando progresivamente componentes de React Native, navegación entre pantallas y gestión de estado global con Zustand.

