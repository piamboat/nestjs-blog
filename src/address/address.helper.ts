// address.helper.ts

import { Address } from '@prisma/client';
import { CustomAddressResponse } from './address.interface';

export function mapAddressToCustomFormat(address: Address): CustomAddressResponse {
  return {
    id: address.id,
    street: address.street,
    suite: address.suite,
    city: address.city,
    zipcode: address.zipcode,
    geo: {
      lat: address.lat,
      lng: address.lng,
    },
  };
}
