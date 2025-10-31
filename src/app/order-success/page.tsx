import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for placing your order. We’ve received your details and will
          contact you soon.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Go Back to Home
          </Link>

          <p className="text-gray-700 mt-4">
            Want to know about your delivery?{" "}
            <a
              href="/contact"
              className="text-green-600 font-medium hover:underline"
            >
              Contact us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

