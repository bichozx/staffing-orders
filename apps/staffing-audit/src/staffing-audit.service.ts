import { Injectable } from '@nestjs/common';

@Injectable()
export class StaffingAuditService {
  getHello(): string {
    return 'Hello World!';
  }
}
