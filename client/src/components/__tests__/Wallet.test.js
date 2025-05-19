import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WalletDashboard from '../WalletDashboard';
import { UserContext } from '../../context/UserContext';

describe('Wallet Component', () => {
  const mockUser = {
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    email: 'user@example.com',
    balance: 0.5
  };

  it('renders wallet dashboard', () => {
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <WalletDashboard />
      </UserContext.Provider>
    );
    expect(screen.getByText(/Wallet Dashboard/i)).toBeInTheDocument();
  });
}); 