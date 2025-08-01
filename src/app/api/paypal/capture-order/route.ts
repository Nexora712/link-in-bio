import paypal from '@paypal/checkout-server-sdk';
import client from '@/lib/paypal';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { orderID } = await req.json();

    if (!orderID) {
        return new NextResponse('Order ID not found', { status: 400 });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({
      payment_source: {},
    } as any);

    try {
        const capture = await client.execute(request);
        return NextResponse.json({ ...capture.result });
    } catch (err) {
        if (err instanceof Error) {
            return new NextResponse(err.message, { status: 500 });
        }
        return new NextResponse('An unknown error occurred', { status: 500 });
    }
}
