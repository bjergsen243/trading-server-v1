import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import { ECurrencyType, EWalletType } from 'src/shared/enum/payment.enum';

export type PaymentAccountDocument = PaymentAccount & Document;

@Schema({ timestamps: true })
export class PaymentAccount {
  constructor(paymentAccount: PaymentAccount) {
    Object.assign(this, paymentAccount);
  }

  @Prop({ name: 'user_id', required: true })
  userId: string;

  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ enum: EWalletType, default: EWalletType.CREDIT })
  type: EWalletType;

  @Prop({ default: null })
  balance: number;

  @Prop({ enum: ECurrencyType, default: ECurrencyType.VND })
  currency: ECurrencyType;
}

export const PaymentAccountSchema =
  SchemaFactory.createForClass(PaymentAccount);
PaymentAccountSchema.index({ userId: 1 }, { background: true });
PaymentAccountSchema.plugin(MongoosePaginate);
