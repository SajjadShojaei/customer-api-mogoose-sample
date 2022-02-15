import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Partners } from "./partners.schema";

export type CustomerDocument = Customer & Document

@Schema()
export class Customer extends Document {
    @Prop()
    firstName: string;

    @Prop({ unique: true })
    lastName: string;

    @Prop({
        type: Object,
        ref: Partners.name
    })
    partnerName: Types.ObjectId;

    @Prop({
        type: Object,
        ref: Partners.name
    })
    partnerPhone: Types.ObjectId;

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