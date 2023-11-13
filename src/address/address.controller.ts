import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { AddressService } from "./address.service";
import { Address } from "./address.model";
import { CustomAddressResponse } from "./address.interface";
import { JwtAuthGuard } from "src/authentication/auth.guard";

@Controller('api/v1/address')
@UseGuards(JwtAuthGuard)
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    async getAllAddress(): Promise<CustomAddressResponse[]> {
        return this.addressService.getAllAddress();
    }

    @Get(':id')
    async getAddress(@Param('id') id: number): Promise<CustomAddressResponse | null> {
        return this.addressService.getAddress(id);
    }

    @Post()
    async createAddress(@Body() data: Address): Promise<CustomAddressResponse> {
        return this.addressService.createAddress(data);
    }

    @Patch(':id')
    async updateAddress(@Param('id') id: number, @Body() data: Partial<Address>): Promise<CustomAddressResponse> {
        return this.addressService.updateAddress(id, data);
    }
 
    @Delete(':id')
    async deleteAddress(@Param('id') id: number): Promise<CustomAddressResponse> {
        return this.addressService.deleteAddress(id);
    }
}
