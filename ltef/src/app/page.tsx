import React from 'react';
import CreateUser from './components/signup';
import UserList from './components/getUser';
import AllUsers from './components2/getAllUsers';
import UserSearchComponent from './components2/getOneUser';
import UserSearchName from './components2/getNameUser';

const App: React.FC = () => {
  return (
    <>
      {/* <CreateUser /> */}
      <UserSearchName />
      <UserSearchComponent />
      <AllUsers />

      {/* <UserList /> */}
    </>
  );
};

export default App;