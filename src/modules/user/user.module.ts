import { Module } from '@nestjs/common';
import { autoImport } from 'src/shared/helpers';
import { SharedModule } from 'src/shared/shared.module';
import * as repositories from './repositories';
import * as services from './services';
import { UserController } from './user.controller';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [...autoImport(services), ...autoImport(repositories)],
  exports: [...autoImport(services), ...autoImport(repositories)],
})
export class UserModule {}
