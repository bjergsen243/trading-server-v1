import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  ECurrencyType,
  EPaymentMethod,
  EPaymentStatus,
  EWalletType,
} from 'src/shared/enum/payment.enum';
import { ListResponseDto } from 'src/shared/shared.dto';

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

@Exclude()
export class GetMyAccountsResponseDto extends ListResponseDto {
  @Expose()
  @Type(() => PaymentAccountResponseDto)
  @ApiProperty({
    isArray: true,
    description: 'Array of documents',
    type: () => PaymentAccountResponseDto,
  })
  docs: PaymentAccountResponseDto[];
}

@Exclude()
export class PaymentHistoryResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'User id',
  })
  userId: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Account id',
  })
  accountId: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Transaction id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    enum: EPaymentMethod,
    description: 'Type of transaction',
    example: EPaymentMethod.SEND,
  })
  type: EPaymentMethod;

  @Expose()
  @ApiProperty({
    enum: EPaymentStatus,
    description: 'Status of transaction',
    example: EPaymentStatus.WAITING,
  })
  status: EPaymentStatus;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Amount of this transaction',
  })
  amount: number;

  @Expose()
  @ApiProperty({
    enum: ECurrencyType,
    description: 'Currency of this transaction',
    example: ECurrencyType.VND,
  })
  currency: ECurrencyType;
}

@Exclude()
export class GetMyTxsResponseDto extends ListResponseDto {
  @Expose()
  @Type(() => PaymentHistoryResponseDto)
  @ApiProperty({
    isArray: true,
    description: 'Array of documents',
    type: () => PaymentHistoryResponseDto,
  })
  docs: PaymentHistoryResponseDto[];
}
