import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';

import { SnackData } from './interfaces/SnackData';
import { CustomerData } from './interfaces/CustomerData';
import { PaymentData } from './interfaces/PaymentData';

import CheckoutService from './services/CheckoutServices';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
    const {message} = req.body

    if (!message){
        res.status(400).send({ error: "Message is required" });
        return;
    } 

    res.send({ message });
});

app.get("/snacks", async (req: Request, res: Response) => {
    const snack =  req.query.snack as string;
    
    if (!snack) {
        res.status(404).json({ error: 'Snack is required' });
        return;
    }

    const snacks = await prisma.snack.findMany({
        where: {
            snack: {
                equals: snack,
            },
        },
    });
    
    res.send(snacks);
});

app.get("/orders/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    // buscar order com findUnique do prisma
    const order = await prisma.order.findUnique({
        where: {
            id: +id,
        },
        include: { customer: true, orderItems: { include: { snack: true } } },
    });
    
    if (!order) {
        res.status(404).json({ error: 'order not found' });
        return;
    }

    res.send(order);
});

interface CheckoutRequest extends Request {
    body: {
        cart: SnackData[];
        customer: CustomerData;
        payment: PaymentData;
    }
}

app.post("/checkout", async (req: CheckoutRequest, res:Response) => {
    const { cart, customer, payment } = req.body;

    const orderCreated = await new CheckoutService().process(
        cart, customer, payment
    );

    res.send(orderCreated);
});

app.listen(port, () => console.log('Listening on port ' + port));