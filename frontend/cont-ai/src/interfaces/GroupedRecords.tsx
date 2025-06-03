import { Record } from "./Record";

export interface GroupedRecords {
  monthYear: string;
  records: Record[];
  totalCredit: number;
  totalDebit: number;
}
