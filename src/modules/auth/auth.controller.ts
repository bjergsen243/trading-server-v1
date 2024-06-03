import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorMessageDto,
  UnauthorizedResponseDto,
} from 'src/shared/shared.dto';
import { JWT_STRATEGY } from './auth.constant';
import { AuthService } from './auth.service';
import {
  RefreshTokenRequestDto,
  SignInDto,
  SuccessResponseDto,
  TokenResponseDto,
} from './dtos/request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'public.users.signIn',
    summary: 'Sign in by email',
    description: 'Sign in by email',
  })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: TokenResponseDto })
  @ApiBadRequestResponse({ type: ErrorMessageDto })
  async signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'public.users.refreshToken',
    summary: 'Refresh for new access token',
    description: 'Refresh for new access token',
  })
  @ApiOkResponse({ type: TokenResponseDto })
  @ApiBadRequestResponse({ type: ErrorMessageDto })
  @ApiBody({ type: RefreshTokenRequestDto })
  async refreshToken(@Body() credential: RefreshTokenRequestDto) {
    return this.authService.refreshToken(credential.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'logout',
    summary: 'User logout',
    description: 'User logout',
  })
  @UseGuards(AuthGuard([JWT_STRATEGY]))
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  async logout(@Req() req: any) {
    return this.authService.logout(req.user?.email);
  }
}
