"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type OrderData = {
  products: string;
  grandTotal: string;
  totalQuantity: string;
  paymentMethod: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
};

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedOrder = localStorage.getItem("pendingOrder");
    if (storedOrder) {
      try {
        const parsedOrder: OrderData = JSON.parse(storedOrder);
        setOrderData(parsedOrder);
      } catch (err) {
        console.error("Error parsing pending order:", err);
        router.push("/order");
      }
    } else {
      router.push("/order");
    }
  }, [router]);

  const handlePaymentSelect = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePaymentComplete = () => {
    if (!orderData) return;

    // Simulate payment processing
    alert(`Payment successful via ${selectedPayment}!`);

    // Save order to orders list
    const orderWithId = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...orderData,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(orderWithId);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear pending order
    localStorage.removeItem("pendingOrder");

    // Redirect to success page
    router.push("/order-success");
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment options...</p>
        </div>
      </div>
    );
  }

  const paymentOptions = [
    { id: "paytm", name: "Paytm", logo: "/paytm-logo.png", color: "bg-blue-500" },
    { id: "gpay", name: "Google Pay", logo: "/gpay-logo.png", color: "bg-green-500" },
    { id: "phonepe", name: "PhonePe", logo: "/phonepe-logo.png", color: "bg-purple-500" },
    { id: "upi", name: "UPI", logo: "/upi-logo.png", color: "bg-orange-500" },
    { id: "card", name: "Credit/Debit Card", logo: "/card-logo.png", color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-pink-700 mb-6 drop-shadow-md">
            Choose Payment Method 💳
          </h1>

          {/* Order Summary */}
          <div className="mb-8 p-4 bg-pink-50 rounded-xl border border-pink-200">
            <h2 className="text-lg font-semibold text-pink-700 mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Products:</strong> {orderData.products}</p>
              <p><strong>Total Quantity:</strong> {orderData.totalQuantity}</p>
              <p className="text-pink-700 font-bold text-lg"><strong>Total:</strong> {orderData.grandTotal}</p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Payment Option</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlePaymentSelect(option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPayment === option.id
                      ? "border-pink-500 bg-pink-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">
                        {option.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">{option.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePaymentComplete}
              disabled={!selectedPayment}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                selectedPayment
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105 hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {selectedPayment ? `Pay with ${paymentOptions.find(p => p.id === selectedPayment)?.name}` : "Select Payment Method"}
            </button>
            <Link
              href="/order"
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-center"
            >
              Back to Order
            </Link>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            Your payment is secure and encrypted 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
