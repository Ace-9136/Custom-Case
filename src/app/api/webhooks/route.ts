import { db } from '@/db';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { Order } from '@prisma/client';

// Define interfaces for the response data
interface PayPalAccessTokenResponse {
    access_token: string;
}

interface PayPalVerificationResponse {
    verification_status: string;
}

// PayPal credentials
const clientId = process.env.PAYPAL_CLIENT_ID || '';
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
const webhookId = process.env.PAYPAL_WEBHOOK_ID || '';

// Function to get PayPal access token
async function getPayPalAccessToken(): Promise<string> {
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json() as PayPalAccessTokenResponse;
    return data.access_token;
}

// Function to verify webhook signature
async function verifyWebhookSignature(headers: Headers, body: string): Promise<boolean> {
    const accessToken = await getPayPalAccessToken();
    const requestBody = {
        transmission_id: headers.get('PAYPAL-TRANSMISSION-ID'),
        transmission_time: headers.get('PAYPAL-TRANSMISSION-TIME'),
        cert_url: headers.get('PAYPAL-CERT-URL'),
        auth_algo: headers.get('PAYPAL-AUTH-ALGO'),
        transmission_sig: headers.get('PAYPAL-TRANSMISSION-SIG'),
        webhook_id: webhookId,
        webhook_event: JSON.parse(body)
    };

    const response = await fetch('https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json() as PayPalVerificationResponse;
    return data.verification_status === 'SUCCESS';
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
                where: { id: orderId },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: `${order.payer.name.given_name} ${order.payer.name.surname}`,
                            city: shippingAddress.city,
                            country: shippingAddress.country_code,
                            postalCode: shippingAddress.postal_code,
                            street: shippingAddress.address_line_1,
                            state: shippingAddress.admin_area_1,
                        },
                    },
                    billingAddress: {
                        create: {
                            name: `${order.payer.name.given_name} ${order.payer.name.surname}`,
                            city: billingAddress.city,
                            country: billingAddress.country_code,
                            postalCode: billingAddress.postal_code,
                            street: billingAddress.address_line_1,
                            state: billingAddress.admin_area_1,
                        },
                    },
                },
            });

            // await resend.emails.send({
            //   from: 'CaseCobra <hello@joshtriedcoding.com>',
            //   to: [order.payer.email_address],
            //   subject: 'Thanks for your order!',
            //   react: OrderReceivedEmail({
            //     orderId,
            //     orderDate: updatedOrder.createdAt.toLocaleDateString(),
            //     shippingAddress: {
            //       name: `${order.payer.name.given_name} ${order.payer.name.surname}`,
            //       city: shippingAddress.city,
            //       country: shippingAddress.country_code,
            //       postalCode: shippingAddress.postal_code,
            //       street: shippingAddress.address_line_1,
            //       state: shippingAddress.admin_area_1,
            //     },
            //   }),
            // });
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
