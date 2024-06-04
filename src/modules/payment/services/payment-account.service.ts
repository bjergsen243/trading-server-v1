import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, PipelineStage } from 'mongoose';
import { nanoid } from 'nanoid';
import {
  PaymentAccount,
  PaymentAccountDocument,
} from 'src/schemas/payment-account.schema';
import { PaymentHistory } from 'src/schemas/payment-history.schema';
import { NANOID_LENGTH } from 'src/shared/constants';
import { EPaymentMethod, EPaymentStatus } from 'src/shared/enum';
import { EntityNotFoundException } from 'src/shared/exceptions/common.exception';
import { getPaginatedResponse } from 'src/shared/mongoose/pagination';
import { IPagination } from 'src/shared/shared.interface';
import {
  CreatePaymentAccountRequestDto,
  CreatePaymentRequestDto,
  GetAccountsFilter,
} from '../dto/request.dto';
import {
  PaymentAccountRepository,
  PaymentHistoryRepository,
} from '../repositories';

@Injectable()
export class PaymentAccountService {
  constructor(
    private readonly paymentAccountRepository: PaymentAccountRepository,
    private readonly paymentHistoryRepo: PaymentHistoryRepository,
  ) {}

  async createPaymentAccount(
    userId: string,
    reqBody: CreatePaymentAccountRequestDto,
  ): Promise<PaymentAccountDocument> {
    // TODO: check existed account with the same type and currency

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

  async sendPayment(
    userId: string,
    reqBody: CreatePaymentRequestDto,
  ): Promise<PaymentHistory> {
    const { accountId, amount } = reqBody;
    const account = await this.getPaymentAccount(userId, accountId);
    if (account.balance < amount) {
      throw new BadRequestException(`Insufficient balance`);
    }

    const transaction = {
      id: nanoid(NANOID_LENGTH),
      userId: userId,
      accountId: accountId,
      amount: amount,
      status: EPaymentStatus.WAITING,
      type: EPaymentMethod.SEND,
      currency: account.currency,
    };

    try {
      await this.paymentHistoryRepo.create(transaction);
      processTransaction(transaction)
        .then(async (processedTransaction) => {
          return await this.paymentHistoryRepo
            .findOneAndUpdate(
              {
                id: processedTransaction.id,
              },
              {
                status: EPaymentStatus.SUCCEED,
              },
            )
            .then(async () => {
              return await this.paymentAccountRepository.findOneAndUpdate(
                {
                  id: accountId,
                },
                {
                  balance: account.balance - amount,
                },
              );
            });
        })
        .catch(async (error) => {
          await this.paymentHistoryRepo.findOneAndUpdate(
            {
              id: transaction.id,
            },
            {
              status: EPaymentStatus.FAILED,
            },
          );
          throw error;
        });

      return await this.paymentHistoryRepo.findOne({ id: transaction.id });
    } catch (e) {
      throw e;
    }
  }

  async withdrawPayment(
    userId: string,
    reqBody: CreatePaymentRequestDto,
  ): Promise<PaymentHistory> {
    const { accountId, amount } = reqBody;
    const account = await this.getPaymentAccount(userId, accountId);

    const transaction = {
      id: nanoid(NANOID_LENGTH),
      userId: userId,
      accountId: accountId,
      amount: amount,
      status: EPaymentStatus.WAITING,
      type: EPaymentMethod.WITHDRAW,
      currency: account.currency,
    };

    try {
      await this.paymentHistoryRepo.create(transaction);
      processTransaction(transaction)
        .then(async (processedTransaction) => {
          return await this.paymentHistoryRepo
            .findOneAndUpdate(
              {
                id: processedTransaction.id,
              },
              {
                status: EPaymentStatus.SUCCEED,
              },
            )
            .then(async () => {
              return await this.paymentAccountRepository.findOneAndUpdate(
                {
                  id: accountId,
                },
                {
                  balance: account.balance + amount,
                },
              );
            });
        })
        .catch(async (error) => {
          await this.paymentHistoryRepo.findOneAndUpdate(
            {
              id: transaction.id,
            },
            {
              status: EPaymentStatus.FAILED,
            },
          );
          throw error;
        });

      return await this.paymentHistoryRepo.findOne({ id: transaction.id });
    } catch (e) {
      throw e;
    }
  }

  private async getPaymentAccount(
    userId: string,
    id: string,
  ): Promise<PaymentAccountDocument> {
    const account = await this.paymentAccountRepository.findOne({
      id: id,
      userId: userId,
    });

    if (!account) {
      throw new EntityNotFoundException(PaymentAccount.name, id);
    }
    return account;
  }
}

function processTransaction(transaction: any): Promise<any> {
  return new Promise((resolve) => {
    console.log('Transaction processing started for:', transaction);

    // Simulate long-running process
    setTimeout(() => {
      // After 30 seconds, we assume the transaction is processed successfully
      console.log('Transaction processed for:', transaction);
      resolve(transaction);
    }, 30000); // 30 seconds
  });
}
