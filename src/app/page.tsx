import React from 'react';
import Navbar from './components/navbar';
import HomePage from './homePage/page';

/**
 * 
 * @returns single page root, elle affiche par défault la page de connexion à l'application:
 */


const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
};

export default App;