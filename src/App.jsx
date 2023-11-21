import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DashboardComponent from './components/DashboardComponent';
import TaskManagementComponent from './components/TaskManagementComponent';
import InterviewSchedulingComponent from './components/InterviewSchedulingComponent';
import FeedbackComponent from './components/FeedbackComponent';
import CandidateManagementComponent from './components/CandidateManagementComponent';
import StatisticsComponent from './components/StatisticsComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { NotificationProvider } from './Contexts/NotificationContext';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setIsAuthenticated(true);
            } else {
                // User is signed out.
                setIsAuthenticated(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);


    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        // Here you should also handle the logout logic with your authentication service
    };

    return (
        <Router>
            <NotificationProvider>
                {isAuthenticated && <Header onLogout={handleLogout} />}
                {isAuthenticated && <Navigation />}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <LoginComponent onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/dashboard" element={isAuthenticated ? <DashboardComponent /> : <Navigate replace to="/" />} />
                        <Route path="/task-management" element={isAuthenticated ? <TaskManagementComponent /> : <Navigate replace to="/" />} />
                        <Route path="/interview-scheduling" element={isAuthenticated ? <InterviewSchedulingComponent /> : <Navigate replace to="/" />} />
                        <Route path="/feedback" element={isAuthenticated ? <FeedbackComponent /> : <Navigate replace to="/" />} />
                        <Route path="/candidate-management" element={isAuthenticated ? <CandidateManagementComponent /> : <Navigate replace to="/" />} />
                        <Route path="/statistics" element={isAuthenticated ? <StatisticsComponent /> : <Navigate replace to="/" />} />
                        {/* Redirect any unknown routes to the dashboard, or a 404 component */}
                        <Route path="*" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/"} />} />
                    </Routes>
                </div>
                {isAuthenticated && <Footer />}
            </NotificationProvider>
        </Router>
    );
};

export default App;
