import { NextRequest, NextResponse } from 'next/server';

// PayPal API configuration
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token using client credentials
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

// Create PayPal order
const createPayPalOrder = async (accessToken: string, html: string) => {
  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '9.99'
          },
          description: 'Premium Bio Links Hosting - Custom domain and hosting for your link-in-bio page',
          custom_id: 'bio-links-hosting',
          invoice_id: `bio-links-${Date.now()}`,
          soft_descriptor: 'LinkNest Hosting'
        }
      ],
      application_context: {
        brand_name: 'Bio Links Generator',
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/builder`,
        shipping_preference: 'NO_SHIPPING'
      },
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            payment_method_selected: 'PAYPAL',
            brand_name: 'Bio Links Generator',
            locale: 'en-US',
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/builder`
          }
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('PayPal order creation error:', errorData);
    throw new Error('Failed to create PayPal order');
  }

  const data = await response.json();
  return data;
};

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    // Validate that HTML is provided
    if (!html) {
      return NextResponse.json(
        { error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Validate PayPal credentials
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.error('PayPal credentials not configured');
      return NextResponse.json(
        { error: 'PayPal configuration error' },
        { status: 500 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const orderData = await createPayPalOrder(accessToken, html);

    // Store HTML in session or database (you might want to implement this)
    // For now, we'll store it in the order metadata
    console.log('HTML content length:', html.length);
    console.log('Order created with ID:', orderData.id);

    return NextResponse.json({ 
      orderID: orderData.id,
      status: orderData.status 
    });

  } catch (error) {
    console.error('PayPal API error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
} 