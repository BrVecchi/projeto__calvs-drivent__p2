import { prisma } from '@/config';
import { Enrollment } from '@prisma/client';

async function findMany() {
    return await prisma.ticketType.findMany()
}

async function findUnique(enrollment: Enrollment) {
  return await prisma.ticket.findFirst({
    include: {
      TicketType: true
    },
    where: {
      enrollmentId: enrollment.id
    }
  })
}

async function create(ticktTypeId: number, enrollment: Enrollment) {
    await prisma.ticket.create({
    data: {
      ticketTypeId: ticktTypeId,
      enrollmentId: enrollment.id,
      status: "RESERVED"
    }
  })
  return findUnique(enrollment)
}

const ticketRepository = {
    findMany,
    findUnique,
    create
  };
  
  export default ticketRepository
;