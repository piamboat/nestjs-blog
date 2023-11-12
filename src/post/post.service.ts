import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import { Post } from "./post.model";
import { CustomPostResponse } from "./post.interface";
import { mapAddressToCustomFormat } from "src/address/address.helper";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async getAllPost(): Promise<CustomPostResponse[]> {
        const posts = await this.prisma.post.findMany({
            select: {
                id: true,
                userId: false,
                title: true,
                body: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        phone: true,
                        website: true,
                        address: {
                            select: {
                                id: true,
                                street: true,
                                suite: true,
                                city: true,
                                zipcode: true,
                                lat: true,
                                lng: true,
                            },
                        },
                        company: {
                            select: {
                                id: true,
                                name: true,
                                catchPhrase: true,
                                bs: true,
                            },
                        }
                    }
                }
            }
        });

        const customPosts = posts.map(post => {
            const customAddress = mapAddressToCustomFormat(post.user.address)

            return {...post, user: {...post.user, address: customAddress}}
        })

        return customPosts;
    }

    async searchPostByTitle(title: string): Promise<CustomPostResponse[]> {
        const posts = await this.prisma.post.findMany({
            where: {
                title: {
                    contains: title
                }
            },
            select: {
                id: true,
                userId: false,
                title: true,
                body: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        phone: true,
                        website: true,
                        address: {
                            select: {
                                id: true,
                                street: true,
                                suite: true,
                                city: true,
                                zipcode: true,
                                lat: true,
                                lng: true,
                            },
                        },
                        company: {
                            select: {
                                id: true,
                                name: true,
                                catchPhrase: true,
                                bs: true,
                            },
                        }
                    }
                }
            }
        })

        const customPosts = posts.map(post => {
            const customAddress = mapAddressToCustomFormat(post.user.address)

            return {...post, user: {...post.user, address: customAddress}}
        })

        return customPosts;
    }

    async getPost(id: number): Promise<CustomPostResponse | null> {
        const post = await this.prisma.post.findUnique({
            where: {id: Number(id)},
            select: {
                id: true,
                userId: false,
                title: true,
                body: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        phone: true,
                        website: true,
                        address: {
                            select: {
                                id: true,
                                street: true,
                                suite: true,
                                city: true,
                                zipcode: true,
                                lat: true,
                                lng: true,
                            },
                        },
                        company: {
                            select: {
                                id: true,
                                name: true,
                                catchPhrase: true,
                                bs: true,
                            },
                        }
                    }
                }
            }
        })
        if (!post) throw new Error(`Post ${id} not found`)

        const customAddress = mapAddressToCustomFormat(post.user.address)
        
        return {...post, user: {...post.user, address: customAddress}}
    }

    async createPost(data: Post): Promise<CustomPostResponse> {
        const post = await this.prisma.post.create({
            data,
            select: {
                id: true,
                userId: false,
                title: true,
                body: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        phone: true,
                        website: true,
                        address: {
                            select: {
                                id: true,
                                street: true,
                                suite: true,
                                city: true,
                                zipcode: true,
                                lat: true,
                                lng: true,
                            },
                        },
                        company: {
                            select: {
                                id: true,
                                name: true,
                                catchPhrase: true,
                                bs: true,
                            },
                        }
                    }
                }
            }
        })

        if (!post) throw new Error(`Error creating Post`)

        const customAddress = mapAddressToCustomFormat(post.user.address)
        
        return {...post, user: {...post.user, address: customAddress}}
    }

    async updatePost(id: number, data: Partial<Post>): Promise<CustomPostResponse> {
        const existingPost = await this.prisma.post.findUnique({
            where: { id: Number(id) },
        });
    
        if (!existingPost) {
            throw new Error(`Post with ID ${id} not found.`);
        }
    
        const updatedPost = { ...existingPost, ...data, id: undefined };
    
        const result = await this.prisma.post.update({
            where: { id: Number(id) },
            data: updatedPost,
            select: {
                id: true,
                userId: false,
                title: true,
                body: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        phone: true,
                        website: true,
                        address: {
                            select: {
                                id: true,
                                street: true,
                                suite: true,
                                city: true,
                                zipcode: true,
                                lat: true,
                                lng: true,
                            },
                        },
                        company: {
                            select: {
                                id: true,
                                name: true,
                                catchPhrase: true,
                                bs: true,
                            },
                        }
                    }
                }
            }
        });
        if (!result) throw new Error(`Error updating Post`)
        const customAddress = mapAddressToCustomFormat(result.user.address)
        
        return {...result, user: {...result.user, address: customAddress}}
    }    

    async deletePost(id: number): Promise<CustomPostResponse> {
        const delPost = await this.prisma.post.delete({
            where: {id: Number(id)},
            select: {
                id: true,
                userId: false,
                title: true,
                body: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        phone: true,
                        website: true,
                        address: {
                            select: {
                                id: true,
                                street: true,
                                suite: true,
                                city: true,
                                zipcode: true,
                                lat: true,
                                lng: true,
                            },
                        },
                        company: {
                            select: {
                                id: true,
                                name: true,
                                catchPhrase: true,
                                bs: true,
                            },
                        }
                    }
                }
            }
        })
        const customAddress = mapAddressToCustomFormat(delPost.user.address)
        
        return {...delPost, user: {...delPost.user, address: customAddress}}        
    }
}
