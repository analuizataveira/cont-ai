import { Router } from "express";
import { RequestHandler } from "express";
import { createUser, login } from "../controllers/UserController";

const router = Router();

router.post("/login", login as RequestHandler);
router.post("/create-user" , createUser as RequestHandler);

export default router;
