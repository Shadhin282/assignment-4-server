import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { Result } from "pg";

const getTutor = async (req: Request, res: Response) => {
  try {
    const { search, rating, price, category } = req.query;

    const searchString = typeof search === "string" ? search : "";
    const categoryName = typeof category === "string" ? category : "";

    const ratingNumber =
      typeof rating === "string" && !isNaN(Number(rating))
        ? Number(rating)
        : 0;

    const priceNumber =
      typeof price === "string" && !isNaN(Number(price))
        ? Number(price)
        : 0;

    const result = await tutorService.getTutor(
      searchString,
      ratingNumber,
      priceNumber,
      categoryName
    );

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tutor data found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Required data fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};


const getTutorById = async (req: Request, res: Response) => {
        try {
                const {id} = req.params;
                if(!id){
                   return res.send("No Id ")
                }
                const result = await tutorService.getTutorById(id as string)
                
        } catch (error) {
            
        }
}

const putTutorProfile = async (req: Request, res: Response) => {
      try {
          if(!req.body){
            return res.send("No Update data")
          }
          const result = await tutorService.putTutorProfile(req.body , req.body)
      } catch (error) {
        
      }
}

const putTutorAvailability = async (req: Request, res: Response) => {
  try {
      if(!req.body){
            return res.send("No Update data")
          }
          const result = await tutorService.putTutorProfile(req.body , req.body)
  } catch (error) {
    
  }
}
export const tutorController = {
  getTutor,
  getTutorById,
  putTutorProfile,
  putTutorAvailability
};
