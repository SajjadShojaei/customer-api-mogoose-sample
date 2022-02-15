import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Customer, CustomerSchema} from "../shared/schemas/customer.schema";
import { Partners, PartnetsSchema } from 'src/shared/schemas/partners.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Customer.name, schema: CustomerSchema },
        { name: Partners.name, schema: PartnetsSchema },
      ])
  ],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
