<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Staffing Orders System

# Arquitectura del Proyecto

El sistema está dividido en dos servicios principales:

1. Staffing Orders: Servicio encargado de la lógica de negocio de órdenes (Usa TypeORM + PostgreSQL).

2. Staffing Audit: Servicio encargado del registro y seguimiento de auditoría (Usa Mongoose + MongoDB).

# Instalación

1. Clonar proyecto git clone ``
2. `npm install`
3. **Configuración de Entorno:**
   Copia el archivo de ejemplo y ajusta las credenciales de las bases de datos:
   ```bash
   cp .env.example .env
   ```
4. Cambiar las variables de entorno
5. **Levantar Infraestructura (Docker):**
   Este comando iniciará los contenedores de **PostgreSQL** y **MongoDB**:

   ```bash
   docker-compose up --build
   ```

6. **Ejecutar los servicios:**
   Puedes levantar cada microservicio de forma independiente:

   ```bash
   # Servicio de Órdenes
   npm run start:orders

   # Servicio de Auditoría
   npm run start:audit
   ```
