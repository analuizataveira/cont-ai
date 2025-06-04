import { Request, Response } from "express"; // use for dealing with HTTP requests and responses
import { AppDataSource } from "../database/data-source";
import { Record, TransactionType } from "../entities/Records";
import { parse, format, isValid } from "date-fns";

// TypeORM repository for the Record entity, get the repository from the database connection
const repo = AppDataSource.getRepository(Record);

// Function to create a new record in the database
export async function createRecord(req: Request, res: Response) {
  try {
    const record = repo.create(req.body); // Create a new record instance from the request body
    await repo.save(record); // Save the new record to the database
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: "Invalid data." });
  }
}

// Function to get all records from the database
export async function getAllRecords(_: Request, res: Response) {
  const records = await repo.find();
  res.json(records);
}

// Function to get a record by its ID
export async function getRecordById(req: Request, res: Response) {
  const record = await repo.findOneBy({ id: Number(req.params.id) });
  record ? res.json(record) : res.status(404).json({ error: "Not found." });
}

// Function to update a record by its ID
export async function updateRecord(req: Request, res: Response) {
  const id = Number(req.params.id);
  const existing = await repo.findOneBy({ id });
  if (!existing) return res.status(404).json({ error: "Not found." });

  repo.merge(existing, req.body);
  await repo.save(existing);
  res.json(existing);
}

// Function to delete a record by its ID
export async function deleteRecord(req: Request, res: Response) {
  const result = await repo.delete(req.params.id);
  result.affected
    ? res.sendStatus(204)
    : res.status(404).json({ error: "Not found" });
}

export async function getGroupedRecords(_: Request, res: Response) {
  try {
    // Fetch all records from the database
    const records = await repo.find();

    const grouped: {
      [key: string]: {
        records: Record[];
        totalCredit: number;
        totalDebit: number;
      };
    } = {};

    // Iterate over each record to group them by month and year
    records.forEach((record) => {
      // parse convert the date string to a Date object
      const date = parse(record.date, "dd/MM/yyyy", new Date());

      // Key for grouping records by month and year
      const key = format(date, "MM/yyyy");

      // Check if the key already exists in the grouped object, if not, initialize it
      if (!grouped[key]) {
        grouped[key] = {
          records: [],
          totalCredit: 0,
          totalDebit: 0,
        };
      }

      // Add the record to the corresponding group
      grouped[key].records.push(record); // push: append a new record to the array

      if (record.type === TransactionType.CREDIT) {
        grouped[key].totalCredit += Number(record.amount);
      } else if (record.type === TransactionType.DEBIT) {
        grouped[key].totalDebit += Number(record.amount);
      }
    });

    // object.entries(grouped) converts the grouped object into an array
    const result = Object.entries(grouped).map(([monthYear, data]) => ({
      monthYear,
      records: data.records,
      totalCredit: data.totalCredit,
      totalDebit: data.totalDebit,
    }));

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while grouping records." });
  }
}
