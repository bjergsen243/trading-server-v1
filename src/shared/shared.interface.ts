export interface IPagination<T = Record<string, unknown>> {
  page: number;
  limit: number;
  sort?: Partial<Record<keyof T, 1 | -1>> & { createdAt?: 1 | -1 };
  lean?: boolean;
}

export interface ITxTrace {
  txHash: string;
  txStatus: number;
  timestamp: number;
}
