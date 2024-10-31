import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    const message = req.body.message
    res.send({ message });
});

app.listen(port, () => console.log('Listening on port ' + port));