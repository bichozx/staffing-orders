import { Audit, AuditSchema } from './schemas/audit.schema';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Importar esto

import { AuditController } from './controllers/audit.controller';
import { AuditService } from './services/audit.service';
// staffing-audit/src/audit/audit.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
  ],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
