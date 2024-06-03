import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ECurrencyType, EWalletType } from 'src/shared/enum/payment.enum';

@Exclude()
export class PaymentAccountResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'User id',
  })
  userId: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Payment account id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    enum: EWalletType,
    description: 'Type of wallet',
    example: EWalletType.CREDIT,
  })
  type: EWalletType;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Balance of this account',
  })
  balance: number;

  @Expose()
  @ApiProperty({
    enum: ECurrencyType,
    description: 'Currency of this account',
    example: ECurrencyType.VND,
  })
  currency: ECurrencyType;
}
