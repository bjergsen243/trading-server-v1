import { ECurrencyType, EWalletType } from 'src/shared/enum/payment.enum';

export interface IPaymentAccount {
  userId: string;
  id: string;
  type: EWalletType;
  balance: number;
  currency: ECurrencyType;
}
