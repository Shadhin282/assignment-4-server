import { BookingStatus } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getBooking = async ()=>{
        const result = await prisma.booking.findMany()
        return result;
}

const getBookingById = async (id:string)=> {
        const result = await prisma.booking.findFirst({
                where : {
                        student : {
                                id : id
                        } 
                }
        })
        return result;
}

const postBooking = async (payload: { date: Date; status: string; studentId: string; tutorId: string }) => {
        
        const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
                where : {
                        id : payload.tutorId
                }
        })

        const result = await prisma.booking.create({
                data: {
                        date: payload.date,
                        status: payload.status as BookingStatus,
                        student: {
                                connect: { id: payload.studentId }
                        },
                        tutor: {
                                connect: { id: payload.tutorId }
                        }
                }
        })
        return result;
}


export const bookingService = {
        getBooking,
        postBooking,
        getBookingById
} 