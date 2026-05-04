// // import { NestFactory } from '@nestjs/core';
// // import { StaffingAuditModule } from './staffing-audit.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(StaffingAuditModule);
// //   await app.listen(process.env.port ?? 3000);
// // }
// // bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { StaffingAuditModule } from './staffing-audit.module';

// async function bootstrap() {
//   const app = await NestFactory.create(StaffingAuditModule);
//   // Usar 3003 para desarrollo local, 3001 para Docker
//   const port =
//     process.env.NODE_ENV === 'development' ? 3003 : (process.env.port ?? 3006);
//   await app.listen(port);
//   console.log(`Audit service running on port ${port}`);
// }

// bootstrap();

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AuditModule } from './audit/audit.module';
import { NestFactory } from '@nestjs/core';

// Asegúrate de que sea tu AuditModule

// async function bootstrap() {
//   // 1. Crear la app normal para HTTP (Postman)
//   const app = await NestFactory.create(AuditModule);
//   // --- LOGS DE DIAGNÓSTICO ---
//   console.log('--- ENTORNO ACTUAL ---');
//   console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//   console.log(`DB_HOST (Postgres): ${process.env.DB_HOST}`);
//   console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
//   console.log(`AUDIT_PORT: ${process.env.AUDIT_PORT}`);
//   console.log('-----------------------');
//   // 2. Conectar el microservicio TCP (Escuchar a Orders)
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.TCP,
//     options: {
//       host: process.env.MONGO_HOST || 'audit_service', // Importante para Docker
//       port: 4001, // El puerto que configuraste en Orders
//     },
//   });

//   await app.startAllMicroservices();

//   // 3. Escuchar peticiones HTTP en el puerto 3001
//   const port = process.env.PORT || process.env.AUDIT_PORT || 3001;
//   await app.listen(port);

//   console.log(`🚀 Audit HTTP running on: http://localhost:${port}`);
//   console.log(`📡 Audit TCP listening on port: 4001`);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AuditModule);

  // Definir el host de TCP según el entorno
  // En local usamos 'localhost' o '0.0.0.0'
  const tcpHost =
    process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: 4001,
    },
  });

  await app.startAllMicroservices();

  const port = process.env.AUDIT_PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Audit HTTP running on: http://localhost:${port}`);

  console.log(`📡 Audit TCP listening on: ${tcpHost}:4001`);
}
bootstrap();
