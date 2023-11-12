import { Prisma } from '@prisma/client';

export class Company implements Prisma.CompanyCreateInput {
  id: number;
  name: string;
  catchPhrase: string;
  bs: string;
}
