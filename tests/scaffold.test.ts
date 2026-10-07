import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

describe('Scaffold & Tooling Verification', () => {
  it('renders application header and title', () => {
    render(React.createElement(App));
    expect(screen.getByRole('heading', { name: /Wisconsin Tax Flow/i })).toBeInTheDocument();
  });

  it('verifies nonpartisan badge is displayed', () => {
    render(React.createElement(App));
    expect(screen.getByText(/Nonpartisan Civic Data/i)).toBeInTheDocument();
  });

  it('validates basic math assertion runtime in Vitest', () => {
    const taxes = 100;
    const aids = 54;
    const returnOnDollar = aids / taxes;
    expect(returnOnDollar).toBeCloseTo(0.54, 2);
  });
});
