<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Staffing Orders System

Sistema de gestión de órdenes y auditoría basado en microservicios con NestJS, utilizando comunicación híbrida (HTTP/TCP) y bases de datos políglotas.

# Arquitectura del Proyecto

El sistema está dividido en dos servicios principales:

1. Staffing Orders: Núcleo de la lógica de negocio.
   - Stack: TypeORM + PostgreSQL.

   - Comunicación: Expone una API REST y actúa como cliente TCP para el servicio de auditoría.

2. Staffing Audit: Registro histórico de cambios y auditoría.
   - Stack: Mongoose + MongoDB.

   - Comunicación: Escucha eventos vía TCP y expone consultas vía HTTP.

# Guía de Inicio Rápido

1. **Requisitos Previos**
   - Node.js (v20.19.4 o superior)
   - Docker & Docker Compose
   - npm

2. **Instalación**
   - git clone https://github.com/bichozx/staffing-orders.git
     cd staffing-orders
     npm install

3. **Configuración de Entorno:**
   - El proyecto utiliza diferentes archivos .env según el contexto de ejecución:

   - **.env:** Configuración para ejecución Local (apunta a localhost).
   - **.env.local:** Configuración para ejecución en Docker (apunta a los nombres de los servicios del contenedor).

   Crea tus archivos basados en los ejemplos (asegúrate de que las credenciales coincidan con tu docker-compose.yml):

   # Ejemplo de variables clave para local (.env)

##### ========================

#### GENERAL

##### ========================

NODE_ENV=development

##### ========================

#### ORDERS SERVICE

##### ========================

ORDERS_PORT=3005

##### Postgres (local)

- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=orders_postgres
- DB_USERNAME=postgres
- DB_PASSWORD=Danger4587

##### ========================

#### AUDIT SERVICE

##### ========================

AUDIT_PORT=3006

# Mongo (local)

- MONGO_URI=mongodb://mongo_admin:7PBFJijlXuSS492s@localhost:27017/audit?authSource=admin

- MONGO_ADMIN=mongo_admin
- PASSWORD=7PBFJijlXuSS492s

##### ========================

#### MICROSERVICES (TCP)

##### ========================

- AUDIT_MS_HOST=localhost
- AUDIT_MS_PORT=4001

##### ========================

#### SECURITY

##### ========================

- API_KEY=super-secret-key-min-32-chars

# Modos de Ejecución

## Opción A: Todo en Docker (Ideal para producción/test rápido)

- Este comando levanta las bases de datos y ambos microservicios automáticamente.

  ```
   docker-compose up --build
  ```

- **Orders API:** http://localhost:3000
- **Audit API:** http://localhost:3001

## Opción B: Híbrido (Ideal para Desarrollo)

Usa Docker para las bases de datos y corre el código en tu máquina para ver cambios en tiempo real sin reconstruir imágenes.

1.  Levantar solo DBs:

```
docker-compose up postgres-db mongo-db -d
```

2. Ejecutar Servicios en Local:
   Abre dos terminales y ejecuta:

```
- Terminal 1: Orders (Puerto 3005 configurado en .env)
npm run start:dev orders

- Terminal 2: Audit (Puerto 3006 configurado en .env)
npm run start:dev audit
```

# API Endpoints

## Orders Service Prefijo api

### Crear orden

```
POST /orders

Headers:
x-api-key: super-secret-key-min-32-chars

Body:
{
"userId": "16",
"product": "Laptop",
"quantity": 22
}
```

---

### Obtener órdenes (paginadas)

```
GET /orders?page=1&limit=10
```

---

### Actualizar órdenes

```
PUT /orders/{id}/status

Body:
{
"status": "CONFIRMED"
}
```

## Audit Service

```
GET /audit/{id}
```

---

# Pruebas de Conectividad

1. Crea una orden en el servicio de Orders.
2. Actualiza su estado.
3. Consulta el servicio de Audit para verificar que el log se guardó correctamente vía TCP.

---

## Testing

Ejecutar pruebas e2e:

npm run test:e2e

---

# Decisiones de diseño

- Se utiliza arquitectura de microservicios para desacoplar la lógica de negocio (Orders) del sistema de auditoría (Audit).

- Se eligió PostgreSQL para Orders debido a su soporte de transacciones y consultas complejas.

- Se eligió MongoDB para Audit por su flexibilidad en almacenamiento de logs no estructurados.

- La comunicación entre servicios se realiza vía TCP para reducir overhead frente a HTTP en eventos internos.

- Se implementa API Key como mecanismo de autenticación simple, ideal para servicios internos.
