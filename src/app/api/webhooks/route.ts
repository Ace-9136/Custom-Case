import { db } from "@/db"
import { NextApiRequest, NextApiResponse } from "next"
import paypal from "@/lib/paypal"

// Define the types
interface WebhookEvent {
  id: string;
  event_version: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource: any; // Define more specific type if known
  status: string;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}

interface WebhookVerifyResponse {
  verification_status: string;
}

async function verifyWebhook(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const transmissionId = req.headers['paypal-transmission-id'] as string;
  const transmissionTime = req.headers['paypal-transmission-time'] as string;
  const certUrl = req.headers['paypal-cert-url'] as string;
  const authAlgo = req.headers['paypal-auth-algo'] as string;
  const transmissionSig = req.headers['paypal-transmission-sig'] as string;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID as string;
  const webhookEvent: WebhookEvent = req.body;

  const headers = {
    transmission_id: transmissionId,
    transmission_time: transmissionTime,
    cert_url: certUrl,
    auth_algo: authAlgo,
    transmission_sig: transmissionSig
  };

  const response: WebhookVerifyResponse = await new Promise((resolve, reject) => {
    paypal.notification.webhookEvent.verify(
      headers,
      webhookEvent,
      webhookId,
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  });

  return response.verification_status === 'SUCCESS';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const isValid = await verifyWebhook(req, res);

      if (!isValid) {
        return res.status(400).send("Invalid webhook");
      }

      const event = req.body;

      if (event.event_type === "PAYMENT.SALE.COMPLETED") {
        const orderId = event.resource.invoice_number;
        const shippingAddress = event.resource.shipping_address;
        const billingAddress = event.resource.billing_address;

        try {
          await db.order.update({
            where: { id: orderId },
            data: {
              isPaid: true,
              shippingAddress: {
                create: {
                  name: shippingAddress.recipient_name,
                  street: shippingAddress.line1,
                  city: shippingAddress.city,
                  postalCode: shippingAddress.postal_code,
                  country: shippingAddress.country_code,
                  state: shippingAddress.state,
                  phoneNumber: shippingAddress.phone,
                },
              },
              billingAddress: {
                create: {
                  name: billingAddress.recipient_name,
                  street: billingAddress.line1,
                  city: billingAddress.city,
                  postalCode: billingAddress.postal_code,
                  country: billingAddress.country_code,
                  state: billingAddress.state,
                  phoneNumber: billingAddress.phone,
                },
              },
            },
          });
        } catch (error) {
          console.error("Error updating order:", error);
          return res.status(500).send("Server error");
        }

        return res.status(200).send("Order updated");
      }

      res.status(200).send("Event ignored");
    } catch (error) {
      console.error("Error handling webhook:", error);
      return res.status(500).send("Server error");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
