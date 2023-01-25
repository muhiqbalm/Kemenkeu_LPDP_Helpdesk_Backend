import express from "express";
import * as Question from "../controllers/questionController.js";
import * as Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", Question.getAllQuestion);
router.get("/:id", Question.getQuestionById);
router.post("/", Auth.auth, Question.createQuestion);
router.put("/:id", Auth.auth, Question.updateQuestionById);
router.delete("/:id", Auth.auth, Question.deleteQuestionById);
// router.get("/subyek", Auth.auth, Question.getAllSubject);

export default router;
