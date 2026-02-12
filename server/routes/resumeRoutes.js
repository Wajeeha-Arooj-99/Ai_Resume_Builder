import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume, getAllUserResumes } from "../controllers/resumeControllers.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

// Get public resume (no auth needed) - must be before parameters route
resumeRouter.get('/public/:resumeId', getPublicResumeById);

// Protected routes (require authentication)
// Get all user resumes
resumeRouter.get('/', protect, getAllUserResumes);

// Create resume
resumeRouter.post('/', protect, createResume);

// Upload resume - simplified multer usage
resumeRouter.post('/upload', protect, upload.single('resume'), createResume);

// Get single resume
resumeRouter.get('/get/:resumeId', protect, getResumeById);

// Update resume
resumeRouter.put('/:resumeId', protect, upload.single('image'), updateResume);

// Delete resume
resumeRouter.delete('/:resumeId', protect, deleteResume);

export default resumeRouter;
