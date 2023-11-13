// src/components/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in v6
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login'); // Use navigate in place of history.push
            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    };
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f5f5f5' }}>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                <img src="/path-to-your-logo.png" alt="App Logo" style={{ marginRight: '10px' }} />
                App Name
            </div>
            <div>
                {auth.currentUser && (
                    <span style={{ marginRight: '20px' }}>
                        Welcome, {auth.currentUser.displayName || auth.currentUser.email}
                    </span>
                )}
                <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
