import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async login(loginDto: LoginDto) {
        const {username, password} = loginDto
        const user = await this.prisma.user.findUnique({
            where: {username}
        })

        if (!user) throw new Error(`${username} is not found`);

        const validatePassword = await bcrypt.compare(password, user.password)

        if(!validatePassword) throw new Error(`Invalid Password`);

        return {
            token: this.jwtService.sign({username}),
            username: user.username,
            userId: user.id
        }
    }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.createUser(registerDto);
        
        return {
            token: this.jwtService.sign({username: user.username})
        }
    }
}