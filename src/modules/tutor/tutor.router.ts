import express from "express";
import { tutorController } from "./tutor.controller";

const router = express.Router();

router.get('/',tutorController.getTutor)




export const tutorRoute = router;