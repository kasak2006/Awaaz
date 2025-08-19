import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthCheck = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:8000/api/health/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error fetching API');
        console.error(error);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontSize: '1.9rem', textAlign: 'center',color:'cyan' }}>
      <h2>Awaaz Backend Status:</h2>
      <p>{message}</p>
    </div>
  );
};

export default HealthCheck;
