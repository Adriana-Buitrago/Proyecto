# Entregable Semana 5 – Configuración y verificación
## Proyecto: DJ Sonido y Luces

**Rama:** semana-5  
**Fecha de ejecución de la migración:** 12 de noviembre de 2026

---

# Sección 2. Evidencias de migración de datos

## 2.1. Objetivo

Migrar los datos iniciales del proyecto DJ Sonido y Luces desde una instancia local de PostgreSQL hacia una base de datos PostgreSQL alojada en Render, verificando que la información se conserve correctamente.

## 2.2. Origen y destino

- **Origen:** PostgreSQL 17 Alpine, ejecutado mediante Docker.
- **Destino:** PostgreSQL administrado en Render.
- **Base de datos de destino:** dj_sonido_luces.
- **Método:** ejecución del script `backend/scripts/migrate-to-render.js`.

## 2.3. Datos migrados

Se migraron dos tablas:

| Tabla | Registros en origen | Registros en destino |
|---|---:|---:|
| events | 4 | 4 |
| equipment | 12 | 12 |
| **Total** | **16** | **16** |

## 2.4. Verificación de integridad mediante SHA-256

Después de la migración se ejecutó `backend/scripts/verify-migration.js`, que consulta los registros de origen y destino, los ordena por identificador y compara sus hashes SHA-256.

**Tabla events**

- Hash de origen: `d9d69344b0dba7301a6d365a96a2c2453bd8528a866a65b6d60f133248626206`
- Hash de destino: `d9d69344b0dba7301a6d365a96a2c2453bd8528a866a65b6d60f133248626206`
- Resultado: COINCIDEN.

**Tabla equipment**

- Hash de origen: `613dc4710a8c5df209bac6140d8326286127da3f8db7cac22d2620f6c7fc043c`
- Hash de destino: `613dc4710a8c5df209bac6140d8326286127da3f8db7cac22d2620f6c7fc043c`
- Resultado: COINCIDEN.

**Resultado general:** migración verificada. Los 16 registros coinciden entre origen y destino.

La evidencia detallada se conserva en `backend/evidence/migration-verification.txt`.

## 2.5. Pruebas posteriores a la migración

Se realizaron consultas desde la API hacia la base de datos de Render:

| Endpoint | Resultado |
|---|---|
| GET /api/cloud/events | HTTP 200; 4 eventos recibidos |
| GET /api/cloud/equipment | HTTP 200; 12 equipos recibidos |

**Resultado:** las dos consultas posteriores a la migración fueron exitosas.

## 2.6. Ventana de migración y continuidad

La migración se ejecutó durante la sesión de trabajo del 12 de noviembre de 2026. No se registraron las horas exactas de inicio y finalización.

La base de datos local se conservó después de la migración, por lo que los datos de origen permanecieron disponibles durante las verificaciones. No se realizó una interrupción del servicio local para ejecutar esta actividad.

La migración y las consultas al destino fueron verificadas; no se registra todavía un cambio definitivo de la conexión principal de la aplicación hacia Render.

---

# Sección 6. Configuración y verificación de la implementación

## 6.1. Arquitectura implementada

Para complementar la aplicación móvil desarrollada en las semanas anteriores, se implementó un backend con Node.js y Express, conectado a PostgreSQL.

Los componentes implementados son:

- API desarrollada con Express.
- Base de datos PostgreSQL local en Docker.
- Base de datos PostgreSQL administrada en Render.
- Variables de entorno para configuración y conexión.
- Endpoints para consultar eventos y equipos.
- Endpoint de salud para verificar la conexión con PostgreSQL.
- Scripts de migración, verificación y pruebas.

## 6.2. Configuración y variables de entorno

La configuración utiliza variables de entorno para evitar escribir credenciales directamente en el código.

Las principales variables son:

- `NODE_ENV`: entorno de ejecución.
- `PORT`: puerto de la API.
- `POSTGRES_DB`: nombre de la base de datos local.
- `POSTGRES_USER`: usuario de PostgreSQL.
- `POSTGRES_PASSWORD`: contraseña de PostgreSQL.
- `DATABASE_URL`: conexión a la base de datos principal.
- `CLOUD_DATABASE_URL`: conexión a PostgreSQL en Render.

El archivo `backend/.env.example` contiene valores ficticios para orientar la configuración. El archivo `.env` real se mantiene fuera del control de versiones.

La validación de inicio comprueba que estén definidas `DATABASE_URL` y `CLOUD_DATABASE_URL`. Si falta alguna, se muestra un mensaje de configuración y se detiene el proceso.

## 6.3. Servicios y contenedores

La configuración se encuentra en `backend/deploy/compose.prod.yaml`.

Se implementaron los siguientes servicios:

**PostgreSQL**
- Imagen: postgres:17-alpine.
- Volumen persistente para los datos.
- Comprobación de disponibilidad mediante `pg_isready`.
- Política de reinicio `unless-stopped`.

**API**
- Construcción mediante Dockerfile.
- Puerto de servicio 3000.
- Dependencia de PostgreSQL con condición `service_healthy`.
- Comprobación de salud mediante el endpoint `/api/health`.
- Política de reinicio `unless-stopped`.

## 6.4. Healthchecks y rotación de registros

Los servicios cuentan con comprobaciones de salud:

- PostgreSQL utiliza `pg_isready`.
- La API consulta `/api/health` para comprobar su disponibilidad y conexión con la base de datos.

La rotación de logs utiliza el controlador `json-file`, con los siguientes límites:

- Tamaño máximo por archivo: 10 MB.
- Cantidad máxima de archivos: 3.

La comprobación de los contenedores mostró ambos servicios en estado `healthy`.

## 6.5. Endpoints implementados

| Método | Endpoint | Función |
|---|---|---|
| GET | / | Comprueba la respuesta general de la API |
| GET | /api/health | Comprueba la conexión con PostgreSQL principal |
| GET | /api/events | Consulta los eventos |
| GET | /api/equipment | Consulta los equipos |
| GET | /api/cloud/events | Consulta los eventos alojados en Render |
| GET | /api/cloud/equipment | Consulta los equipos alojados en Render |

## 6.6. Pruebas funcionales

Se ejecutó el comando `pnpm test` desde el directorio `backend`.

Resultados:

1. La API responde correctamente: aprobado.
2. La API devuelve los 4 eventos: aprobado.
3. La API devuelve los 12 equipos: aprobado.
4. El endpoint de salud confirma PostgreSQL: aprobado.

**Resultado:** 4 pruebas aprobadas y 0 fallidas.

## 6.7. Smoke test

Se ejecutó el script `backend/scripts/smoke-test.sh`.

Resultado obtenido:

- API y PostgreSQL disponibles.
- 4 eventos consultados.
- 12 equipos consultados.

**Resultado general:** smoke test aprobado.

## 6.8. Diferencias entre los entornos de base de datos

| Característica | Origen local | Destino |
|---|---|---|
| Motor | PostgreSQL | PostgreSQL |
| Versión | 17 | 18 |
| Infraestructura | Docker local | Servicio administrado Render |
| Administración | Local | Plataforma Render |

La diferencia principal identificada es la versión del motor y el entorno de alojamiento. La migración de las tablas y sus registros se completó correctamente, y la comparación SHA-256 confirmó la coincidencia de los datos.

## 6.9. Estrategia de reversión

Como medida de seguridad, se conservó la base de datos local original y no se eliminaron sus registros después de la migración.

En caso de presentarse problemas en el destino, la estrategia prevista es:

1. Mantener disponible la base de datos local.
2. Restaurar la conexión principal de la API a la instancia local mediante `DATABASE_URL`.
3. Reiniciar el servicio de la API.
4. Ejecutar el endpoint `/api/health`.
5. Ejecutar las pruebas funcionales y el smoke test.
6. Revisar los registros para identificar la causa del inconveniente.

Esta estrategia es un procedimiento de reversión previsto; no se ha registrado una ejecución de rollback.

## 6.10. Lista de verificación posterior

- [x] Variables de entorno documentadas en `.env.example`.
- [x] Credenciales reales excluidas del repositorio.
- [x] Validación de variables obligatorias al iniciar.
- [x] Servicios Docker configurados.
- [x] Healthchecks implementados.
- [x] Rotación de logs configurada.
- [x] API disponible y saludable.
- [x] Conexión con PostgreSQL comprobada.
- [x] Pruebas automatizadas aprobadas.
- [x] Smoke test aprobado.
- [x] Migración de 16 registros ejecutada.
- [x] Hashes SHA-256 comparados.
- [x] Consultas posteriores a la migración en Render aprobadas.
- [ ] Cambio definitivo de la conexión principal de la aplicación hacia Render.
- [ ] Despliegue de la API en un entorno público de producción.

## 6.11. Conclusión

Durante la Semana 5 se implementó y verificó una infraestructura backend para el proyecto DJ Sonido y Luces, utilizando Node.js, Express, PostgreSQL y Docker.

Se configuraron variables de entorno, validaciones de inicio, comprobaciones de salud, rotación de logs y pruebas automatizadas. Además, se ejecutó la migración de los datos iniciales hacia Render, verificando la integridad de los 16 registros mediante hashes SHA-256.

Las pruebas funcionales, el smoke test y las consultas posteriores a la migración finalizaron satisfactoriamente.

Quedan identificadas como actividades pendientes el cambio definitivo de la conexión principal hacia la base de datos en la nube y el despliegue público de la API. Por tanto, la migración de datos está completada y verificada, pero la puesta en producción integral todavía no se declara finalizada.
