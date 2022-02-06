import {Injectable, NotFoundException} from '@nestjs/common';
import { Model } from 'mongoose'
import {InjectModel} from "@nestjs/mongoose";
import {Customer} from "../shared/schemas/customer.schema";
import {PaginationQueryDto} from "../shared/dto/paginationQuery.dto";
import {CustomerDto} from "../shared/dto/customer.dto";
import {CustomerInterface} from "../shared/interfaces/customer.interface";

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
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

    public async create( creatCustomerDto: CustomerDto ):Promise<CustomerInterface> {
        const newCustomer = await new this.customerModel(creatCustomerDto);
        return newCustomer.save();
    }
}
