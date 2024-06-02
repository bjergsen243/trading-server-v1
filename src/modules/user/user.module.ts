import { Module } from '@nestjs/common';
import * as repositories from './repositories';
import * as services from './services';
import { SharedModule } from 'src/shared/shared.module';
import { autoImport } from 'src/shared/helpers';
import { UserController } from './user.controller';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [...autoImport(services), ...autoImport(repositories)],
  exports: [...autoImport(services), ...autoImport(repositories)],
})
export class UserModule {}
