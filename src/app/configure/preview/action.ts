'use server'

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client"
import paypal from "@/lib/paypal"

// Define interfaces for PayPal response
interface PayPalLink {
    href: string;
    rel: string;
    method: string;
}

interface PayPalPayment {
    links?: PayPalLink[];
}

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string
}) => {
    const configuration = await db.configuration.findUnique({
        where: { id: configId }
    })

    if (!configuration) {
        throw new Error("No such configuration found")
    }

    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        throw new Error("You need to be logged in")
    }

    const { finish, material } = configuration
    let price = BASE_PRICE
    if (finish === "textured") price += PRODUCT_PRICES.finish.textured
    if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate

    let order: Order | undefined = undefined
    const existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id
        },
    })
    if (existingOrder) {
        order = existingOrder
    } else {
        order = await db.order.create({
            data: {
                amount: price / 100,
                userId: user.id,
                configurationId: configuration.id
            }
        })
    }

    const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        "cancel_url": `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Custom Case",
                "sku": "item",
                "price": `${price/100}`,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": `${price/100}`
        },
        "description": "This is the payment description."
    }]
};


    try {
        const payment: PayPalPayment = await new Promise((resolve, reject) => {
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });

        if (payment.links) {
            const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
            if (approvalUrl) {
                return { url: approvalUrl.href };
            }
        }
        throw new Error("No approval URL found in the payment response");

    } catch (error) {
        console.log(error);
        throw new Error("Payment creation failed");
    }
};
