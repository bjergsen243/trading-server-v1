import { Module, forwardRef } from '@nestjs/common';
import { autoImport } from 'src/shared/helpers';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from '../user/user.module';
import { PaymentController } from './payment.controller';
import * as repositories from './repositories';
import * as services from './services';

@Module({
  imports: [SharedModule, forwardRef(() => UserModule)],
  controllers: [PaymentController],
  providers: [...autoImport(services), ...autoImport(repositories)],
  exports: [...autoImport(services), ...autoImport(repositories)],
})
export class PaymentModule {}
