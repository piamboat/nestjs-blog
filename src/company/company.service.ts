import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import { Company } from "./company.model";

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}

    async getAllCompany(): Promise<Company[]> {
        return await this.prisma.company.findMany();
    }

    async getCompany(id: number): Promise<Company | null> {
        const company = await this.prisma.company.findUnique({where:{id: Number(id)}})
        if (!company) throw new Error(`Company ${id} not found`)

        return company;
    }

    async createCompany(data: Company): Promise<Company> {
        return await this.prisma.company.create({data})
    }

    async updateCompany(id: number, data: Partial<Company>): Promise<Company> {
        const existingCompany = await this.prisma.company.findUnique({
            where: { id: Number(id) },
        });
    
        if (!existingCompany) {
            throw new Error(`Company with ID ${id} not found.`);
        }
    
        const updatedCompany = { ...existingCompany, ...data, id: undefined };
    
        const result = await this.prisma.company.update({
            where: { id: Number(id) },
            data: updatedCompany,
        });

        if (!result) throw new Error(`Error updating Company`)
        
        return result
    }    

    async deleteCompany(id: number): Promise<Company> {
        return await this.prisma.company.delete({
            where: {id: Number(id)}
        })
    }
}
