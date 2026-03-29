'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const handleBuyClick = () => {
    localStorage.setItem('selectedProduct', JSON.stringify({ id, name, price }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-orange-600">
            ${price.toFixed(2)}
          </div>
          <Link
            href="/checkout"
            onClick={handleBuyClick}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <ShoppingCart size={18} />
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}
