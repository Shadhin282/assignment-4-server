import { Request, Response } from "express"



const getBooking= async (req:Request,res: Response)=>{

}

const postBooking = async (req:Request, res: Response) => {
       try {
                 const bookingInfo = req.body;

        const result = await
       } catch (error) {
        
       }
}



export const bookingController = {
        getBooking,
        postBooking,
}