import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class Customer extends Document {
    @Prop()
    firstName: string;

    @Prop({ unique: true })
    lastName: string;


    @Prop({ unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    description: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);