import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostCreateInput {
  id: number;
  title: string;
  body: string;
  userId: number;
}
