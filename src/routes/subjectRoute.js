import express from "express";
import * as Subject from "../controllers/subjectController.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth.auth, Subject.createSubject);
router.get("/", Subject.getAllSubject);
router.get("/:id", Subject.findSubjectById);
router.put("/:id", Subject.updateSubjectById);
router.delete("/:id", Subject.deleteSubjectById);

export default router;
