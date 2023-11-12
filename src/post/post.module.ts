import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PrismaService } from "src/prisma.service";
import { PostController } from "./post.controller";

@Module({
    controllers: [PostController],
    providers: [PostService, PrismaService]
})
export class PostModule {}