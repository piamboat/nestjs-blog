import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { CompanyModule } from './company/company.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    AddressModule,
    CompanyModule,
    PostModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
