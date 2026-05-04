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

   DB_HOST=localhost
   MONGO_URI=mongodb://mongo_admin:7PBFJijlXuSS492s@localhost:27017/audit?authSource=admin
   AUDIT_MS_HOST=localhost

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

# Pruebas de Conectividad

1. Crea una orden en el servicio de Orders.
2. Actualiza su estado.
3. Consulta el servicio de Audit para verificar que el log se guardó correctamente vía TCP.
