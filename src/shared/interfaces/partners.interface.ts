import { Document } from "mongoose";

export interface PartnersInterface extends Document {
    readonly name: string;
    readonly phone: number;
}