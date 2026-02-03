import { NextFunction, Request, Response } from "express"
import { CategoriesService } from "./categories.service"





const getCategory = async (req:Request,res: Response, next:NextFunction)=>{
        try {
                const result = await CategoriesService.getCategory()
                 if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Category has not got"
                        })
                }
                res.status(200).json({
                        success: true,
                        message : "Category Data fetch Successfully",
                        data : result
                })
        } catch (error) {
                next(error)
        }
}
const postCategory= async (req:Request,res: Response, next: NextFunction)=>{
        try {
                
                
                const result = await CategoriesService.postCategory(req.body)
                if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Category has not created"
                        })
                }
                 res.status(201).json({
                        success: true,
                        message : "Category Data has created Successfully",
                        data : result
                })
        } catch (error) {
                next(error)
        }
}




export const categoriesController = {
        getCategory,
        postCategory
}