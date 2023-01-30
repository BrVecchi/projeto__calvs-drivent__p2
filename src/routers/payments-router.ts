import { Router } from 'express';

import { createPayment, findPaymentInfo } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';
import { bodyValidation } from '@/middlewares/body-middleware';
import { enrollmentValidation } from '@/middlewares/enrollment-middleware';
import { queryValidation } from '@/middlewares/query-middleware';
import { ticketValidation } from '@/middlewares/ticket-middleware';

export const paymentsRouter = Router();

paymentsRouter
.all("/*", authenticateToken)
.get("/",queryValidation, enrollmentValidation, ticketValidation, findPaymentInfo )
.post("/process", bodyValidation, enrollmentValidation, ticketValidation, createPayment);