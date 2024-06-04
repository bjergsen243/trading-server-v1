import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import {
  ECurrencyType,
  EPaymentMethod,
  EPaymentStatus,
  EWalletType,
} from 'src/shared/enum/payment.enum';
import { getEnumValues } from 'src/shared/helpers';
import { IPaymentAccount, IPaymentHistory } from '../payment.interface';

@Exclude()
export class CreatePaymentAccountRequestDto
  implements Partial<IPaymentAccount>
{
  @Expose()
  @ApiProperty({
    type: String,
    example: '665d9073c420b2b3e4927c78',
  })
  userId: string;

  @Expose()
  @ApiProperty({
    enum: EWalletType,
    example: EWalletType.CREDIT,
  })
  @IsEnum(EWalletType)
  type: EWalletType;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  balance: number;

  @Expose()
  @ApiProperty({
    enum: ECurrencyType,
    example: ECurrencyType.VND,
  })
  @IsEnum(ECurrencyType)
  currency: ECurrencyType;
}

export class GetAccountsFilter {
  @ApiPropertyOptional({
    description: 'Type of wallet',
    enum: getEnumValues(EWalletType),
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @IsEnum(EWalletType, { each: true })
  type?: EWalletType[];

  @ApiPropertyOptional({
    description: 'Type of currency',
    enum: getEnumValues(ECurrencyType),
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @IsEnum(ECurrencyType, { each: true })
  currency?: ECurrencyType[];
}

export class GetTxsFilter {
  @ApiPropertyOptional({
    description: 'Transaction status',
    enum: getEnumValues(EPaymentStatus),
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @IsEnum(EPaymentStatus, { each: true })
  status?: EPaymentStatus[];

  @ApiPropertyOptional({
    description: 'Type of payment',
    enum: getEnumValues(EPaymentMethod),
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @IsEnum(EPaymentMethod, { each: true })
  type?: EPaymentMethod[];

  @ApiPropertyOptional({
    description: 'Type of currency',
    enum: getEnumValues(ECurrencyType),
    isArray: true,
  })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsArray()
  @IsEnum(ECurrencyType, { each: true })
  currency?: ECurrencyType[];
}

@Exclude()
export class CreatePaymentRequestDto implements Partial<IPaymentHistory> {
  @Expose()
  @ApiProperty({
    type: String,
    example: '665d9073c420b2b3e4927c78',
  })
  accountId: string;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  amount: number;
}
