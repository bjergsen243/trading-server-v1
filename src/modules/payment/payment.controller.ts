import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ApiPaginationQuery, Pagination } from 'src/shared/decorators';
import {
  ErrorMessageDto,
  UnauthorizedResponseDto,
} from 'src/shared/shared.dto';
import { IPagination } from 'src/shared/shared.interface';
import { AuthRequest, JWT_STRATEGY } from '../auth';
import {
  CreatePaymentAccountRequestDto,
  CreatePaymentRequestDto,
  GetAccountsFilter,
  GetTxsFilter,
} from './dto/request.dto';
import {
  GetMyAccountsResponseDto,
  GetMyTxsResponseDto,
  PaymentAccountResponseDto,
  PaymentHistoryResponseDto,
} from './dto/response.dto';
import { PaymentAccountService, PaymentHistoryService } from './services';

@Controller('payment')
@ApiTags('payment')
@UseGuards(AuthGuard(JWT_STRATEGY))
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorMessageDto })
@ApiUnauthorizedResponse({
  description: 'UNAUTHORIZED',
  type: UnauthorizedResponseDto,
})
export class PaymentController {
  constructor(
    private readonly paymentAccountService: PaymentAccountService,
    private readonly paymentHistoryService: PaymentHistoryService,
  ) {}

  // Create new payment account
  @Post('/create-account')
  @ApiOperation({
    operationId: 'Create new payment account',
    summary: 'Create new payment account',
    description: 'Create new payment account',
  })
  @ApiOkResponse({ description: 'Successful', type: PaymentAccountResponseDto })
  async getUserProfileByEmail(
    @Req() req: AuthRequest,
    @Body() reqBody: CreatePaymentAccountRequestDto,
  ) {
    const newPaymentAccount =
      await this.paymentAccountService.createPaymentAccount(
        req.user?.uid,
        reqBody,
      );
    return plainToClass(PaymentAccountResponseDto, newPaymentAccount);
  }

  // Get all my payment accounts
  @Get('/my-accounts')
  @ApiOperation({
    operationId: 'getMyPaymentAccounts',
    summary: 'Get my payment accounts.',
    description: 'Get my payment accounts.',
  })
  @ApiOkResponse({ type: GetMyAccountsResponseDto })
  @ApiPaginationQuery()
  async getMyAccounts(
    @Query() filters: GetAccountsFilter,
    @Pagination() pagination: IPagination,
    @Req() req: AuthRequest,
  ) {
    const result = await this.paymentAccountService.getMyAccounts(
      filters,
      pagination,
      req.user.uid,
    );
    return plainToInstance(GetMyAccountsResponseDto, result);
  }

  // Get all my transactions
  @Get('/my-txs')
  @ApiOperation({
    operationId: 'getMyTransactions',
    summary: 'Get my transactions.',
    description: 'Get my transactions.',
  })
  @ApiOkResponse({ type: GetMyTxsResponseDto })
  @ApiPaginationQuery()
  async getMyTxs(
    @Query() filters: GetTxsFilter,
    @Pagination() pagination: IPagination,
    @Req() req: AuthRequest,
  ) {
    const result = await this.paymentHistoryService.getMyTxs(
      filters,
      pagination,
      req.user.uid,
    );
    return plainToInstance(GetMyTxsResponseDto, result);
  }

  // Send money
  @Post('/send')
  @ApiOperation({
    operationId: 'sendPayment',
    summary: 'Send payment',
    description: 'Send payment',
  })
  @ApiOkResponse({ description: 'Successful', type: PaymentHistoryResponseDto })
  async sendPayment(
    @Req() req: AuthRequest,
    @Body() reqBody: CreatePaymentRequestDto,
  ) {
    const payment = await this.paymentAccountService.sendPayment(
      req.user?.uid,
      reqBody,
    );
    return plainToClass(PaymentHistoryResponseDto, payment);
  }

  // withdraw money
  @Post('/withdraw')
  @ApiOperation({
    operationId: 'withdrawPayment',
    summary: 'Withdraw payment',
    description: 'Withdraw payment',
  })
  @ApiOkResponse({ description: 'Successful', type: PaymentHistoryResponseDto })
  async withdrawPayment(
    @Req() req: AuthRequest,
    @Body() reqBody: CreatePaymentRequestDto,
  ) {
    const payment = await this.paymentAccountService.withdrawPayment(
      req.user?.uid,
      reqBody,
    );
    return plainToClass(PaymentHistoryResponseDto, payment);
  }
}
