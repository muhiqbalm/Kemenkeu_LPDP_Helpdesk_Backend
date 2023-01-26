import express from "express";
import * as Scholarship from "../controllers/scholarshipController.js";
import * as auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth.auth, Scholarship.createScholarship);
router.get("/", Scholarship.findAllScholarship);
router.get("/:id", Scholarship.findScholarshipById);
router.put("/:id", Scholarship.updateScholarshipById);
router.delete("/:id", Scholarship.deleteScholarshipById);

export default router;
