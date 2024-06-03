import { Exclude, Expose } from 'class-transformer';
import { IUser } from '../user.interface';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserProfileResponseDto implements IUser {
  @Expose()
  @ApiProperty({
    type: String,
    example: '665d9073c420b2b3e4927c78',
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'test@gmail.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'vippro',
  })
  username?: string;
}
