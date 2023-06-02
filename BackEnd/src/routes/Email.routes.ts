import { Router } from "express";
import { email } from "../controllers/Email.controllers"

export const emailRouter = Router();

emailRouter.post("/", email);