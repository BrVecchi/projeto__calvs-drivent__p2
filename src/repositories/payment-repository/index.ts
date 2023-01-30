import { prisma } from '@/config';
import { CardData } from '@/protocols';

async function findUnique(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId
    }
  })
}

async function create(ticketId: number, cardData: CardData) {
    const ticket = await prisma.ticket.findUnique({
        include: {
            TicketType: true
        },
        where: {
            id: ticketId
        }
    })
    const cardNumberString = cardData.number.toString()
    const length = cardNumberString.length
    const payment = await prisma.payment.create({
        data: {
            ticketId: ticketId,
            value: ticket.TicketType.price,
            cardIssuer: cardData.issuer,
            cardLastDigits: cardNumberString.slice(length -4, length)
        }
    })
    await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            status: "PAID"
        }
    })
  return payment
}

const ticketRepository = {
    findUnique,
    create
  };
  
  export default ticketRepository
;