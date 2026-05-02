import { NestFactory } from '@nestjs/core';
import { StaffingAuditModule } from './staffing-audit.module';

async function bootstrap() {
  const app = await NestFactory.create(StaffingAuditModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
