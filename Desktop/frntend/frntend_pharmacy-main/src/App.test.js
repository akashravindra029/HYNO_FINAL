import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
