import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRoute } from "./modules/tutor/tutor.router";
import { bookingRoute } from "./modules/booking/booking.router";
import { reviewsRoute } from "./modules/review/review.router";
import { userRoute } from "./modules/admin/admin.router";
import { notFound } from "./middleware/notFound";
import errorHandler from "./middleware/globalErrorHandler";
import { categoriesRoute } from "./modules/categories/categories.router";


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL ,
    credentials: true,
}));

// app.use(cors())

app.use(express.json());


// Auth route 
app.all('/api/auth/*splat', toNodeHandler(auth));
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});


app.use('/api/tutors',tutorRoute)

app.use('/api/tutor', tutorRoute)

app.use('/api/bookings',bookingRoute)

app.use('/api/reviews',reviewsRoute)

app.use('/api/categories', categoriesRoute)

app.use('/api/admin',userRoute)

app.get("/", (req, res) => {
    
    res.send("Hello, Skill Bridge World!");
});

app.use(notFound);
app.use(errorHandler)

export default app;
