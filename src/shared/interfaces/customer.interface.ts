import { Document } from 'mongoose'

export interface CustomerInterface extends Document{
    readonly firstName: string;
    readonly lastName: string;
    readonly partnerName: object;
    readonly partnerPhone: object;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly description: string;
}