"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Globe, ArrowRight, Sparkles, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      // In a real app, you would verify the payment with your backend
      setOrderDetails({
        orderId: sessionId,
        status: 'completed',
        amount: '$9.99',
        email: 'customer@example.com'
      });
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your purchase. Your bio page is being set up.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>Order Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{orderDetails?.orderId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{orderDetails?.amount || '$9.99'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600">Completed</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{orderDetails?.email || 'customer@example.com'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Email Confirmation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent you an email with your login credentials and setup instructions.
                </p>
                <Button variant="outline" className="w-full">
                  Check Email
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">Your Bio Page</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Your bio page will be ready within 24 hours. We'll notify you when it's live.
                </p>
                <Button variant="outline" className="w-full">
                  View Status
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/builder">
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Create Another Bio Page
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full h-12">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Setup Guide</h4>
                  <p className="text-gray-600">Follow our step-by-step guide to customize your bio page.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Custom Domain</h4>
                  <p className="text-gray-600">Learn how to connect your custom domain to your bio page.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Support</h4>
                  <p className="text-gray-600">Contact our support team for any questions or issues.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm">
                  Read Documentation
                </Button>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 