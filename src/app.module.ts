import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/customer'),
      CustomersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
