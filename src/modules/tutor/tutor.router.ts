import express from "express";
import { tutorController } from "./tutor.controller";

const router = express.Router();

router.get('/',tutorController.getTutor)
router.get('/:id', tutorController.getTutorById)



export const tutorRoute = router;