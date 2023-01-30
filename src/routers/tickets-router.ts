import { Router } from 'express';

import { createTicket, getUserTicket, listAllTicketTypes } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';
import { enrollmentValidation } from '@/middlewares/enrollment-middleware';

export const ticketsRouter = Router();

ticketsRouter
.all("/*", authenticateToken)
.get("/", enrollmentValidation, getUserTicket )
.get("/types", listAllTicketTypes)
.post("/", enrollmentValidation, createTicket);