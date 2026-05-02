import { Test, TestingModule } from '@nestjs/testing';
import { StaffingAuditController } from './staffing-audit.controller';
import { StaffingAuditService } from './staffing-audit.service';

describe('StaffingAuditController', () => {
  let staffingAuditController: StaffingAuditController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StaffingAuditController],
      providers: [StaffingAuditService],
    }).compile();

    staffingAuditController = app.get<StaffingAuditController>(StaffingAuditController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(staffingAuditController.getHello()).toBe('Hello World!');
    });
  });
});
