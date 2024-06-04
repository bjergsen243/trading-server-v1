import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import {
  ECurrencyType,
  EPaymentMethod,
  EPaymentStatus,
} from 'src/shared/enum/payment.enum';

export type PaymentHistoryDocument = PaymentHistory & Document;

@Schema({ timestamps: true })
export class PaymentHistory {
  constructor(paymentHistory: PaymentHistory) {
    Object.assign(this, paymentHistory);
  }

  @Prop({ name: 'user_id', required: true })
  userId: string;

  @Prop({ name: 'account_id', required: true })
  accountId: string;

  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ default: 0 })
  amount: number;

  @Prop({ enum: EPaymentStatus, default: EPaymentStatus.WAITING })
  status: EPaymentStatus;

  @Prop({ enum: EPaymentMethod, default: null })
  type: EPaymentMethod;

  @Prop({ enum: ECurrencyType, default: ECurrencyType.VND })
  currency: ECurrencyType;
}

export const PaymentHistorySchema =
  SchemaFactory.createForClass(PaymentHistory);
PaymentHistorySchema.index({ accountId: 1 }, { background: true });
PaymentHistorySchema.index({ userId: 1 }, { background: true });
PaymentHistorySchema.plugin(MongoosePaginate);
