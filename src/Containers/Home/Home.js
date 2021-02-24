import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../Service';

const Home = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchUser();
        setUser(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])


  return (
    <div>
      <h1>Test</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export default Home;