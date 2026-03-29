# PowerTools Store - Demo E-Commerce Application

A professional demo e-commerce application built with Next.js, React, and Tailwind CSS. Perfect for testing automation frameworks and exploring UI testing scenarios.

## Features

- **Product Catalog**: Browse 6 different power tools with images, descriptions, and prices
- **Product Cards**: Responsive grid layout with hover effects
- **Shopping Cart Icon**: Visual indicator (demo only)
- **Checkout Flow**: Complete checkout form with validation
- **Credit Card Form**: Full payment details form (no actual payment processing)
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Modern UI**: Professional styling with Tailwind CSS

## Project Structure

```
demostore/
├── app/
│   ├── layout.tsx           # Root layout with header
│   ├── page.tsx             # Home page with product listing
│   ├── globals.css          # Global styles
│   └── checkout/
│       └── page.tsx         # Checkout page with form
├── components/
│   └── ProductCard.tsx      # Product card component
├── public/
│   └── images/              # Image assets (currently using SVG)
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.cjs       # PostCSS configuration
└── next.config.ts           # Next.js configuration
```

## Products

The store includes 6 demo products:

1. **Professional Cordless Drill** - $149.99
2. **Circular Saw** - $89.99
3. **Angle Grinder** - $79.99
4. **1/2" Impact Driver** - $129.99
5. **Random Orbital Sander** - $99.99
6. **Compact Jigsaw** - $69.99

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd d:\repos\demostore
   ```

2. Install dependencies (already done, but for reference):
   ```bash
   npm install
   ```

### Running the Application

#### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

#### Production Build

```bash
npm run build
npm run start
```

## Testing the Application

### Home Page Features to Test:
- Navigation header with responsive menu
- Hero banner section
- Product grid layout Responsive design (mobile, tablet, desktop)
- Product cards with images and information
- "Buy" buttons for each product
- Footer with links

### Checkout Page Features to Test:
- Form validation for all fields
- Shipping address form
- Payment information form
- Order summary with pricing breakdown
- Success page after form submission
- Back to store functionality

### Test Scenarios:

#### Form Validation Testing
- Test with empty fields
- Test with invalid email
- Test with invalid card number
- Test with invalid CVV
- Test with incomplete forms

#### Responsive Design Testing
- Test on mobile devices (375px, 480px)
- Test on tablets (768px)
- Test on desktop (1024px+)
- Test menu toggle on mobile

#### Navigation Testing
- Click on "Buy" buttons
- Navigate to checkout
- Fill out entire form
- Submit order
- Return to store

#### Data Flow Testing
- Product selection persists
- Form data retention
- LocalStorage for product data

## Technical Details

- **Framework**: Next.js 16.x with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes

⚠️ **This is a demo application for testing purposes:**
- No actual payments are processed
- No backend server
- No database
- All product data is hardcoded
- Form data is stored in localStorage only during the session
- No authentication system

## Perfect For

- Testing automation frameworks (Cypress, Selenium, Playwright, etc.)
- Learning UI testing
- Experimenting with QA tools
- Teaching testing concepts
- Testing form validation
- Testing responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC
