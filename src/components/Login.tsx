"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter for App Router
import { auth } from "@/context/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import axios from "axios";

interface Order {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: Array<{
    name: string;
    price: number;
    quantity: number;
    images?: string[];
  }>;
  payment: {
    method: string;
    status: 'pending' | 'completed' | 'failed';
    paymentId?: string;
    amount: number;
  };
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  review?: {
    rating: number;
    comment: string;
    date: string;
  };
  message?: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Helper: store user in MongoDB
  const storeUser = async (user: any) => {
    try {
      await axios.post("/api/users", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      });
    } catch (err) {
      console.error("Error storing user in DB:", err);
    }
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store in MongoDB
      await storeUser(user);

      setError(null);
      router.push("/"); // navigate to home page
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store in MongoDB
      await storeUser(user);

      setError(null);
      router.push("/"); // navigate to home page
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchOrders();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async () => {
    if (!currentUser?.email) return;

    setOrdersLoading(true);
    try {
      const response = await axios.get(`/api/my-orders?email=${encodeURIComponent(currentUser.email)}`);
      setOrders((response.data as { orders: Order[] }).orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#10b981';
      case 'shipped': return '#3b82f6';
      case 'processing': return '#f59e0b';
      case 'confirmed': return '#8b5cf6';
      case 'pending': return '#f97316';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      {/* Login Section - Left Side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            padding: 30,
            borderRadius: 8,
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 15,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 15,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleEmailLogin}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 4,
              border: "none",
              background: "#1976d2",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 15,
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login with Email"}
          </button>

          <div style={{ textAlign: "center", marginBottom: 15 }}>OR</div>

          <button
            onClick={handleGoogleLogin}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 4,
              border: "none",
              background: "#db4437",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login with Google"}
          </button>

          {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
        </div>
      </div>

     
    </div>
  );
};

export default LoginPage;
