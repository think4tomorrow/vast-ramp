import React, { useContext } from 'react';
import DepositButton from './DepositButton';
import { UserContext } from '../context/UserContext';

const WalletDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="wallet-dashboard">
      <h2>Wallet Dashboard</h2>
      <p>Wallet Address: {user.walletAddress || 'Not connected'}</p>
      <p>Balance: {user.balance || 0} ETH</p>
      <DepositButton />
    </div>
  );
};

export default WalletDashboard;