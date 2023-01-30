import { Router } from 'express';

import { createPayment, findPaymentInfo } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';
import { enrollmentValidation } from '@/middlewares/enrollment-middleware';

export const paymentsRouter = Router();

paymentsRouter
.all("/*", authenticateToken, enrollmentValidation)
.get("/", findPaymentInfo )
.post("/process", createPayment);