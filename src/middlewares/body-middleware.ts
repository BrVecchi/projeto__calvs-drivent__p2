import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from './authentication-middleware';

export async function bodyValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    if (!req.body.ticketId || !req.body.cardData) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    return next()
}