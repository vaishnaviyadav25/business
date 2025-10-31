"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  images?: string[];
};

export default function OrderPage() {
  const searchParams = useSearchParams();
  const urlProduct = searchParams.get("product") || "";
  const urlPrice = parseFloat(searchParams.get("price") || "0");

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [singleQuantity, setSingleQuantity] = useState(1);
  const [status, setStatus] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = (parsed as Partial<CartItem>[]).map(
            (p: Partial<CartItem>) => ({
              name: p.name ?? "",
              price: Number(p.price) || 0,
              quantity: Number(p.quantity) || 1,
              images: p.images || [],
            })
          );
          setCartItems(normalized);
          return;
        }
      } catch (err) {
        console.error("Error parsing cart:", err);
      }
    }

    if (urlProduct && urlPrice > 0) {
      setCartItems([
        {
          name: urlProduct,
          price: urlPrice,
          quantity: 1,
        },
      ]);
      setSingleQuantity(1);
    } else {
      setCartItems([]);
    }
  }, [urlProduct, urlPrice]);

  const itemsToShow: CartItem[] =
    urlProduct && cartItems.length === 1
      ? [{ ...cartItems[0], quantity: Math.max(1, singleQuantity) }]
      : cartItems;

  const totalQuantity = itemsToShow.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = itemsToShow.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 📍 Get current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          if (data?.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
          }
        } catch {
          setAddress(`Lat: ${latitude}, Lon: ${longitude}`);
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        alert("Failed to get location: " + err.message);
        setLoadingLocation(false);
      }
    );
  };

  // 📨 Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    if (itemsToShow.length === 0) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const productSummary = itemsToShow
      .map(
        (it) =>
          `${it.name} — ₹${it.price} × ${it.quantity} = ₹${it.price * it.quantity}`
      )
      .join(" | ");

    formData.append("products", productSummary);
    formData.append("grandTotal", `₹${grandTotal}`);
    formData.append("totalQuantity", String(totalQuantity));

    try {
      const response = await fetch("https://formspree.io/f/manledon", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-6 py-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Place Your Order 🛍️
        </h1>

        {itemsToShow.length === 0 ? (
          <p className="text-center text-gray-600 mb-4">Your cart is empty 🛒</p>
        ) : (
          <>
            <div className="mb-4 border border-pink-200 rounded-lg p-4 bg-pink-50">
              <h2 className="text-lg font-semibold text-pink-600 mb-3">
                Order Summary
              </h2>

              <ul className="space-y-3 text-gray-700">
                {itemsToShow.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-b border-pink-100 pb-3"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {item.images?.[0] && (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="object-cover rounded-lg border"
                        />
                      )}
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">₹{item.price}</div>
                      </div>
                    </div>

                    {urlProduct && cartItems.length === 1 ? (
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Qty</label>
                        <input
                          type="number"
                          min={1}
                          value={singleQuantity}
                          onChange={(e) =>
                            setSingleQuantity(Math.max(1, Number(e.target.value) || 1))
                          }
                          className="w-16 border border-gray-300 rounded px-2 py-1"
                        />
                      </div>
                    ) : (
                      <div className="text-sm font-semibold">
                        Qty: {item.quantity}
                      </div>
                    )}

                    <div className="font-semibold ml-4">
                      ₹{item.price * item.quantity}
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="my-3" />

              <div className="flex justify-between text-gray-700 mb-1">
                <div className="font-medium">Total items</div>
                <div className="font-semibold">{totalQuantity}</div>
              </div>

              <div className="flex justify-between text-pink-700 font-bold text-lg">
                <div>Grand Total</div>
                <div>₹{grandTotal}</div>
              </div>
            </div>
          </>
        )}

        {status === "success" ? (
          <div className="text-center">
            <div className="text-green-600 font-semibold text-lg">
              ✅ Thank you! Your order has been placed successfully.
            </div>

            <Link
              href="/"
              className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Go Back to Home
            </Link>

            <p className="text-gray-700 mt-4">
              Want to know about your delivery?{" "}
              <Link
                href="/contact"
                className="text-green-600 font-medium hover:underline"
              >
                Contact us on WhatsApp
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone number"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
            />

            <div>
              <textarea
                name="address"
                required
                rows={3}
                placeholder="Delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={loadingLocation}
                className="mt-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                {loadingLocation
                  ? "Fetching location..."
                  : "📍 Use My Current Location"}
              </button>
            </div>

            <textarea
              name="message"
              rows={2}
              placeholder="Any special instructions — e.g., mention color preference"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 placeholder:text-pink-400 text-sm"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition"
            >
              {status === "loading" ? "Sending Order..." : "Place Order"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-600 text-center mt-4">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
