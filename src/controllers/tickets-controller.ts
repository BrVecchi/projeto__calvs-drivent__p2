import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import ticketRepository from '@/repositories/tickets-repository';

export async function listAllTicketTypes(req: AuthenticatedRequest, res: Response){
    try {
        const ticketTypes = (await ticketRepository.findMany())
        return res.status(httpStatus.OK).send(ticketTypes)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
    const enrollment = req.enrollment

    try {
        const userTicket = (await ticketRepository.findUnique(enrollment))
        return res.status(httpStatus.OK).send(userTicket)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const {ticketTypeId} = req.body
    const enrollment = req.enrollment

    try {
        const userTicket = (await ticketRepository.create(ticketTypeId, enrollment))
        return res.status(httpStatus.OK).send(userTicket)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}