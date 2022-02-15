import {Injectable, NotFoundException} from '@nestjs/common';
import { Model } from 'mongoose'
import {InjectModel} from "@nestjs/mongoose";
import {Customer} from "../shared/schemas/customer.schema";
import {PaginationQueryDto} from "../shared/dto/paginationQuery.dto";
import {CustomerDto} from "../shared/dto/customer.dto";
import {CustomerInterface} from "../shared/interfaces/customer.interface";
import {UpdateCustomerDto} from "../shared/dto/updateCustomer.dto";
import {Cron, CronExpression} from "@nestjs/schedule";
import { Partners } from 'src/shared/schemas/partners.schema';
import { PartnersDto } from 'src/shared/dto/partners.dto';
import { PartnersInterface } from 'src/shared/interfaces/partners.interface';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
        @InjectModel(Partners.name) private readonly partnersModel: Model<Partners>
    ) {}

    public async findAll( paginationQuery: PaginationQueryDto ):Promise<Customer[]> {
        const { limit, offset } = paginationQuery;
        return await this.customerModel.find().skip(offset).limit(limit).exec()
    }

    public async findOne(customerId: string):Promise<Customer> {
        const customer = await this.customerModel.findById({ _id: customerId }).exec();

        if(!customer) {
            throw new NotFoundException(`Customer #${customerId} not found`);
        }
        return customer;
    }

    public async create( creatCustomerDto: CustomerDto, createPartnerDto: PartnersDto ):Promise<Customer> {
        const newCustomer = await new this.customerModel({...creatCustomerDto});
        const newPartner = await new this.partnersModel({...createPartnerDto})
        newCustomer.save();
        newPartner.save();
        return
    }

    public async update(customerId:string, updateCustomerDto:UpdateCustomerDto):Promise<CustomerInterface>{
        const existingCustomer = await this.customerModel.findByIdAndUpdate(
            {_id:customerId},
            updateCustomerDto);
        if(!existingCustomer) {
            throw new NotFoundException(`Customer #${customerId} not found`);
        }
        return existingCustomer;
    }

    public async remove(customerId:string):Promise<any>{
        const deletedCustomer = await this.customerModel.findByIdAndRemove(customerId);
        return deletedCustomer
    }

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // public async testCron(){
    //     let counter = 0;
    //         console.log(`no ${counter}`)
    //     return
    // }
}
