// src/Components/Signup.jsx
import React, { useState } from 'react';
import './Login.css'; // You can reuse the same styles
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function Signup({ onSignupSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        onSignupSuccess(); // You can redirect or change state in App.jsx
      } catch (error) {
        alert('Signup failed: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please enter email and password!');
    }
  };

  return (
    <div className="login-container">
      <img src="/images/pantry_pal_logo.png" alt="Pandy" />
      <h1 className="title">Create an Account</h1>
      <form className="login-form" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {isLoading && <div className="spinner"></div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
