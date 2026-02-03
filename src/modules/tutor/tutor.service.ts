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
        ...(search ? [{ subjects:{ hasSome: [search] } }] : []),
        ...(price ? [{ hourlyRate: price }] : []),
        ...(rating ? [{ review: { rating } }] : []),
        ...(name ? [{ Category: name }] : []),
      ],
    },
   
  });

  return result;
};

const getTutorById = async (id: string )=>{
            const result = await prisma.tutorProfile.findFirst({
                where : {
                  id
                   
                },
                
            })
            return result 
}


const postTutorProfile = async (payload: {bio: string; hourlyRate: number; subjects: string[]; availability: string[]; userId?: string | undefined}) => {
    const result = await prisma.tutorProfile.create({
       data : {
        bio: payload.bio,
        hourlyRate: payload.hourlyRate,
        subjects: payload.subjects,
        availability: payload.availability,
        ...(payload.userId ? { userId: payload.userId } : {})
       },
       include : {
        categories : true,
        review : true,
        user : true
       }
    })
    return result;
}


const putTutorProfile = async (id: string, data: {bio : string;
    hourlyRate: number;
    subjects :  string[]; 
    availability : string[];}) => {
    const result = await prisma.tutorProfile.update({
      where : {
        id : id as string
      },
      data
    })
    return result;
}

const putTutorAvailability = async (id : string  ,data: {status:string[]}) => {
        const result = await prisma.tutorProfile.update({
          where : {
            id
          },
          data : {
            availability: data.status
          }
        })
        return result;
}


export const tutorService = {
  getTutor,
  getTutorById,
  putTutorProfile,
  postTutorProfile,  
  putTutorAvailability
};
