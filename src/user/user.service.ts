import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { CustomUserResponse } from "./user.interface";
import { UserDto } from "./user.dto";
import { mapAddressToCustomFormat } from "src/address/address.helper";
import { CustomPostResponse } from "src/post/post.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUser(): Promise<CustomUserResponse[]> {
        const users = await this.prisma.user.findMany({
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
                },
            }
        });

        const customUsers = users.map(user => {
            return {...user, address: mapAddressToCustomFormat(user.address)}
        })

        return customUsers
    }

    async getUser(id: number): Promise<CustomUserResponse | null> {
        const user = await this.prisma.user.findUnique({
            where: { id: Number(id) },
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
                },
            }
        });

        if (!user) throw new Error(`User ${id} not found`)

        const customAddress = mapAddressToCustomFormat(user.address)
        
        return {...user, address: customAddress};
    }

    async getUserPostByUserId(userId: number): Promise<CustomPostResponse[]> {
        const posts = await this.prisma.post.findMany({
            where: {userId: Number(userId)},
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

    async createUser(data: UserDto): Promise<CustomUserResponse> {
        const {address, company, password, ...others} = data;
        const createdAddress = await this.prisma.address.create({data: address});
        if (!createdAddress) throw new Error(`Error creating Address.`);

        const createdCompany = await this.prisma.company.create({data: company});
        if (!createdCompany) throw new Error(`Error creating Company`);

        const hashPassword = await bcrypt.hash(password, 10);
        const createdUser = await this.prisma.user.create({data: {...others, password: hashPassword, addressId: createdAddress.id, companyId: createdCompany.id}});
        if (!createdUser) throw new Error(`Error creating User`);

        const {companyId, addressId, ...customUser} = createdUser;
        return {...customUser, company: createdCompany, address: mapAddressToCustomFormat(createdAddress)};
    }

    async updateUser(id: number, data: Partial<User>): Promise<CustomUserResponse> {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: Number(id) },
        });
    
        if (!existingUser) {
            throw new Error(`User with ID ${id} not found.`);
        }
    
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = { ...existingUser, ...data, id: undefined };
    
        const result = await this.prisma.user.update({
            where: { id: Number(id) },
            data: updatedUser,
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
                },
            }
        });
        if (!result) throw new Error(`Error updating User`)
        const customAddress = mapAddressToCustomFormat(result.address);
        
        return {...result, address: customAddress};
    }    

    async deleteUser(id: number): Promise<CustomUserResponse> {
        const delUser = await this.prisma.user.delete({
            where: {id: Number(id)},
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
                },
            }
        })

        const customAddress = mapAddressToCustomFormat(delUser.address);
        
        return {...delUser, address: customAddress};
    }
}
