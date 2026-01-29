import express from "express";
import { bookingController } from "./booking.controller";


const router = express.Router();

router.get('/',bookingController.getbooking)




export const bookingRoute = router;