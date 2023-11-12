import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { Post as PostData } from "./post.model";
import { CustomPostResponse } from "./post.interface";

@Controller('api/v1/post')
export class PostController {
    constructor(private readonly postService: PostService) {}
    
    @Get()
    async getAllPost(): Promise<CustomPostResponse[]> {
        return this.postService.getAllPost();
    }

    @Get('search')
    async searchPostByTitle(@Query('title') title: string): Promise<CustomPostResponse[]> {
        return this.postService.searchPostByTitle(title);
    }

    @Get(':id')
    async getPost(@Param('id') id: number): Promise<CustomPostResponse | null> {
        return this.postService.getPost(id);
    }

    @Post()
    async createPost(@Body() data: PostData): Promise<CustomPostResponse> {
        return this.postService.createPost(data);
    }

    @Patch(':id')
    async updatePost(@Param('id') id: number, @Body() data: Partial<PostData>): Promise<CustomPostResponse> {
        return this.postService.updatePost(id, data);
    }
 
    @Delete(':id')
    async deletePost(@Param('id') id: number): Promise<CustomPostResponse> {
        return this.postService.deletePost(id);
    }
}
