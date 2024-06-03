import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth';

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  providers: [JwtStrategy],
  exports: [],
})
export class AppModule {}
