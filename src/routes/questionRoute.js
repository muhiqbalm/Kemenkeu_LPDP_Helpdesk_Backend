import express from "express";
import * as Question from "../controllers/questionController.js";
import * as Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", Auth.auth, Question.getAllQuestion);
router.post("/", Auth.auth, Question.createQuestion);

export default router;
