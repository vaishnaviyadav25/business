import ProductDetailClient from '@/components/ProductDetailClient';
import Footerpage from '@/components/Footerpage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details - Vaishi Handmade Creations',
  description: 'Handmade products crafted with love by Vaishi.',
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <ProductDetailClient />
      <Footerpage />
    </div>
  );
}