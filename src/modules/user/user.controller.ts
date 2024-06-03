import { Controller } from '@nestjs/common';
import { UserService } from './services';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorMessageDto,
  UnauthorizedResponseDto,
} from 'src/shared/shared.dto';

@Controller('users')
@ApiTags('users')
@ApiBadRequestResponse({ type: ErrorMessageDto })
@ApiUnauthorizedResponse({
  description: 'UNAUTHORIZED',
  type: UnauthorizedResponseDto,
})
export class UserController {
  constructor(private readonly userService: UserService) {}
}
