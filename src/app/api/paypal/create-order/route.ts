import paypal from '@paypal/checkout-server-sdk';
import client from '@/lib/paypal';
import { NextResponse } from 'next/server';

export async function POST() {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00'
            }
        }]
    });

    try {
        const order = await client.execute(request);
        return NextResponse.json({ id: order.result.id });
    } catch (err) {
        if (err instanceof Error) {
            return new NextResponse(err.message, { status: 500 });
        }
        return new NextResponse('An unknown error occurred', { status: 500 });
    }
}
