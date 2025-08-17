import paypal from '@paypal/checkout-server-sdk';

const configureEnvironment = function () {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.warn('PayPal client ID or secret is not set in environment variables. PayPal functionality will be disabled.');
        return null;
    }

    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const environment = configureEnvironment();
const client = environment ? new paypal.core.PayPalHttpClient(environment) : null;

export default client;
