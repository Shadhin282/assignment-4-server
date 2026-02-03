import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";


const getTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, rating, price, category } = req.query;

    const searchString = typeof search === "string" ? search : "";
    const categoryName = typeof category === "string" ? category : "";

    const ratingNumber =
      typeof rating === "string" && !isNaN(Number(rating)) ? Number(rating) : 0;

    const priceNumber =
      typeof price === "string" && !isNaN(Number(price)) ? Number(price) : 0;

    const result = await tutorService.getTutor(
      searchString,
      ratingNumber,
      priceNumber,
      categoryName,
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
    next(error)
  }
};


const getTutorById = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.send("No Id provide");
    }
    const result = await tutorService.getTutorById(id as string);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor info not get",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor profile info got successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};


const postTutorProfile = async (req:Request , res: Response, next:NextFunction) => {
    try {
        const tutorInfo = req.body;
        const result = await tutorService.postTutorProfile(tutorInfo)

         if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor data is not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor profile info created successfully",
      data: result,
    });
    } catch (error) {
      next(error)
    }
}


const putTutorProfile = async (req: Request, res: Response, next:NextFunction) => {
  try {
    if (!req.user) {
      return res.send("Not provided any user");
    }
    const { id } = req.user;
    
    if (!req.body) {
      return res.send("Not provide Update data");
    }
    const result = await tutorService.putTutorProfile(id as string, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor data not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor profile info updated successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};


const putTutorAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.send("Not provided any user");
    }
    const {id} = req.user;
    
    if (!req.body) {
      return res.send("Not provide Update data");
    }
    const result = await tutorService.putTutorProfile(id, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Not Update tutor availability status",
      });
    }

    res.status(200).json({
      success: true,
      message: "tutor availability status has updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const tutorController = {
  getTutor,
  getTutorById,
  putTutorProfile,
  postTutorProfile,
  putTutorAvailability,
};
