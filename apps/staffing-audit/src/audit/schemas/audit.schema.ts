import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AuditDocument = Audit & Document;

@Schema({ timestamps: true })
export class Audit {
  @Prop({ required: true })
  orderId!: string;

  @Prop({ required: true })
  fromStatus!: string;

  @Prop({ required: true })
  toStatus!: string;

  @Prop()
  timestamp!: Date;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
