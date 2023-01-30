import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { prisma } from '@/config';
import { unauthorizedError } from '@/errors';
import { notFoundError } from '@/errors/not-found-error';

import { AuthenticatedRequest } from './authentication-middleware';

export async function ticketValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const enrollment = req.enrollment
    const ticketId = req.query.ticketId || req.body.ticketId

    try {
        const ticket = await prisma.ticket.findFirst({
            where: {
                id: Number(ticketId)
            }
        })

        if(!(ticket.enrollmentId === enrollment.id)) {

            return notAuthorized(res)
        }

        req.ticket = ticket;
        return next()
    } catch (error) {
        return notFoundTicket(res)
    }
}

function notFoundTicket(res: Response) {
    res.status(httpStatus.NOT_FOUND).send(notFoundError())
}
function notAuthorized(res: Response) {
    res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError())
}