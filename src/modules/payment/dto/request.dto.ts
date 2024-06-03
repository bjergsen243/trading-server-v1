import { Exclude, Expose } from 'class-transformer';
import { ECurrencyType, EWalletType } from 'src/shared/enum/payment.enum';
import { IPaymentAccount } from '../payment.interface';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreatePaymentAccountRequestDto implements IPaymentAccount {
  @Expose()
  @ApiProperty({
    type: String,
    example: '665d9073c420b2b3e4927c78',
  })
  userId: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '665d9073c420b2b3e4927c78',
  })
  id: string;

  @Expose()
  @ApiProperty({
    enum: EWalletType,
    example: EWalletType.CREDIT,
  })
  type: EWalletType;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 100,
  })
  balance: number;

  @Expose()
  @ApiProperty({
    enum: ECurrencyType,
    example: ECurrencyType.VND,
  })
  currency: ECurrencyType;
}
