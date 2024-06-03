import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorMessageDto } from 'src/shared/shared.dto';
import { AuthService } from './auth.service';
import { SignInDto, TokenResponseDto } from './dtos/request.dto';

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
}
