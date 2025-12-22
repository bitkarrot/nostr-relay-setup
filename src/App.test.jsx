import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the main title and logo', () => {
    render(<App />);

    expect(screen.getByText('Deploy a Team Nostr Relay for free')).toBeInTheDocument();
    expect(screen.getByAltText('Nostr')).toBeInTheDocument();
    expect(screen.getByText('Setup guide for Fly.io + Neon DB')).toBeInTheDocument();
    expect(screen.getByText('Total time: ~20-30 minutes | Cost: $0/month forever')).toBeInTheDocument();
  });

  it('renders progress section', () => {
    render(<App />);

    expect(screen.getByText('Your Progress')).toBeInTheDocument();
    expect(screen.getByText('0/6 complete')).toBeInTheDocument();
  });

  it('renders overview section', () => {
    render(<App />);

    expect(screen.getByText('Overview & Prerequisites')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<App />);

    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Deploy a Team Nostr Relay for free');

    // Check for proper button elements for user interaction
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('contains tutorial content structure', () => {
    render(<App />);

    // Should contain step-by-step instruction elements
    expect(screen.getByText('Step-by-Step Instructions')).toBeInTheDocument();
  });
});