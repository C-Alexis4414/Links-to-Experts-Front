import React from 'react';
import CreateUser from './components/signup';
import UserList from './components/getUser';

const App: React.FC = () => {
  return (
    <div>
      <CreateUser />
      <UserList />
    </div>
  );
};

export default App;