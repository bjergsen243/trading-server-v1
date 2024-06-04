import {
  ECurrencyType,
  EPaymentMethod,
  EPaymentStatus,
  EWalletType,
} from 'src/shared/enum/payment.enum';

export interface IPaymentAccount {
  userId: string;
  id: string;
  type: EWalletType;
  balance: number;
  currency: ECurrencyType;
}

export interface IPaymentHistory {
  userId: string;
  accountId: string;
  id: string;
  amount: number;
  status: EPaymentStatus;
  type: EPaymentMethod;
  currency: ECurrencyType;
}
