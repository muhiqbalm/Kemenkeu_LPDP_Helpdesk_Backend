import express from "express";
import * as Question from "../controllers/questionController.js";

const router = express.Router();

router.get("/", Question.getAllQuestion);
router.post("/", Question.createQuestion);

export default router;
