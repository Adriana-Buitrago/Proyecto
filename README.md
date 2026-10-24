# DJ / Sonido y Luces — React Native (Expo + TypeScript)

Proyecto desarrollado durante las semanas 1, 2 y 3 del bootcamp, utilizando React Native, Expo y TypeScript.

## Dominio

Aplicación de gestión para un servicio de DJ, sonido e iluminación. El modelo contempla cuatro entidades:

- `events`: tipos de eventos y servicios ofrecidos.
- `equipment`: equipos disponibles para eventos.
- `clients`: personas o empresas que contratan el servicio.
- `bookings`: reservas que relacionan cliente, evento, fecha y precio.

## Ejecutar

Entra a la carpeta de la semana que quieras probar y ejecuta:

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go compatible con el SDK configurado o abre un simulador.

## Semana 1

Muestra tarjetas de eventos con `View`, `Text`, `Image`, `ScrollView`, `Pressable` y Flexbox.

## Semana 2

Muestra un catálogo de equipos con `FlatList`, búsqueda en tiempo real con `TextInput`, `useMemo`, `useCallback`, estado vacío y `KeyboardAvoidingView`.

## Semana 3

Implementa la navegación entre las secciones de Eventos y Equipos, con pantallas de listado y detalle, utilizando React Navigation.

- **Navegación por pestañas (Bottom Tabs):** permite cambiar entre las secciones de Eventos y Equipos.
- **Navegación Stack:** permite acceder al detalle de un evento o equipo seleccionado.
- **Listado de eventos:** muestra información como nombre, fecha, ubicación y descripción.
- **Catálogo de equipos:** presenta los equipos disponibles, su categoría, precio por día y descripción.
- **Paso de parámetros:** permite identificar el evento o equipo seleccionado y mostrar su información.
- **Datos de prueba:** utiliza datos locales almacenados en `src/data/mockData.ts`.
- **TypeScript:** organiza los tipos y parámetros de navegación en `src/types/navigation.ts`.

## Decisiones de diseño

- Se usa una identidad visual oscura con acento violeta/cian, inspirada en escenarios y luces de DJ.
- Los datos son ficticios y locales (`mockData.ts`); no hay backend ni pagos reales.
- Los IDs son únicos y estables para que `FlatList` use `keyExtractor` correctamente.
- El código usa TypeScript explícito y no usa `any`.
