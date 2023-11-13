// src/components/Login.js

import React, { useState } from 'react';
import { login, signup } from './authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // handle successful login
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      await signup(email, password);
      // handle successful signup
    } catch (error) {
      console.error("Signup Failed:", error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Login;
