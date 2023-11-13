// src/components/InterviewSchedulingComponent.js

import React, { useState, useEffect } from 'react';
import FirestoreService from '../services/firestoreService';
import InterviewListView from './InterviewListView'; // A sub-component to list interviews
import InterviewForm from './InterviewForm'; // A sub-component for adding/editing interviews

const InterviewSchedulingComponent = () => {
    const [interviews, setInterviews] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchInterviews = async () => {
            const interviewsData = await FirestoreService.getAll('interviews');
            setInterviews(interviewsData);
        };

        fetchInterviews();
    }, []);

    const handleSelectInterview = (interviewId) => {
        const interview = interviews.find(i => i.id === interviewId);
        setSelectedInterview(interview);
        setIsEditing(false);
    };

    const handleEditInterview = (interviewId) => {
        const interview = interviews.find(i => i.id === interviewId);
        setSelectedInterview(interview);
        setIsEditing(true);
    };

    const handleInterviewSubmit = async (interviewData) => {
        try {
            if (isEditing && selectedInterview) {
                await FirestoreService.update('interviews', selectedInterview.id, interviewData);
            } else {
                await FirestoreService.add('interviews', interviewData);
            }
        } catch (error) {
            console.error('Error managing interview:', error);
            // Handle error appropriately
        }
        setSelectedInterview(null);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Interview Scheduling</h1>
            <InterviewListView interviews={interviews} onSelectInterview={handleSelectInterview} onEditInterview={handleEditInterview} />
            {(selectedInterview && isEditing) || (!selectedInterview && <InterviewForm onSubmit={handleInterviewSubmit} initialData={selectedInterview} />)}
        </div>
    );
};

export default InterviewSchedulingComponent;