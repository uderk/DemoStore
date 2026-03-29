'use client';

import { CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export default function CheckoutPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct) {
      setProduct(JSON.parse(selectedProduct));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 13-19 digits';
    }
    if (!formData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!formData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      localStorage.removeItem('selectedProduct');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm" rnd-id="header-success">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              rnd-id="link-backToStoreSuccess"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition"
            >
              <ChevronLeft size={20} />
              Back to Store
            </Link>
          </div>
        </header>

        {/* Success Message */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center"
            rnd-id="section-successMessage"
          >
            <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2" rnd-id="text-orderSubmittedTitle">
              Order Submitted!
            </h1>
            <p className="text-gray-600 mb-6" rnd-id="text-orderSubmittedDesc">
              Your order has been submitted successfully. Note: This is a demo store, no payment was
              actually processed.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                <strong>Demo Info:</strong> This order form demonstrates a complete checkout
                experience. In a real application, payment would be processed here using a secure
                payment gateway like Stripe or PayPal.
              </p>
            </div>
            <div
              className="space-y-2 text-left mb-6 bg-gray-50 p-4 rounded-lg"
              rnd-id="section-orderDetails"
            >
              <p rnd-id="text-orderId">
                <strong>Order ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p rnd-id="text-orderName">
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p rnd-id="text-orderEmail">
                <strong>Email:</strong> {formData.email}
              </p>
              {product && (
                <p rnd-id="text-orderProduct">
                  <strong>Product:</strong> {product.name}
                </p>
              )}
            </div>
            <Link
              href="/"
              rnd-id="link-continueShopping"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40" rnd-id="header-checkout">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            rnd-id="link-backToStore"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition"
          >
            <ChevronLeft size={20} />
            Back to Store
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8" rnd-id="text-checkoutTitle">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} rnd-id="form-checkout" className="lg:col-span-2">
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              rnd-id="section-shippingAddress"
            >
              <h2
                className="text-xl font-semibold text-gray-900 mb-4"
                rnd-id="text-shippingAddressTitle"
              >
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    rnd-id="input-firstName"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-firstName">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    rnd-id="input-lastName"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-lastName">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  rnd-id="input-email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1" rnd-id="error-email">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  rnd-id="input-phone"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1" rnd-id="error-phone">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rnd-id="input-address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1" rnd-id="error-address">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    rnd-id="input-city"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-city">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    rnd-id="input-state"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-state">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  rnd-id="input-zipCode"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-xs mt-1" rnd-id="error-zipCode">
                    {errors.zipCode}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              rnd-id="section-paymentInformation"
            >
              <h2
                className="text-xl font-semibold text-gray-900 mb-4"
                rnd-id="text-paymentInformationTitle"
              >
                Payment Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  rnd-id="input-cardName"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.cardName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.cardName && (
                  <p className="text-red-500 text-xs mt-1" rnd-id="error-cardName">
                    {errors.cardName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  rnd-id="input-cardNumber"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="4532 1234 5678 9101"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1" rnd-id="error-cardNumber">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <select
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    rnd-id="select-expiryMonth"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  {errors.expiryMonth && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-expiryMonth">
                      {errors.expiryMonth}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    rnd-id="select-expiryYear"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.expiryYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={String(2026 + i).slice(-2)}>
                        {String(2026 + i).slice(-2)}
                      </option>
                    ))}
                  </select>
                  {errors.expiryYear && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-expiryYear">
                      {errors.expiryYear}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    rnd-id="input-cvv"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1" rnd-id="error-cvv">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              rnd-id="button-completeOrder"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Complete Order
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <div
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
              rnd-id="section-orderSummary"
            >
              <h2
                className="text-lg font-semibold text-gray-900 mb-4"
                rnd-id="text-orderSummaryTitle"
              >
                Order Summary
              </h2>
              {product ? (
                <>
                  <div className="mb-4 pb-4 border-b" rnd-id="section-orderProduct">
                    <p className="text-gray-600 mb-1">Product</p>
                    <p className="font-semibold text-gray-900" rnd-id="text-productName">
                      {product.name}
                    </p>
                  </div>
                  <div className="space-y-2 mb-4 pb-4 border-b" rnd-id="section-orderCosts">
                    <div className="flex justify-between text-gray-600" rnd-id="row-subtotal">
                      <span>Subtotal</span>
                      <span rnd-id="text-subtotal">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600" rnd-id="row-shipping">
                      <span>Shipping</span>
                      <span rnd-id="text-shipping">$9.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600" rnd-id="row-tax">
                      <span>Tax</span>
                      <span rnd-id="text-tax">${((product.price + 9.99) * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  <div
                    className="flex justify-between text-lg font-bold text-gray-900"
                    rnd-id="row-total"
                  >
                    <span>Total</span>
                    <span rnd-id="text-total">
                      ${(product.price + 9.99 + (product.price + 9.99) * 0.08).toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">No product selected</p>
              )}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Demo Notice:</strong> This is a demo store. No actual payment will be processed.
            Use any valid card number format to test the checkout form.
          </p>
        </div>
      </div>
    </div>
  );
}
