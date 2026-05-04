import { AuditModule } from './audit/audit.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuditModule],
  exports: [TypeOrmModule],
})
export class StaffingAuditModule {}
