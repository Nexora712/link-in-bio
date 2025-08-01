"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalButton = () => {
    const [message, setMessage] = useState("");
    const initialOptions = {
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        "currency": "USD",
        "intent": "capture",
    };

    const createOrder = async () => {
        try {
            const response = await fetch("/api/paypal/create-order", {
                method: "POST",
            });
            const order = await response.json();
            return order.id;
        } catch (error) {
            console.error(error);
            setMessage(`Error creating order: ${error}`);
        }
    };

    const onApprove = async (data: any) => {
        try {
            const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: data.orderID }),
            });
            const details = await response.json();
            setMessage(`Transaction completed by ${details.payer.name.given_name}`);
        } catch (error) {
            console.error(error);
            setMessage(`Error capturing order: ${error}`);
        }
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
            <p>{message}</p>
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
