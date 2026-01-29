import express from "express";
import { userController } from "./admin.controller";



const router = express.Router();

router.get('/',userController.getUsers)




export const userRoute = router;