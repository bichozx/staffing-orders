// import { Module } from '@nestjs/common';
// import { Order } from './entities/order.entity';
// import { OrdersController } from './controllers/orders.controller';
// import { OrdersRepository } from './repositories/orders.repository';
// import { OrdersService } from './services/orders.service';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [TypeOrmModule.forFeature([Order])],
//   controllers: [OrdersController],
//   providers: [OrdersService, OrdersRepository],
//   exports: [OrdersService],
// })
// export class OrdersModule {}

import { ClientsModule, Transport } from '@nestjs/microservices'; // 1. Importar esto
import { ConfigModule, ConfigService } from '@nestjs/config';

// staffing-orders/src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// 2. Importar esto

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    // 3. Registrar el cliente TCP para comunicarse con Audit
    ClientsModule.registerAsync([
      {
        name: 'AUDIT_SERVICE', // Este nombre es el que usarás en el constructor del servicio
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            // Usa localhost en local y audit_service en Docker según tu .env
            host: configService.get<string>('AUDIT_MS_HOST') || 'localhost',
            port: configService.get<number>('AUDIT_MS_PORT') || 4001,
          },
        }),
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
