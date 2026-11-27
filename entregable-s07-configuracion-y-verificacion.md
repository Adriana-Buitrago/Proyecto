# Entregable Semana 7 – Persistencia local y almacenamiento de datos
## Proyecto: DJ Sonido y Luces

**Rama:** semana-7  
**Actividad:** Implementación de persistencia local en la aplicación móvil.

---

# Sección 1. Objetivo y alcance

## 1.1. Objetivo

Implementar mecanismos de almacenamiento y persistencia local en la aplicación móvil DJ Sonido y Luces, mediante herramientas que permitan conservar información, administrar las preferencias del usuario y proteger datos sensibles.

## 1.2. Alcance

Durante esta semana se trabajó en la integración de servicios de almacenamiento local, configuración de consultas persistentes y desarrollo de hooks personalizados para facilitar la administración de los datos dentro de la aplicación.

La implementación se enfocó en los siguientes componentes:

- Almacenamiento local mediante AsyncStorage.
- Almacenamiento rápido mediante MMKV.
- Almacenamiento seguro mediante Expo SecureStore.
- Administración de consultas y caché mediante TanStack Query.
- Persistencia de información entre sesiones.
- Gestión de preferencias del usuario.
- Incorporación de una pantalla de configuración.

---

# Sección 2. Implementación del almacenamiento local

## 2.1. Configuración de servicios de almacenamiento

Se implementaron servicios independientes para administrar los diferentes mecanismos de almacenamiento de la aplicación, permitiendo separar las responsabilidades y facilitar el acceso a la información.

Se creó el archivo `app-movil/src/services/storage.ts`, destinado a centralizar las operaciones de almacenamiento local.

También se incorporó MMKV como mecanismo de almacenamiento rápido para gestionar información y preferencias que requieren acceso eficiente.

## 2.2. Almacenamiento seguro

Se implementó un servicio de almacenamiento seguro mediante Expo SecureStore, utilizando el archivo:

`app-movil/src/services/secureStorage.ts`

Este servicio permite gestionar información sensible mediante mecanismos de almacenamiento seguro proporcionados por Expo.

Adicionalmente, se desarrolló el hook personalizado:

`app-movil/src/hooks/useSecureStorage.ts`

Su finalidad es facilitar la utilización del almacenamiento seguro desde los diferentes componentes de la aplicación.

## 2.3. Administración de preferencias

Se desarrolló el hook personalizado:

`app-movil/src/hooks/usePreferences.ts`

Este componente permite centralizar la administración de las preferencias de configuración de la aplicación, facilitando su utilización y mantenimiento.

## 2.4. Persistencia de consultas y caché

Se incorporó TanStack Query para administrar las consultas y la información almacenada en caché.

Para esta implementación se desarrollaron los siguientes archivos:

- `app-movil/src/services/queryClient.ts`
- `app-movil/src/services/queryPersistence.ts`

Estos servicios permiten organizar la configuración del cliente de consultas y el mecanismo de persistencia de la información, con el propósito de facilitar la recuperación de datos entre sesiones.

---

# Sección 3. Integración de funcionalidades en la aplicación móvil

## 3.1. Pantalla de configuración

Se desarrolló la pantalla `SettingsScreen.tsx`, ubicada en:

`app-movil/src/screens/SettingsScreen.tsx`

Esta pantalla permite centralizar las opciones de configuración de la aplicación y sirve como punto de integración para las funcionalidades relacionadas con las preferencias del usuario.

## 3.2. Integración con la navegación

Se modificó el archivo:

`app-movil/src/navigation/AppNavigator.tsx`

Con el propósito de incorporar la pantalla de configuración dentro de la estructura de navegación de la aplicación móvil.

## 3.3. Actualización de componentes existentes

Se realizaron modificaciones en los siguientes archivos:

- `app-movil/App.tsx`
- `app-movil/src/screens/EquipmentScreen.tsx`
- `app-movil/src/screens/EventsScreen.tsx`

También se actualizaron los archivos de configuración y dependencias:

- `app-movil/package.json`
- `app-movil/package-lock.json`
- `app-movil/pnpm-lock.yaml`
- `app-movil/app.json`

Estos cambios permitieron adaptar la estructura de la aplicación a las nuevas funcionalidades implementadas.

---

# Sección 4. Organización y estructura del código

## 4.1. Separación de responsabilidades

Se organizaron las funcionalidades mediante carpetas específicas para servicios, hooks y pantallas, evitando concentrar toda la lógica dentro de un único componente.

La estructura desarrollada incluye:

**Hooks**
- `usePreferences.ts`
- `useSecureStorage.ts`

**Servicios**
- `storage.ts`
- `secureStorage.ts`
- `queryClient.ts`
- `queryPersistence.ts`

**Pantallas**
- `SettingsScreen.tsx`

Esta organización facilita el mantenimiento, la reutilización de código y la incorporación de nuevas funcionalidades.

## 4.2. Control de versiones

Los cambios realizados durante la Semana 7 fueron registrados en Git mediante un commit y enviados correctamente al repositorio remoto.

**Rama:** `semana-7`

**Commit:** `dbbd330`

**Mensaje:** completar implementacion semana 7

Se registraron 16 archivos modificados, con 1.431 inserciones y 157 eliminaciones.

---

# Sección 5. Verificación de la implementación

## 5.1. Revisión de los componentes desarrollados

Se incorporaron los servicios de almacenamiento, hooks personalizados, configuración de consultas y pantalla de preferencias dentro de la estructura del proyecto.

## 5.2. Verificación del repositorio

Se ejecutaron los comandos de control de versiones para registrar y publicar los cambios:

- `git add .`
- `git commit -m "completar implementacion semana 7"`
- `git push origin semana-7`

El proceso finalizó correctamente y GitHub confirmó la creación y publicación de la rama `semana-7`.

## 5.3. Estado de la implementación

Los archivos y funcionalidades correspondientes a la implementación de persistencia local fueron incorporados al proyecto y registrados en el repositorio remoto.

No se documenta en esta entrega una prueba específica de funcionamiento de cada mecanismo de almacenamiento ni una validación de compilación Android.

---

# Sección 6. Conclusión

Durante la Semana 7 se avanzó en la implementación de mecanismos de persistencia local para el proyecto DJ Sonido y Luces, incorporando servicios de almacenamiento, gestión de preferencias, almacenamiento seguro y configuración de persistencia de consultas mediante TanStack Query.

También se desarrollaron hooks personalizados y una pantalla de configuración, fortaleciendo la organización interna de la aplicación móvil y facilitando la reutilización de componentes.

Finalmente, los cambios fueron registrados y publicados correctamente en GitHub mediante la rama `semana-7`, dejando incorporados los avances de esta actividad para continuar con las siguientes etapas del proyecto.
