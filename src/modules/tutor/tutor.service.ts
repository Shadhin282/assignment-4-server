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
        review : {
           
            rating : rating as number
          
        }
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


const putTutorProfile = async (id: string, data: {}) => {
    const result = await prisma.tutorProfile.update({
      where : {
        id : id as string
      },
      data
    })
}

const putTutorAvailability = async (id : string ,data: {}) => {
        const result = await prisma.tutorProfile.update({
          where : {
            id
          },
          data
        })
}


export const tutorService = {
  getTutor,
  getTutorById,
  putTutorProfile,
  putTutorAvailability
};
