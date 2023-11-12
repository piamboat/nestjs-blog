import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import { Address } from "./address.model";
import { CustomAddressResponse } from "./address.interface";
import { mapAddressToCustomFormat } from "./address.helper";

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async getAllAddress(): Promise<CustomAddressResponse[]> {
        const addresses = await this.prisma.address.findMany();
        const formattedAddresses = addresses.map(address => mapAddressToCustomFormat(address))

        return formattedAddresses
    }

    async getAddress(id: number): Promise<CustomAddressResponse | null> {
        const anAddress = await this.prisma.address.findUnique({where:{id: Number(id)}})
        if (!anAddress) throw new Error(`Address ${id} not found`)

        return mapAddressToCustomFormat(anAddress);
    }

    async createAddress(data: Address): Promise<CustomAddressResponse> {
        const anAddress = await this.prisma.address.create({data})
        return mapAddressToCustomFormat(anAddress);
    }

    async updateAddress(id: number, data: Partial<Address>): Promise<CustomAddressResponse> {
        const existingAddress = await this.prisma.address.findUnique({
            where: { id: Number(id) },
        });
    
        if (!existingAddress) {
            throw new Error(`Address with ID ${id} not found.`);
        }
    
        const updatedAddress = {
            ...existingAddress,
            ...data,
            id: undefined, // Exclude the id
        };
    
        const updateAddress = await this.prisma.address.update({
            where: { id: Number(id) },
            data: updatedAddress,
        });
        
        if (!updateAddress) throw new Error(`Error updating Address`)

        return mapAddressToCustomFormat(updateAddress)
    }    
    
    async deleteAddress(id: number): Promise<CustomAddressResponse> {
        const delAddress = await this.prisma.address.delete({
            where: {id: Number(id)}
        })

        return mapAddressToCustomFormat(delAddress);
    }
}
