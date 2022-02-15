import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { CustomersModule } from './customers/customers.module';
import {ScheduleModule} from "@nestjs/schedule";
import { Customer, CustomerSchema } from './shared/schemas/customer.schema';
import { Partners, PartnetsSchema } from './shared/schemas/partners.schema';

@Module({
  imports: [
      ScheduleModule.forRoot(),
      MongooseModule.forRoot('mongodb://localhost:27017/customer'),
      MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}, { name: Partners.name, schema: PartnetsSchema }]),
      CustomersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
