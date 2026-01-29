import { prisma } from "../../lib/prisma";

const getTutor = async (
  search?: string | undefined,
  rating?: number | undefined,
  price?: number | undefined,
  name?: string | undefined,
) => {
    
//   console.log(search, rating, price, name);

  const result = await prisma.tutorProfile.findMany({
    where: {
      AND: [
        {
          subjects: search as string,
          
        },
        {
          hourlyRate: price as number ,
        },
       
        {
          categories: {
            some: {
              name: name as string,
            },
          },
        },
      ],
    },
  });

  return result;
};

const getTutorById = async (id: string )=>{
            const result = await prisma.tutorProfile.findFirst({
                where : {
                   user: 
                     {
                        id : id 
                    }
                   
                },
                
            })
            return result 
}



export const tutorService = {
  getTutor,
  getTutorById,
};
