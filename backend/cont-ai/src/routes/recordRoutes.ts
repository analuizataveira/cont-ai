import { Router } from "express";
import { createRecord, deleteRecord, getAllRecords, getRecordById, updateRecord } from "../controllers/RecordController";
import { RequestHandler } from "express";

const router = Router();

router.post("/records", createRecord);
router.get("/records", getAllRecords);
router.get("/records/:id", getRecordById);
router.put("/records/:id", updateRecord as RequestHandler);
router.delete("/records/:id", deleteRecord);

export default router;
