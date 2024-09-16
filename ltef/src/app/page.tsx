// 'use client'
// import { useState, useEffect } from 'react';
// import { getRecords } from './airtable';

// export default function Home() {
//   const [records, setRecords] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const records = await getRecords('utilisateur');
//         console.log(records);
//         setRecords(records);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRecords();
//   }, []);


//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       coucou
//       {records.map((record) => (
//         <div key={record.id}>
//           <h2>{record.fields.name}</h2>
//           <p>{record.fields.email}</p>
//         </div>
//       ))}
//     </main>
//   );
// }

// src/App.tsx

import React from 'react';
import UserList from './component/Userlist';
import CreateUser from './component/CreateUserList';

const App: React.FC = () => {
  return (
    <div>
      <UserList />
      <CreateUser />
    </div>
  );
};

export default App;

