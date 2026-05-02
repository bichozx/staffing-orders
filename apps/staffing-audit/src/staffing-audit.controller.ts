import { Controller, Get } from '@nestjs/common';
import { StaffingAuditService } from './staffing-audit.service';

@Controller()
export class StaffingAuditController {
  constructor(private readonly staffingAuditService: StaffingAuditService) {}

  @Get()
  getHello(): string {
    return this.staffingAuditService.getHello();
  }
}
