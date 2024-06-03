import { Module } from '@nestjs/common';
import { JwtStrategy } from './modules/auth';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, UserModule, AuthModule, PaymentModule],
  providers: [JwtStrategy],
  exports: [],
})
export class AppModule {}
