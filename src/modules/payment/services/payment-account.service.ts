import { Injectable } from '@nestjs/common';
import { PaymentAccountRepository } from '../repositories';
import { CreatePaymentAccountRequestDto } from '../dto/request.dto';
import { nanoid } from 'nanoid';
import { NANOID_LENGTH } from 'src/shared/constants';

@Injectable()
export class PaymentAccountService {
  constructor(
    private readonly paymentAccountRepository: PaymentAccountRepository,
  ) {}

  async createPaymentAccount(
    userId: string,
    reqBody: CreatePaymentAccountRequestDto,
  ) {
    return await this.paymentAccountRepository.create({
      userId,
      type: reqBody.type,
      balance: 100,
      currency: reqBody.currency,
      id: nanoid(NANOID_LENGTH),
    });
  }
}
