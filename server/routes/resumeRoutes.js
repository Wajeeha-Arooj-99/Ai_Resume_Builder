import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume, getAllUserResumes } from "../controllers/resumeControllers.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

// Get all user resumes
resumeRouter.get('/', protect, getAllUserResumes);

// Create resume
resumeRouter.post('/', protect, createResume);

// Upload resume
resumeRouter.post('/upload', upload.single('resume'), protect, createResume);

// Update resume
resumeRouter.put('/:resumeId', upload.single('image'), protect, updateResume);

// Delete resume
resumeRouter.delete('/:resumeId', protect, deleteResume);

// Get single resume
resumeRouter.get('/get/:resumeId', protect, getResumeById);

// Get public resume
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;

