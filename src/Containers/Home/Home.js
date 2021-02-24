import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../Service';

const Home = () => {
  const [users, setUsers] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])


  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Home;