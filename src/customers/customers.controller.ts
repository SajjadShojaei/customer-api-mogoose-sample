import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res
} from '@nestjs/common';
import {CustomersService} from "./customers.service";
import {PaginationQueryDto} from "../shared/dto/paginationQuery.dto";
import {CustomerDto} from "../shared/dto/customer.dto";
import {UpdateCustomerDto} from "../shared/dto/updateCustomer.dto";
import { PartnersDto } from 'src/shared/dto/partners.dto';

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
    public async createCustomer(@Res() res, @Body() createCustomerDto:CustomerDto, createPartnerDto:PartnersDto) {
        try {
            const customer = await this.customerService.create(createCustomerDto,createPartnerDto);
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

    @Put('customer/update/:id')
    public async updateCustomer(@Res() res, @Param('id') customerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        try {
            const customer = await this.customerService.update(
                customerId,updateCustomerDto
            );
            if(!customer) {
                throw  new NotFoundException('Customer dose not exist!')
            }
            return res.status(HttpStatus.OK).json({
                message: 'Customer has been successfully updated',
                customer,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Customer not updated!!',
                status: 400,
            });
        }
    }

    @Delete('customer/delete/:id')
    public async deleteCustomer(@Res() res, @Param('id') customerId: string){
        if(!customerId) {
            throw  new NotFoundException('Customer ID does not exist!');
        }
        const customer = await this.customerService.remove(customerId);

        if(!customer) {
            throw new NotFoundException('Customer does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer,
        });
    }
}
