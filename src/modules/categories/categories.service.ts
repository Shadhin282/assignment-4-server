import { prisma } from "../../lib/prisma"

const getCategory =async ()=>{
        const result = await prisma.category.findMany()
        return result
}


const postCategory =async (payload:{name: string, description : string})=>{
      


        const result = await prisma.category.create({
                data  : {
                        name : payload.name,
                        description : payload.description
                }
        })
        
        return result ;
}




export const CategoriesService = {
        getCategory,
        postCategory
} 