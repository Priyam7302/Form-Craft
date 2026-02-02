import { Router } from "express";
import { saveForm } from "../controllers/form.js";

const formRouter = Router();

formRouter.post("/", saveForm);
export default formRouter;
