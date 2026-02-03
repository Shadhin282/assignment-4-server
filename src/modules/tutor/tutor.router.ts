import express from "express";
import { tutorController } from "./tutor.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = express.Router();

router.get('/',tutorController.getTutor)
router.get('/:id', tutorController.getTutorById)
router.post('/profile',auth(UserRole.TUTOR),tutorController.postTutorProfile)
router.put('/profile',auth(UserRole.TUTOR), tutorController.putTutorProfile)
router.put('/availability',auth(UserRole.TUTOR), tutorController.putTutorAvailability)


export const tutorRoute = router;