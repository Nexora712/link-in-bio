"use client";

import { useSearchParams } from 'next/navigation';
import PayPalButton from '@/components/paypal-button';
import Link from 'next/link';

const CheckoutPage = () => {
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan');

    const planDetails = {
        basic: {
            name: 'Basic Plan',
            price: '$9.99/month',
        },
        pro: {
            name: 'Pro Plan',
            price: '$14.99/month',
        },
    };

    const selectedPlan = plan === 'pro' ? planDetails.pro : planDetails.basic;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your purchase for the {selectedPlan.name}.</p>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-800">{selectedPlan.name}</span>
                        <span className="text-lg font-bold text-gray-900">{selectedPlan.price}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-center text-sm text-gray-500 mb-4">Click the button below to complete your payment securely with PayPal.</p>
                    <PayPalButton />
                </div>

                <div className="text-center">
                    <Link href="/pricing" className="text-sm text-blue-600 hover:underline">
                        &larr; Back to Pricing
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
