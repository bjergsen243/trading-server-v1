import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
  PaymentAccount,
  PaymentAccountDocument,
} from 'src/schemas/payment-account.schema';
import { BaseRepository } from 'src/shared/repositories/base.repository';

@Injectable()
export class PaymentAccountRepository extends BaseRepository<PaymentAccount> {
  constructor(
    @InjectModel(PaymentAccount.name)
    model: PaginateModel<PaymentAccountDocument>,
  ) {
    super(model);
  }
}
