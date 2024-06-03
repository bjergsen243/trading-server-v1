import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/services';
import { JwtService } from '@nestjs/jwt';
import {
  RefreshToken,
  RefreshTokenDocument,
} from 'src/schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { AuthPayloadDto, SignInDto } from './dtos/request.dto';
import { IJwtPayload, IJwtToken } from './auth.interface';
import {
  JwtPayloadInvalidError,
  JwtTokenExpiredError,
  RefreshPayloadInvalidError,
  WrongPasswordError,
} from './auth.error';
import { nowInSeconds } from 'src/shared/utils/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;

    let user = await this.userService.getUserByEmail(email);

    if (!user) {
      user = await this.userService.create(signInDto);
    }

    // check validate password
    let validatePassword = await this.validatePassword(password, user.password);
    if (!validatePassword) {
      throw new WrongPasswordError();
    }

    const authTokens = await this.generateTokens({
      uid: user.id,
      email: user.email,
    });

    return {
      ...authTokens,
    };
  }

  async verifyAccessToken(token: string): Promise<IJwtPayload | Error> {
    return await this.verifyJwtToken(token);
  }

  private async createAccessToken(
    payload: AuthPayloadDto,
    expiresIn?: string | number | undefined,
  ): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: expiresIn
        ? expiresIn
        : this.configService.get('auth.accessTokenExpire'),
    });
  }

  private async createRefreshToken(
    payload: AuthPayloadDto,
    oldRefreshToken?: string,
  ): Promise<string> {
    try {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get('auth.refreshToken'),
        expiresIn: this.configService.get('auth.refreshTokenExpire'),
      });

      if (oldRefreshToken) {
        const existedToken = await this.getRefreshToken(oldRefreshToken);
        if (!existedToken) {
          throw new RefreshPayloadInvalidError();
        }

        await this.updateRefreshToken(
          payload.email,
          oldRefreshToken,
          refreshToken,
        );
      } else {
        await this.createNewRefreshToken(payload.email, refreshToken);
      }

      return refreshToken;
    } catch (e) {
      throw e;
    }
  }

  private async createNewRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<void> {
    await this.refreshTokenModel.create({
      email,
      refreshToken,
    });
  }

  private async updateRefreshToken(
    email: string,
    oldRefreshToken: string,
    refreshToken: string,
  ): Promise<void> {
    await this.refreshTokenModel.findOneAndUpdate(
      {
        email,
        refreshToken: oldRefreshToken,
      },
      {
        refreshToken,
      },
    );
  }

  private async getRefreshToken(
    oldRefreshToken: string,
  ): Promise<string | null> {
    const refreshToken = await this.refreshTokenModel.findOne({
      refreshToken: oldRefreshToken,
    });

    if (!refreshToken) {
      return null;
    }
    return refreshToken.refreshToken;
  }
  private async generateTokens(payload: AuthPayloadDto): Promise<IJwtToken> {
    try {
      const accessToken = await this.createAccessToken(payload);
      const refreshToken = await this.createRefreshToken(payload);
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  }

  private async verifyJwtToken(
    authorization: string,
  ): Promise<IJwtPayload | Error> {
    const now = nowInSeconds();
    let payload: IJwtPayload;
    try {
      payload = await this.jwtService.verify(authorization.substring(7), {
        ignoreExpiration: true,
      });
    } catch (e) {
      return new JwtPayloadInvalidError();
    }

    if (payload.exp < now) {
      return new JwtTokenExpiredError();
    }

    return payload;
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
