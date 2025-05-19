import React from 'react';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import './assets/styles/App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Home />
      </div>
    </UserProvider>
  );
}

export default App;