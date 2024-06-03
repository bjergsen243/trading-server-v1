import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { BaseRepository } from 'src/shared/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) model: PaginateModel<UserDocument>) {
    super(model);
  }
}
