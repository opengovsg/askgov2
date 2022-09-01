import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders vs. title', () => {
  render(<App />);
  const linkElement = screen.getByText(/vs./i);
  expect(linkElement).toBeInTheDocument();
});
