import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
  PaymentHistory,
  PaymentHistoryDocument,
} from 'src/schemas/payment-history.schema';
import { BaseRepository } from 'src/shared/repositories/base.repository';

@Injectable()
export class PaymentHistoryRepository extends BaseRepository<PaymentHistory> {
  constructor(
    @InjectModel(PaymentHistory.name)
    model: PaginateModel<PaymentHistoryDocument>,
  ) {
    super(model);
  }
}
