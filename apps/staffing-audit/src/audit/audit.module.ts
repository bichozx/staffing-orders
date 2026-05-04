// import { Audit, AuditSchema } from './schemas/audit.schema';

// import { AuditController } from './controllers/audit.controller';
// import { AuditService } from './services/audit.service';
// // staffing-audit/src/audit.module.ts
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     // La URI debe venir de tus variables de entorno en Docker
//     MongooseModule.forRoot(
//       process.env.MONGO_URI ||
//         'mongodb://admin:Danger4587@mongo-db:27017/audit?authSource=admin',
//     ),
//     MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
//   ],
//   controllers: [AuditController],
//   providers: [AuditService],
// })
// export class AuditModule {}

import { Audit, AuditSchema } from './schemas/audit.schema';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Importar esto

import { AuditController } from './controllers/audit.controller';
import { AuditService } from './services/audit.service';
// staffing-audit/src/audit/audit.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // 2. Cargar el ConfigModule para que lea el .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Aquí le dices qué archivo leer en local
    }),

    // 3. Usar forRootAsync para esperar a que la variable esté lista
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
