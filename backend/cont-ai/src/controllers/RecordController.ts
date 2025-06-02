import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Record } from "../entities/Records";

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
    result.affected ? res.sendStatus(204) : res.status(404).json({ error: "Not found." });
};
