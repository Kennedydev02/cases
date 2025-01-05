import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function SetupAdmin() {
  const [message, setMessage] = useState('');

  const createAdminUser = async () => {
    try {
      const email = "admin@cases.com";
      const password = "Admin123!";
      
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Admin user created successfully! You can now login.');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Admin user already exists! You can login.');
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button onClick={createAdminUser}>Create Admin User</button>
      <p>{message}</p>
    </div>
  );
}

export default SetupAdmin; 