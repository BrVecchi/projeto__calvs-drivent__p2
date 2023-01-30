import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from './authentication-middleware';

export async function queryValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    if (!req.query.ticketId) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
    return next()
}