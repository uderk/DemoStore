import ProductCard from '@/components/ProductCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} alt={alt} />;
  },
}));

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Professional Cordless Drill',
    price: 149.99,
    image: '/images/cordless drill.jpg',
    description: '20V lithium-ion battery, 1/2" chuck, variable speed',
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render product information correctly', () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText('Professional Cordless Drill')).toBeInTheDocument();
    expect(
      screen.getByText('20V lithium-ion battery, 1/2" chuck, variable speed')
    ).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('should display the product image', () => {
    render(<ProductCard {...mockProduct} />);

    const image = screen.getByAltText('Professional Cordless Drill');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/cordless drill.jpg');
  });

  it('should have a Buy button', () => {
    render(<ProductCard {...mockProduct} />);

    const buyButton = screen.getByRole('link', { name: /buy/i });
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toHaveAttribute('href', '/checkout');
  });

  it('should save product data to localStorage when Buy button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...mockProduct} />);

    const buyButton = screen.getByRole('link', { name: /buy/i });
    await user.click(buyButton);

    const storedData = localStorage.getItem('selectedProduct');
    expect(storedData).toBeTruthy();

    const parsedData = JSON.parse(storedData!);
    expect(parsedData.id).toBe(1);
    expect(parsedData.name).toBe('Professional Cordless Drill');
    expect(parsedData.price).toBe(149.99);
  });

  it('should render with different product data', () => {
    const differentProduct = {
      id: 2,
      name: 'Circular Saw',
      price: 89.99,
      image: '/images/circular saw.jpg',
      description: '7 1/4" blade, 5800 RPM, laser guide',
    };

    render(<ProductCard {...differentProduct} />);

    expect(screen.getByText('Circular Saw')).toBeInTheDocument();
    expect(screen.getByText('$89.99')).toBeInTheDocument();
  });

  it('should apply correct CSS classes for styling', () => {
    const { container } = render(<ProductCard {...mockProduct} />);

    const cardContainer = container.querySelector('.bg-white');
    expect(cardContainer).toBeInTheDocument();
  });
});
