// src/components/DashboardComponent.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase'; // adjust the import path as per your setup
import { collection, onSnapshot } from 'firebase/firestore';

const DashboardComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Real-time subscription to tasks
        const unsubscribeTasks = onSnapshot(collection(firestore, 'tasks'), (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
        });

        // Real-time subscription to interviews
        const unsubscribeInterviews = onSnapshot(collection(firestore, 'interviews'), (snapshot) => {
            const interviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setInterviews(interviewsData);
        });

        // Real-time subscription to notifications (if applicable)
        // ...

        // Cleanup subscriptions
        return () => {
            unsubscribeTasks();
            unsubscribeInterviews();
            // ...
        };
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Upcoming Interviews</h2>
                {/* Render list of interviews */}
                {interviews.map(interview => (
                    <div key={interview.id}>{/* Render interview details */}</div>
                ))}
            </div>
            <div>
                <h2>Pending Tasks</h2>
                {/* Render list of tasks */}
                {tasks.map(task => (
                    <div key={task.id}>{/* Render task details */}</div>
                ))}
            </div>
            <div>
                <h2>Notifications</h2>
                {/* Render notifications */}
                {/* ... */}
            </div>
            <div>
                <h2>Quick Navigation</h2>
                <Link to="/tasks">Task Management</Link>
                <Link to="/interviews">Interview Scheduling</Link>
                <Link to="/feedback">Feedback</Link>
                <Link to="/statistics">Statistics</Link>
            </div>
        </div>
    );
};

export default DashboardComponent;
