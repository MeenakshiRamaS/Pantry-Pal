import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust path if needed

function Login({ onLoginSuccess, onCreateAccount }) { // Add onCreateAccount prop
  const [email, setEmail] = useState(''); // change "username" to "email"
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess();
      } catch (error) {
        alert('Login failed: ' + error.message);
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
      <h1 className="title">Welcome to Pantry Pal!</h1>
      <h3 className="login-title">Login</h3>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {isLoading && <div className="spinner"></div>}
        <button type="submit">Sign In</button>
      </form>

      {/* Create Account Button */}
      <button onClick={onCreateAccount} className="create-account-btn">
        Create Account
      </button>
    </div>
  );
}

export default Login;
