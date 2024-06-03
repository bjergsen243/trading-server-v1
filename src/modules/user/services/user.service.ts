import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { SignInDto } from 'src/modules/auth';
import { NANOID_LENGTH } from 'src/shared/constants';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signInDto: SignInDto) {
    const id = nanoid(NANOID_LENGTH);
    return await this.userRepository.create({
      id,
      email: signInDto.email,
      password: await this.hashedPassword(signInDto.password),
    });
  }

  private async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findOne({ email });
  }
}
