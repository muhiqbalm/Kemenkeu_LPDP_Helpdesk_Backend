import express from "express";
import * as Subtopic from "../controllers/subtopicController.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", Subtopic.createSubtopic);
router.get("/", Subtopic.findAllSubtopic);
router.get("/:id", Subtopic.findSubtopicById);
router.put("/:id", Subtopic.updateSubtopicById);
router.delete("/:id", Subtopic.deleteSubtopicById);

export default router;
