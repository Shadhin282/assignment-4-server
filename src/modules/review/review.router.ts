import express from "express";
import { reviewsController } from "./review.controller";


const router = express.Router();

router.get('/',reviewsController.getReview)




export const  reviewsRoute = router;