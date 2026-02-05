import { prisma } from "../../lib/prisma"

const getReview =async ()=>{
        const result = await prisma.review.findMany()
        return result
}


const postReview =async (payload:{ rating : number, comment: string, tutorId: string}, userid : string)=>{
      
        const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
                where : {
                        id : payload.tutorId
                }
        })

        const result = await prisma.review.create({
                data  : {
                       rating :  payload.rating,
                       comment : payload.comment,
                       studentId: userid,
                       tutorId : payload.tutorId
                       
                }
        })
        
        return result ;
}




export const reviewsService = {
        getReview,
        postReview
} 