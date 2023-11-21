import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../src/LoginComponent.css'; // Make sure the path is correct


const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        // This function should only set up the listener once
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log("User is signed in, navigating to /dashboard");
                navigate('/dashboard');
            } else {
                console.log("User is signed out");
            }
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe(); // Make sure to call unsubscribe function
    }, [navigate]);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in user:', userCredential.user);
            // No need to navigate here as the useEffect will handle it
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;
