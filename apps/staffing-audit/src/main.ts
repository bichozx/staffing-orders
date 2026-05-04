import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AuditModule } from './audit/audit.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AuditModule);

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
