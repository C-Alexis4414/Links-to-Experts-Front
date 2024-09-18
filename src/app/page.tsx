import React from 'react';
import Navbar from './components/navbar';
import UserCard from './pages/users/[card]';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <UserCard/>
      single page application
    </div>
  );
};

export default App;