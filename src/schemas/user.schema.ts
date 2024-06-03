import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  constructor(user: User) {
    Object.assign(this, user);
  }

  @Prop({ require: true, unique: true })
  id: string;

  @Prop({ require: true, unique: true })
  username?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true, background: true });
UserSchema.index({ username: 1 }, { unique: true, sparse: true });
UserSchema.plugin(MongoosePaginate);
