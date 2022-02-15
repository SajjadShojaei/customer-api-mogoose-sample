import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PartnersDocument = Partners & Document

@Schema()
export class Partners extends Document {
    _id?: Types.ObjectId;
    @Prop()
    name: string;
    @Prop()
    phone: number;
}

export const PartnetsSchema = SchemaFactory.createForClass(Partners)