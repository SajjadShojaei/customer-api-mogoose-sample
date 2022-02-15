import { PartialType } from "@nestjs/mapped-types";
import { PartnersDto } from "./partners.dto";

export class UpdatePartnersDto extends PartialType(PartnersDto){}