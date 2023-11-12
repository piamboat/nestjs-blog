export class AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
}

export class CompanyDto {
  name: string;
  catchPhrase: string;
  bs: string;
}

export class UserDto {
  name: string;
  username: string;
  password: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}
