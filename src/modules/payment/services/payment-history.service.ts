import { Injectable } from '@nestjs/common';
import { FilterQuery, PipelineStage } from 'mongoose';
import { PaymentHistory } from 'src/schemas/payment-history.schema';
import { getPaginatedResponse } from 'src/shared/mongoose/pagination';
import { IPagination } from 'src/shared/shared.interface';
import { GetTxsFilter } from '../dto/request.dto';
import { PaymentHistoryRepository } from '../repositories';

@Injectable()
export class PaymentHistoryService {
  constructor(private readonly paymentHistoryRepo: PaymentHistoryRepository) {}

  // get all my txs
  async getMyTxs(
    filter: GetTxsFilter,
    pagination: IPagination,
    userId: string,
  ) {
    const { type, currency, status } = filter;
    const conditions: FilterQuery<PaymentHistory> = {
      userId: userId,
    };
    if (type) {
      conditions.type = { $in: type };
    }
    if (currency) {
      conditions.currency = { $in: currency };
    }
    if (status) {
      conditions.status = { $in: status };
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
    const accounts = await this.paymentHistoryRepo.aggregate(pipelineStages);
    const [{ metadata, data: docs }] = accounts;
    const total = metadata?.length ? metadata[0].total : 0;

    return getPaginatedResponse(docs, total, pagination);
  }
}
