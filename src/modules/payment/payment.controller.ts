import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { plainToClass } from 'class-transformer';
import {
  ErrorMessageDto,
  UnauthorizedResponseDto,
} from 'src/shared/shared.dto';
import { AuthRequest, JWT_STRATEGY } from '../auth';
import { PaymentAccountService, PaymentHistoryService } from './services';
import { PaymentAccountResponseDto } from './dto/response.dto';
import { CreatePaymentAccountRequestDto } from './dto/request.dto';

@Controller('payment')
@ApiTags('payment')
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

  // create payment account

  // send money to other people

  // withdraw money

  @Post('/account')
  @ApiOperation({
    operationId: 'Create new payment account',
    summary: 'Create new payment account',
    description: 'Create new payment account',
  })
  @UseGuards(AuthGuard(JWT_STRATEGY))
  @ApiBearerAuth()
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
}
