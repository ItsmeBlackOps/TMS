// src/components/Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={{ padding: '10px 20px', backgroundColor: '#e3f2fd' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/task-management">Task Management</Link></li>
                <li><Link to="/interview-scheduling">Interview Scheduling</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/candidate-management">Candidate Management</Link></li>
                {/* Add additional navigation links as needed */}
            </ul>
        </nav>
    );
};

export default Navigation;
