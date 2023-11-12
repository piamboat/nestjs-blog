import { Prisma } from '@prisma/client';

export class Address implements Prisma.AddressCreateInput {
  id: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
}
