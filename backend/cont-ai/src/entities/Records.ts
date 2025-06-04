import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// TransactionTypes 
export enum TransactionType {
  CREDIT = 0,
  DEBIT = 1,
}

// TypeORM will create a table named "record" based on this entity
@Entity()
export class Record {

  // Auto-incrementing primary key
  @PrimaryGeneratedColumn()
  id!: number;

  // Date column in the format "dd/MM/yyyy"
  @Column()
  date!: string;

  // Amount column with precision and scale for decimal values
  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  // Description column VARCHAR
  @Column()
  description!: string;

  // Type column ENUM with values CREDIT and DEBIT
  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type!: TransactionType;
}

/* CREATE TABLE record (
  id SERIAL PRIMARY KEY,
  date VARCHAR NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description VARCHAR NOT NULL,
  type SMALLINT NOT NULL -- 0 or 1
);
*/