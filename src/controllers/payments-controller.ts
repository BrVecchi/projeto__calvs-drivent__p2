import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import ticketRepository from '@/repositories/payment-repository';

export async function findPaymentInfo(req: AuthenticatedRequest, res: Response) {
    const {ticketId} = req.query

    try {
        const paymentInfo = (await ticketRepository.findUnique(Number(ticketId)))
        
        if(!paymentInfo){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }

        return res.status(httpStatus.OK).send(paymentInfo)
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
    const {ticketId, cardData} = req.body

    try {
        const paymentData = (await ticketRepository.create(Number(ticketId), cardData))
        return res.status(httpStatus.OK).send(paymentData)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}