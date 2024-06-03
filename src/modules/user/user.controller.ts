import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
import { plainToClass } from 'class-transformer';
import {
  ErrorMessageDto,
  UnauthorizedResponseDto,
} from 'src/shared/shared.dto';
import { AuthRequest, JWT_STRATEGY } from '../auth';
import { UpdateUsernameRequestDto } from './dto/request.dto';
import { UserProfileResponseDto } from './dto/response.dto';
import { UserService } from './services';

@Controller('users')
@ApiTags('users')
@ApiBadRequestResponse({ type: ErrorMessageDto })
@ApiUnauthorizedResponse({
  description: 'UNAUTHORIZED',
  type: UnauthorizedResponseDto,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/u/:userId')
  @ApiOperation({
    operationId: 'Get public user information by id',
    summary: 'Get public user information by id',
    description: 'Get public user information by id',
  })
  @ApiOkResponse({ description: 'Successful', type: UserProfileResponseDto })
  async getUserById(@Param('userId') userId: string) {
    const profile = await this.userService.getUserById(userId);
    return plainToClass(UserProfileResponseDto, profile);
  }

  @Get('/profile/m/:email')
  @ApiOperation({
    operationId: 'Get public user information by email',
    summary: 'Get public user information by email',
    description: 'Get public user information by email',
  })
  @ApiOkResponse({ description: 'Successful', type: UserProfileResponseDto })
  async getUserProfileByEmail(@Param('email') email: string) {
    const profile = await this.userService.getUserProfileByEmail(email);
    return plainToClass(UserProfileResponseDto, profile);
  }

  @Get('profile')
  @ApiOperation({
    operationId: 'getMyProfile',
    summary: 'Get my profile',
    description: 'Get my profile',
  })
  @UseGuards(AuthGuard(JWT_STRATEGY))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Successful', type: UserProfileResponseDto })
  async getMyProfile(@Req() req: any) {
    const user = await this.userService.getUserById(req.user?.uid);
    return plainToClass(UserProfileResponseDto, user);
  }

  // @Put('profile/username')
  // @UseGuards(AuthGuard(JWT_STRATEGY))
  // @ApiBearerAuth()
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @ApiOperation({
  //   operationId: 'updateMyProfile',
  //   summary: 'Update my username',
  //   description: 'Update my username',
  // })
  // @ApiBody({
  //   type: UpdateUsernameRequestDto,
  // })
  // @ApiOkResponse({ description: 'Successful', type: UserProfileResponseDto })
  // async updateUsername(@Req() req: AuthRequest, @Body() reqBody: UpdateUsernameRequestDto) {
  //   const newUsername = await this.userService.updateUsername(req.user?.uid, reqBody);
  //   console.log('req.user?.uid', req.user?.uid);
  //   return plainToClass(UserProfileResponseDto, newUsername);
  // }

  // update password

  // update email

  // get all payment accounts

  // get all txs from id

  // get all txs from email

  // get txs filter from account type

  // get txs filter from payment type
}
