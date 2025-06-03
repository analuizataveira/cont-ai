import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Record, TransactionType } from "../entities/Records";
import { parse, format, isValid } from 'date-fns';


const repo = AppDataSource.getRepository(Record);

export const createRecord = async (req: Request, res: Response) => {
  try {
    const record = repo.create(req.body);
    await repo.save(record);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: "Invalid data." });
  }
};

export const getAllRecords = async (_: Request, res: Response) => {
  const records = await repo.find();
  res.json(records);
};

export const getRecordById = async (req: Request, res: Response) => {
  const record = await repo.findOneBy({ id: Number(req.params.id) });
  record ? res.json(record) : res.status(404).json({ error: "Not found." });
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const existing = await repo.findOneBy({ id });
  if (!existing) return res.status(404).json({ error: "Not found." });

  repo.merge(existing, req.body);
  await repo.save(existing);
  res.json(existing);
};

export const deleteRecord = async (req: Request, res: Response) => {
  const result = await repo.delete(req.params.id);
  result.affected
    ? res.sendStatus(204)
    : res.status(404).json({ error: "Not found." });
};

export const getGroupedRecords = async (_: Request, res: Response) => {
  try {
    const records = await repo.find();

    const grouped: {
      [key: string]: {
        records: Record[];
        totalCredit: number;
        totalDebit: number;
      };
    } = {};

    records.forEach((record) => {

      // Parse de data no formato DD/MM/YYYY
      const date = parse(record.date, "dd/MM/yyyy", new Date());

      const key = format(date, "MM/yyyy");

      if (!grouped[key]) {
        grouped[key] = {
          records: [],
          totalCredit: 0,
          totalDebit: 0,
        };
      }

      grouped[key].records.push(record);

      if (record.type === TransactionType.CREDIT) {
        grouped[key].totalCredit += Number(record.amount);
      } else if (record.type === TransactionType.DEBIT) {
        grouped[key].totalDebit += Number(record.amount);
      }
    });

    const result = Object.entries(grouped).map(([monthYear, data]) => ({
      monthYear,
      records: data.records,
      totalCredit: data.totalCredit,
      totalDebit: data.totalDebit,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro ao agrupar registros." });
  }
};
