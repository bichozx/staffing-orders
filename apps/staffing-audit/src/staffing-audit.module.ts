import { Module } from '@nestjs/common';
import { StaffingAuditController } from './staffing-audit.controller';
import { StaffingAuditService } from './staffing-audit.service';

@Module({
  imports: [],
  controllers: [StaffingAuditController],
  providers: [StaffingAuditService],
})
export class StaffingAuditModule {}
