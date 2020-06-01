import { CompaniesService } from './companies.service';
import { Controller, Get, Param, UseGuards, Delete, Put, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { RolesGuard } from '../auth/auth.roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../users/user.entity';
import { CreateCompanyDto } from './dto/createCompany.dto';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService:CompaniesService
    ){}

    @Get()
    @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.ADMIN]))
    getAll(){
        return this.companiesService.getAll();
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    // @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.ADMIN]))
    createCompany(@Body() company:CreateCompanyDto){
        return this.companiesService.createCompany(company);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.ADMIN]))
    getCompanyById(@Param('id') id){
        return this.companiesService.getCompanyById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.ADMIN,UserRole.OWNER]))
    updateById(@Param('id') id){
        return this.companiesService.updateById(id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.ADMIN]))
    deleteById(@Param('id') id){
        return this.companiesService.deleteById(id);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.ADMIN]))
    deleteAllCompanies(){
        return this.companiesService.deleteAllCompanies();
    }
}
