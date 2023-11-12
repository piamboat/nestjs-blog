import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CustomUserResponse } from "./user.interface";
import { UserDto } from "./user.dto";
import { CustomPostResponse } from "src/post/post.interface";
import { JwtAuthGuard } from "src/authentication/auth.guard";

@Controller('api/v1/user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    async getAllUser(): Promise<CustomUserResponse[]> {
        return this.userService.getAllUser();
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise<CustomUserResponse | null> {
        return this.userService.getUser(id);
    }

    @Get('/posts/:userId')
    async getUserPostByUserId(@Param('userId') userId: number): Promise<CustomPostResponse[]> {
        return this.userService.getUserPostByUserId(userId);
    }

    @Post()
    async createUser(@Body() data: UserDto): Promise<CustomUserResponse> {
        return this.userService.createUser(data);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<CustomUserResponse> {
        return this.userService.updateUser(id, data);
    }
 
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<CustomUserResponse> {
        return this.userService.deleteUser(id);
    }
}
