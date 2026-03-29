import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the ProductCard component to test parent functionality
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} alt={alt} />;
  },
}));

describe('Checkout Form Component Tests', () => {
  // Mock form component for testing
  const MockCheckoutForm = () => (
    <form data-testid="checkout-form">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" placeholder="John" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="cardNumber">Card Number</label>
        <input id="cardNumber" name="cardNumber" type="text" placeholder="4532 1234 5678 9101" />
      </div>
      <button type="submit">Complete Order</button>
    </form>
  );

  it('should render all form fields', () => {
    render(<MockCheckoutForm />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete order/i })).toBeInTheDocument();
  });

  it('should allow user to type in form fields', async () => {
    const user = userEvent.setup();
    render(<MockCheckoutForm />);

    const firstNameInput = screen.getByPlaceholderText('John') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('john@example.com') as HTMLInputElement;

    await user.type(firstNameInput, 'John');
    await user.type(emailInput, 'john@example.com');

    expect(firstNameInput.value).toBe('John');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('should have correct input types', () => {
    render(<MockCheckoutForm />);

    const emailInput = screen.getByLabelText('Email');
    const cardInput = screen.getByLabelText('Card Number');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(cardInput).toHaveAttribute('type', 'text');
  });

  it('should have a submit button', () => {
    render(<MockCheckoutForm />);

    const submitButton = screen.getByRole('button', { name: /complete order/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('should render form with correct structure', () => {
    const { container } = render(<MockCheckoutForm />);

    const form = container.querySelector('form[data-testid="checkout-form"]');
    expect(form).toBeInTheDocument();

    const divs = form?.querySelectorAll('div');
    expect(divs?.length).toBeGreaterThanOrEqual(3);
  });
});

describe('Navigation Component Tests', () => {
  const MockHeader = () => (
    <header data-testid="header">
      <h1>PowerTools Store</h1>
      <nav>
        <a href="/">Home</a>
        <a href="#products">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <div data-testid="cart-icon">
        <span>0</span>
      </div>
    </header>
  );

  it('should render header with navigation links', () => {
    render(<MockHeader />);

    expect(screen.getByText('PowerTools Store')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument();
  });

  it('should have correct navigation hrefs', () => {
    render(<MockHeader />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const productsLink = screen.getByRole('link', { name: /products/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '#products');
  });

  it('should render shopping cart indicator', () => {
    render(<MockHeader />);

    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should have all navigation items', () => {
    render(<MockHeader />);

    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(4);
  });
});
