import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { SignInDto } from 'src/modules/auth';
import { NANOID_LENGTH } from 'src/shared/constants';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schemas';
import { plainToClass } from 'class-transformer';
import { UpdateUsernameRequestDto } from '../dto/request.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signInDto: SignInDto): Promise<UserDocument> {
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

  async getUserById(userId: string): Promise<UserDocument> {
    const userProfile = await this.userRepository.findOne({ id: userId });
    if (!userProfile) {
      throw new BadRequestException(`The user with ID: ${userId} not found`);
    }
    return userProfile;
  }

  async getUserProfileByEmail(email: string): Promise<UserDocument> {
    const userProfile = await this.userRepository.findOne({ email });
    if (!userProfile) {
      throw new BadRequestException(`The user with email: ${email} not found`);
    }
    return userProfile;
  }

  async updateUsername(
    userId: string,
    params: UpdateUsernameRequestDto,
  ): Promise<UserDocument> {
    const updateData = plainToClass(UpdateUsernameRequestDto, params, {
      excludeExtraneousValues: true,
    });
    return this.userRepository.findOneAndUpdate(
      { id: userId },
      { $set: updateData },
      { new: true },
    );
  }
}
