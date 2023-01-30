import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { prisma } from '@/config';
import { notFoundError } from '@/errors/not-found-error';

import { AuthenticatedRequest } from './authentication-middleware';

export async function enrollmentValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = req.userId

    try {
        const enrollment = await prisma.enrollment.findFirst({
            where: {
                userId,
            }
        })

        if(!enrollment) {
            return notFoundedEnrollment(res)
        }
        req.enrollment = enrollment;
        return next()
    } catch (error) {
        return notFoundedEnrollment(res)
    }
}

function notFoundedEnrollment(res: Response) {
    res.status(httpStatus.NOT_FOUND).send(notFoundError())
}