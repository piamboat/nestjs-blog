import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { Company } from "./company.model";
import { JwtAuthGuard } from "src/authentication/auth.guard";

@Controller('api/v1/company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}
    
    @Get()
    async getAllCompany(): Promise<Company[]> {
        return this.companyService.getAllCompany();
    }

    @Get(':id')
    async getCompany(@Param('id') id: number): Promise<Company | null> {
        return this.companyService.getCompany(id);
    }

    @Post()
    async createCompany(@Body() data: Company): Promise<Company> {
        return this.companyService.createCompany(data);
    }

    @Patch(':id')
    async updateCompany(@Param('id') id: number, @Body() data: Partial<Company>): Promise<Company> {
        return this.companyService.updateCompany(id, data);
    }
 
    @Delete(':id')
    async deleteCompany(@Param('id') id: number): Promise<Company> {
        return this.companyService.deleteCompany(id);
    }
}
