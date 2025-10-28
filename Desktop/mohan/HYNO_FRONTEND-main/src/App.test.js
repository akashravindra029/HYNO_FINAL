import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Hypno Pharmacy app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if the app renders without errors
  expect(screen.getByRole('main')).toBeInTheDocument();
});

test('renders navigation sidebar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if navigation is present
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('renders main content area', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if main content area exists
  expect(screen.getByRole('main')).toBeInTheDocument();
});
