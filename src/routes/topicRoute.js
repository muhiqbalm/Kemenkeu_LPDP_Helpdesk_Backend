import express from "express";
import * as Topic from "../controllers/topicController.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", Topic.createTopic);
router.get("/", Topic.findAllTopic);
router.get("/:id", Topic.findTopicById);
router.put("/:id", Topic.updateTopicById);
router.delete("/:id", Topic.deleteTopicById);

export default router;
