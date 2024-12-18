import { Customer, Order, PrismaClient } from "@prisma/client";
import { CustomerData } from "../interfaces/CustomerData";
import { PaymentData } from "../interfaces/PaymentData";
import { SnackData } from "../interfaces/SnackData";
import PaymentService from "./PaymentService";

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
    ): Promise<{ id: number; transactionId: string; status: string; }> {
        // TODO: "puxar" os dados de snacks do BD
        const snacks = await this.prisma.snack.findMany({
            where: {
                id: {
                    in: cart.map((item) => item.id),
                },
            },
        });
        const snacksInCart = snacks.map<SnackData>((snack) => ({
            ...snack,
            price: Number(snack.price),
            quantity: cart.find((item) => item.id === snack.id)?.quantity!,
            subtotal: cart.find((item) => item.id === snack.id)?.quantity! * Number(snack.price),
        }));

        // TODO: registrar os dados do cliente no BD
        const customerCreated = await this.createCustomer(customer);

        // TODO: criar uma order
        let orderCreated = await this.createOrder(snacksInCart, customerCreated);
        
        // TODO: processar o pagamento
        const { transactionId, status } = await new PaymentService().process(
          orderCreated, 
          customerCreated, 
          payment
        );

        orderCreated = await this.prisma.order.update({
          where: { id: orderCreated.id },
          data: {
            transactionId,
            status,
          },
        })

        return {
          id: orderCreated.id,
          transactionId: orderCreated.transactionId!,
          status: orderCreated.status,
        }
    }

    private async createCustomer(customer: CustomerData) : Promise<Customer> {
        const customerCreated = await this.prisma.customer.upsert({
            where: { email: customer.email },
            update: customer,
            create: customer,
        })

        return customerCreated;
    }

    private async createOrder(snacksInCart: SnackData[], customer: Customer): Promise<Order> {
        const total = snacksInCart.reduce((acc, snack) => acc + snack.subtotal, 0);
        
        const orderCreated = await this.prisma.order.create({
          data: {
            total,
            customer: {
              connect: { id: customer.id },
            },
            orderItems: {
              createMany: {
                data: snacksInCart.map((snack) => ({
                  snackId: snack.id,
                  quantity: snack.quantity,
                  subtotal: snack.subtotal,
                })),
              },
            },
          },
          include: {
            customer: true,
            orderItems: { include: { snack: true } },
          },
        })

        return orderCreated;
    }
}