import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());

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

app.listen(port, () => console.log('Listening on port ' + port));