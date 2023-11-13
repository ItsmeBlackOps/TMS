import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import DashboardComponent from './components/DashboardComponent';
import TaskManagementComponent from './components/TaskManagementComponent';
import InterviewSchedulingComponent from './components/InterviewSchedulingComponent';
import FeedbackComponent from './components/FeedbackComponent';
import CandidateManagementComponent from './components/CandidateManagementComponent';
import LoginComponent from './components/LoginComponent';
import { NotificationProvider } from './Contexts/NotificationContext';

const App = () => {
    return (
        <Router>
            <NotificationProvider>
                <Header />
                <Navigation />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<DashboardComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/dashboard" element={<DashboardComponent />} />
                        <Route path="/task-management" element={<TaskManagementComponent />} />
                        <Route path="/interview-scheduling" element={<InterviewSchedulingComponent />} />
                        <Route path="/feedback" element={<FeedbackComponent />} />
                        <Route path="/candidate-management" element={<CandidateManagementComponent />} />
                        {/* Add additional routes as necessary */}
                    </Routes>
                </div>
                <Footer />
            </NotificationProvider>
        </Router>
    );
};

export default App;
