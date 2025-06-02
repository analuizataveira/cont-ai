import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum TransactionType {
    CREDIT = 0,
    DEBIT = 1,
}

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: string;

    @Column("decimal")
    amount!: number;

    @Column()
    description!: string;

    @Column({
        type: "enum",
        enum: TransactionType,
    })
    type!: TransactionType;
}
