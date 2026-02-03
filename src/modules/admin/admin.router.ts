import express from "express";
import { userController } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";



const router = express.Router();

router.get('/users',auth(UserRole.ADMIN),userController.getUsers)
router.patch('/users/:id',auth(UserRole.ADMIN),userController.getUsersById)




export const userRoute = router;