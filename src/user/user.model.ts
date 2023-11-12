import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  addressId: number;
  companyId: number;
  phone: string;
  website: string;
}
