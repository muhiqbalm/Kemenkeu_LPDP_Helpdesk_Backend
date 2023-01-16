import express from "express";
import * as Auth from "../middleware/auth.js";
import * as Agent from "../controllers/agentController.js";

const router = express.Router();

router.get("/", Agent.findAllAgent);
router.get("/current-agent", Auth.auth, Agent.getCurrentAgent);
router.post("/signup", Agent.createAgent);
router.post("/login", Agent.loginAgent);
router.put("/:id", Auth.auth, Agent.updateAgentById);
router.delete("/:id", Agent.deleteAgent);

export default router;
