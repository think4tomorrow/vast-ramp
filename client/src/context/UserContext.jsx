import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678', // Mock data
    email: 'user@example.com',
    balance: 0.5,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};