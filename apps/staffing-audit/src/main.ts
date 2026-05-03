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

import { AppModule } from '../../staffing-orders/src/app.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 4001,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
