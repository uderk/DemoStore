'use client';

import ProductCard from '@/components/ProductCard';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Professional Cordless Drill',
    price: 149.99,
    image: '/images/cordless drill.jpg',
    description: '20V lithium-ion battery, 1/2" chuck, variable speed',
  },
  {
    id: 2,
    name: 'Circular Saw',
    price: 89.99,
    image: '/images/circular saw.jpg',
    description: '7 1/4" blade, 5800 RPM, laser guide',
  },
  {
    id: 3,
    name: 'Angle Grinder',
    price: 79.99,
    image: '/images/angles grinder.jpg',
    description: '4.5" disc, 11000 RPM, variable speed',
  },
  {
    id: 4,
    name: '1/2" Impact Driver',
    price: 129.99,
    image: '/images/impact driver.jpg',
    description: '1600 in-lbs torque, compact design',
  },
  {
    id: 5,
    name: 'Random Orbital Sander',
    price: 99.99,
    image: '/images/orbital sander.jpg',
    description: '5" pad, 12000 RPM, dust collection',
  },
  {
    id: 6,
    name: 'Compact Jigsaw',
    price: 69.99,
    image: '/images/compact jigsaw.jpg',
    description: '4-pin stroke, bevel cut 0-45°',
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-orange-600">⚙</div>
              <h1 className="text-2xl font-bold text-gray-900">PowerTools Store</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-orange-600 transition">
                Home
              </a>
              <a href="#products" className="text-gray-600 hover:text-orange-600 transition">
                Products
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition">
                Contact
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-orange-600 transition hidden sm:block">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-orange-600 transition hidden sm:block">
                <User size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-orange-600 transition relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-2">
              <a href="#" className="text-gray-600 hover:text-orange-600 transition py-2">
                Home
              </a>
              <a href="#products" className="text-gray-600 hover:text-orange-600 transition py-2">
                Products
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition py-2">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition py-2">
                Contact
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional Power Tools</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            High-quality tools for professionals and DIY enthusiasts. Shop our complete selection of drills, saws, grinders, and more.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h2>
          <p className="text-gray-600">Discover our wide range of professional-grade power tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">About Us</h3>
              <p className="text-sm">PowerTools Store offers the best selection of professional power tools for every job.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Products</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 PowerTools Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
