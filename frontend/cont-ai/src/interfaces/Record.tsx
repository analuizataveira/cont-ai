export enum TransactionType {
    CREDIT = 0,
    DEBIT = 1,
}

export interface Record {
    id?: number;
    date: string; // DD/MM/YYYY
    amount: number; // value of the financial data
    description: string; // description of the transaction
    type: TransactionType; //credit or debit
}

export const TYPE_CREDIT = { value: TransactionType.CREDIT, desc: 'Credit' };
export const TYPE_DEBIT = { value: TransactionType.DEBIT, desc: 'Debit' };

