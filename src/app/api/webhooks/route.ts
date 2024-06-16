import { db } from '@/db'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const clientId = process.env.PAYPAL_CLIENT_ID || ''
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || ''

let environment = new paypal.core.LiveEnvironment(clientId, clientSecret );
let client = new paypal.core.PayPalHttpClient(environment);

async function verifyWebhookSignature(headers: Headers, body: string): Promise<boolean> {
  // Create the verification request
  let request = new paypal.notification.webhookEventVerifySignatureRequest();
  request.requestBody({
    auth_algo: headers.get('PAYPAL-AUTH-ALGO'),
    cert_url: headers.get('PAYPAL-CERT-URL'),
    transmission_id: headers.get('PAYPAL-TRANSMISSION-ID'),
    transmission_sig: headers.get('PAYPAL-TRANSMISSION-SIG'),
    transmission_time: headers.get('PAYPAL-TRANSMISSION-TIME'),
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: JSON.parse(body)
  });

  try {
    let response = await client.execute(request);
    return response.statusCode === 200 && response.result.verification_status === 'SUCCESS';
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signatureValid = await verifyWebhookSignature(headers(), body);

    if (!signatureValid) {
      return new Response('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const order = event.resource;

      const { userId, orderId } = order.purchase_units[0].custom_id ? JSON.parse(order.purchase_units[0].custom_id) : { userId: null, orderId: null };

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata');
      }

      const billingAddress = order.payer.address;
      const shippingAddress = order.purchase_units[0].shipping.address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: order.payer.name.given_name + ' ' + order.payer.name.surname,
              city: shippingAddress.city,
              country: shippingAddress.country_code,
              postalCode: shippingAddress.postal_code,
              street: shippingAddress.address_line_1,
              state: shippingAddress.admin_area_1,
            },
          },
          billingAddress: {
            create: {
              name: order.payer.name.given_name + ' ' + order.payer.name.surname,
              city: billingAddress.city,
              country: billingAddress.country_code,
              postalCode: billingAddress.postal_code,
              street: billingAddress.address_line_1,
              state: billingAddress.admin_area_1,
            },
          },
        },
      });

      await resend.emails.send({
        from: 'CaseCobra <hello@joshtriedcoding.com>',
        to: [order.payer.email_address],
        subject: 'Thanks for your order!',
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          shippingAddress: {
            name: order.payer.name.given_name + ' ' + order.payer.name.surname,
            city: shippingAddress.city,
            country: shippingAddress.country_code,
            postalCode: shippingAddress.postal_code,
            street: shippingAddress.address_line_1,
            state: shippingAddress.admin_area_1,
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    );
  }
}
