import paypal from "paypal-rest-sdk"

    const clientId = process.env.PAYPAL_CLIENT_ID || '';
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';

    
    paypal.configure({
    'mode': 'sandbox', 
    'client_id': clientId,
    'client_secret': clientSecret
});

export default paypal