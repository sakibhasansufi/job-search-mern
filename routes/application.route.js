import express from "express";
import isAuthenticated from "../middlewares/isAuthenticate.js";
import { applyJobs, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJobs);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicant").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;