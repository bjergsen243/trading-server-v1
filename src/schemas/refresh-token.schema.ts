import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import authConfig from 'src/config/auth.config';

@Schema({
  timestamps: true,
})
export class RefreshToken {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  refreshToken: string;
}

export type RefreshTokenDocument = RefreshToken & Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

const expireConf = authConfig();
RefreshTokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: expireConf.refreshTokenExpire },
);
