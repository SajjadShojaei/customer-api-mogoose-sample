import {Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Res} from '@nestjs/common';
import {CustomersService} from "./customers.service";
import {PaginationQueryDto} from "../shared/dto/paginationQuery.dto";
import {CustomerDto} from "../shared/dto/customer.dto";

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) {}

    @Get()
    public async getAllCustomer(@Res() res, @Query() paginationQuery:PaginationQueryDto) {
        const customers = await this.customerService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(customers);
    }

    @Get('find/:id')
    public async getCustomer(@Res() res, @Param('id') customerId: string) {
        const customer = await this.customerService.findOne(customerId);
        if(!customer) {
            throw  new NotFoundException('customer dose not exist!')
        }
        return res.status(HttpStatus.OK).json(customer)
    }

    @Post('customer/create')
    public async createCustomer(@Res() res, @Body() createCustomerDto:CustomerDto) {
        try {
            const customer = await this.customerService.create(createCustomerDto);
            return res.status(HttpStatus.OK).json({
                message: 'Customer has been created successfully',
                customer,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Customer not created!!!',
                status:400
            });
        }
    }
}
