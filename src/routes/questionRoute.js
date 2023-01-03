import express from "express";
import * as Question from "../controllers/questionController.js";
import * as Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", Auth.auth, Question.getAllQuestion);
router.get("/:id", Auth.auth, Question.getQuestionById);
router.post("/", Auth.auth, Question.createQuestion);
router.put("/:id", Auth.auth, Question.updateQuestionById);
router.delete("/:id", Auth.auth, Question.deleteQuestionById);

export default router;
