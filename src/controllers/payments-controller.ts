import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import ticketRepository from '@/repositories/payment-repository';

export async function findPaymentInfo(req: AuthenticatedRequest, res: Response) {
    const {ticketId} = req.query
    console.log(ticketId)

    if (!ticketId) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try {
        const paymentInfo = (await ticketRepository.findUnique(Number(ticketId)))

        return res.status(httpStatus.OK).send(paymentInfo)
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
    const {ticketId, cardData} = req.body

    if(!ticketId || !cardData) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try {
        const paymentData = (await ticketRepository.create(Number(ticketId), cardData))
        return res.status(httpStatus.OK).send(paymentData)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}