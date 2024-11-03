import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const snacks = [
    {
      snack: "burger",
      name: "Mega",
      description: "O artesanal tamanho família recheado com três carnes suculentas, queijo, picles bacon, cebola caramelizada e molho especial.",
      price: 26.5,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=2568&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "burger",
      name: "Duplo cheddar",
      description: "Duas camadas generosas de cheddar com carne suculenta, picles, cebola caramelizada e molho especial.",
      price: 23.5,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "burger",
      name: "Smash",
      description: "Simples, mas delicioso. Carne com cebola, alface, palmito, queijo e molho especial.",
      price: 18.5,
      image: "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "pizza",
      name: "Pepperoni",
      description: "Pizza com pepperoni, cogumelos, tomate e pimentões verde, amarelo e vermelho.",
      price: 35.5,
      image: "https://images.unsplash.com/photo-1670757781705-9b6cb1ad0ca6?q=80&w=1451&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "pizza",
      name: "Carne com cogumelos",
      description: "Pizza de carne com cogumelos, tomate cereja e cebola.",
      price: 32.5,
      image: "https://images.unsplash.com/photo-1671106681075-5a7233268cbd?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "pizza",
      name: "Frango com requeijão",
      description: "Pizza de frango com requeijão, tomates picados e manjericão.",
      price: 28.5,
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "drink",
      name: "Suco",
      description: "Sucos nos sabores de morango, kiwi, abacaxi, laranja e limão.",
      price: 8.5,
      image: "https://images.unsplash.com/photo-1647275486864-1b29efb0d570?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "drink",
      name: "Refrigerante",
      description: "Refrigerantes nos sabores de coca-cola, sprite e fanta.",
      price: 5.5,
      image: "https://images.unsplash.com/photo-1629059042675-ce386c84cebf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "drink",
      name: "Vitamina",
      description: "Vitaminas nos sabores de açaí, goiaba, banana e camapu.",
      price: 15.5,
      image: "https://images.unsplash.com/photo-1662130187270-a4d52c700eb6?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "ice-cream",
      name: "Milk-shake",
      description: "Milk-shakes nos sabores de morango e chocolate.",
      price: 12.5,
      image: "https://images.unsplash.com/photo-1619158403521-ed9795026d47?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "ice-cream",
      name: "Casquinha",
      description: "Casquinhas nos sabores de chocolate, morango e baunilha.",
      price: 5.5,
      image: "https://images.unsplash.com/photo-1642646689566-60c53a8c1ef4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      snack: "ice-cream",
      name: "Sundae",
      description: "Sundaes nos sabores de chocolate, morango e baunilha.",
      price: 10.5,
      image: "https://images.unsplash.com/photo-1648857529887-28d03f6774ea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

async function main() {
    await prisma.snack.createMany({
        data: snacks,
        skipDuplicates: true,
    })
}

main()
    .catch((error) => {
        console.error("Error connecting to the database:", error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        console.log("Database connection closed")
    })
    