export enum EPaymentStatus {
  WAITING = 'waiting',
  SUCCEED = 'succeed',
  FAILED = 'failed',
  REVERTED = 'reverted',
}

export enum EWalletType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  VISA = 'visa',
}

export enum EPaymentMethod {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
}

export enum ECurrencyType {
  VND = 'vnd',
  USD = 'usd',
  EUR = 'eur',
}
