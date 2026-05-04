import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Audit, AuditDocument } from '../schemas/audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(Audit.name)
    private readonly auditModel: Model<AuditDocument>,
  ) {}

  async create(data: Partial<Audit>) {
    return this.auditModel.create(data);
  }

  async findByOrderId(orderId: string) {
    return this.auditModel.find({ orderId }).sort({ createdAt: 1 }).lean();
  }
}
