
export interface Record {
    id?: number;
    date: string; // DD/MM/YYYY
    amount: number; // value of the financial data
    description: string; // description of the transaction
    type: number; //credit or debit
}

export const TYPE_CREDIT = { value: 0, desc: 'Crédito' };
export const TYPE_DEBIT = { value: 1, desc: 'Débito' };

