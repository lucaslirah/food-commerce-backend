import { PrismaClient } from "@prisma/client";
import { CustomerData } from "../interfaces/CustomerData";
import { PaymentData } from "../interfaces/PaymentData";
import { SnackData } from "../interfaces/SnackData";

export default class CheckoutService {
    // Prisma client for interacting with the database in private
    private prisma: PrismaClient;
    
    // Connect to the database with new instance
    constructor() {
        this.prisma = new PrismaClient();
    }
    // Implement the checkout logic here
    async process(
        cart: SnackData[],
        customer: CustomerData,
        payment: PaymentData
    ) {
        // TODO: "puxar" os dados de snacks do BD
        const snacks = await this.prisma.snack.findMany({
            where: {
                id: {
                    in: cart.map((item) => item.id),
                },
            },
        });
        console.log('snacks', snacks);

        // TODO: registrar os dados do cliente no BD
        // TODO: criar uma order
        // TODO: processar o pagamento
    }
}