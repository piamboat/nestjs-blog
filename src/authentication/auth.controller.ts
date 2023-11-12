import { Controller, Post, Body, Res } from "@nestjs/common"
import { AuthService } from "./auth.service";
import { Response } from "express";
import { LoginDto, RegisterDto } from "./auth.dto";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Res() response: Response, @Body() loginDto: LoginDto) {
        try {
            const result = await this.authService.login(loginDto);
            return response.status(200).json({
                message: "successfully login",
                result
            })
        }
        catch (err) {
            return response.status(500).json({
                message: "failed login"
            })
        }
    }

    @Post('/register')
    async register(@Res() response: Response, @Body() registerDto: RegisterDto) {
        try {
            const result = await this.authService.register(registerDto);
            return response.status(200).json({
                message: "successfully register",
                result
            })
        }
        catch (err) {
            return response.status(500).json({
                message: "failed register"
            })
        }
    }
}