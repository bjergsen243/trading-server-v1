import { Injectable } from '@nestjs/common';
import { FilterQuery, PipelineStage } from 'mongoose';
import { nanoid } from 'nanoid';
import { PaymentAccount } from 'src/schemas/payment-account.schema';
import { NANOID_LENGTH } from 'src/shared/constants';
import { getPaginatedResponse } from 'src/shared/mongoose/pagination';
import { IPagination } from 'src/shared/shared.interface';
import {
  CreatePaymentAccountRequestDto,
  GetAccountsFilter,
} from '../dto/request.dto';
import { PaymentAccountRepository } from '../repositories';

@Injectable()
export class PaymentAccountService {
  constructor(
    private readonly paymentAccountRepository: PaymentAccountRepository,
  ) {}

  async createPaymentAccount(
    userId: string,
    reqBody: CreatePaymentAccountRequestDto,
  ) {
    // check existed account with the same type and currency
    return await this.paymentAccountRepository.create({
      userId,
      type: reqBody.type,
      balance: 100,
      currency: reqBody.currency,
      id: nanoid(NANOID_LENGTH),
    });
  }

  async getMyAccounts(
    filter: GetAccountsFilter,
    pagination: IPagination,
    userId: string,
  ) {
    const { type, currency } = filter;
    const conditions: FilterQuery<PaymentAccount> = {
      userId: userId,
    };
    if (type) {
      conditions.type = { $in: type };
    }
    if (currency) {
      conditions.currency = { $in: currency };
    }
    const pipelineStages: PipelineStage[] = [{ $match: conditions }];
    pipelineStages.push({
      $sort: { createdAt: -1 },
    });
    pipelineStages.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: pagination.limit * (pagination.page - 1) },
          { $limit: pagination.limit },
        ],
      },
    });
    const accounts =
      await this.paymentAccountRepository.aggregate(pipelineStages);
    const [{ metadata, data: docs }] = accounts;
    const total = metadata?.length ? metadata[0].total : 0;

    return getPaginatedResponse(docs, total, pagination);
  }

  async sendPayment() {}

  async withdrawPayment() {}
}
