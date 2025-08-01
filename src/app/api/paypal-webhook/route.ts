import { NextRequest, NextResponse } from 'next/server';

// PayPal API configuration
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

// Verify PayPal webhook signature (simplified version)
const verifyWebhookSignature = async (request: NextRequest) => {
  // In production, you should verify the webhook signature
  // For now, we'll trust the webhook (not recommended for production)
  return true;
};

// Capture PayPal payment
const capturePayment = async (orderID: string) => {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Prefer': 'return=representation'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to capture payment');
  }

  return response.json();
};

// Get PayPal access token (reused from create-paypal-order)
const getPayPalAccessToken = async () => {
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  });
  
  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }
  
  const data = await response.json();
  return data.access_token;
};

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const isValid = await verifyWebhookSignature(request);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const body = await request.json();
    const { event_type, resource } = body;

    console.log('PayPal webhook received:', event_type);

    // Handle different webhook events
    switch (event_type) {
      case 'CHECKOUT.ORDER.APPROVED':
        // Order was approved, capture the payment
        try {
          const captureData = await capturePayment(resource.id);
          console.log('Payment captured:', captureData);
          
          // Here you would:
          // 1. Store the payment information in your database
          // 2. Set up the hosting for the customer
          // 3. Send confirmation email
          // 4. Update order status
          
          return NextResponse.json({ status: 'Payment captured successfully' });
        } catch (error) {
          console.error('Payment capture failed:', error);
          return NextResponse.json({ error: 'Payment capture failed' }, { status: 500 });
        }

      case 'PAYMENT.CAPTURE.COMPLETED':
        // Payment was completed successfully
        console.log('Payment completed:', resource);
        
        // Here you would:
        // 1. Update order status to completed
        // 2. Send confirmation email to customer
        // 3. Set up hosting and domain
        
        return NextResponse.json({ status: 'Payment completed' });

      case 'PAYMENT.CAPTURE.DENIED':
        // Payment was denied
        console.log('Payment denied:', resource);
        
        // Here you would:
        // 1. Update order status to failed
        // 2. Send notification to customer
        
        return NextResponse.json({ status: 'Payment denied' });

      default:
        console.log('Unhandled webhook event:', event_type);
        return NextResponse.json({ status: 'Event received' });
    }

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 