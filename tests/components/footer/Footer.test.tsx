import { render, screen } from '@testing-library/react';
import Footer from '@components/footer/Footer';

describe('Footer', () => {
test('renders contact information', () => {
  render(<Footer />);
  expect(screen.getByText(/support@HomeLibrary.com/i)).toBeInTheDocument();
  expect(screen.getByText(/\+31645/i)).toBeInTheDocument();
  expect(screen.getByText(/Haarlem, The Netherlands/i)).toBeInTheDocument();
})

test('renders copyright sign', () =>{
  render(<Footer />);
  expect(screen.getByText(/All rights reserved @HomeLibrary 2024/i)).toBeInTheDocument();
})

test('renders quick links with href', () => {
  render(<Footer />);
  const homeLink = screen.getByText('Home');
  const myBooksLink = screen.getByText('My Books');

  expect(homeLink).toHaveAttribute('href', '/');
  expect(myBooksLink).toHaveAttribute('href', '/MyBooks');
})
})