// src/components/FeedbackComponent.js

import React, { useState, useEffect } from 'react';
import FirestoreService from '../services/firestoreService';
import FeedbackForm from './FeedbackForm'; // A sub-component for feedback form
import FeedbackList from './FeedbackList'; // A sub-component for listing feedback

const FeedbackComponent = () => {
    const [feedbackEntries, setFeedbackEntries] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            const feedbackData = await FirestoreService.getAll('feedback');
            setFeedbackEntries(feedbackData);
        };

        fetchFeedback();
    }, []);

    const handleFeedbackSubmit = async (feedbackData) => {
        if (selectedFeedback) {
            await FirestoreService.update('feedback', selectedFeedback.id, feedbackData);
        } else {
            await FirestoreService.add('feedback', feedbackData);
        }
        setSelectedFeedback(null); // Reset selection after submission
    };

    const handleSelectFeedback = (feedbackId) => {
        const feedback = feedbackEntries.find(f => f.id === feedbackId);
        setSelectedFeedback(feedback);
    };

    return (
        <div>
            <h1>Interview Feedback</h1>
            <FeedbackForm onSubmit={handleFeedbackSubmit} initialData={selectedFeedback} />
            <FeedbackList feedbackEntries={feedbackEntries} onSelectFeedback={handleSelectFeedback} />
        </div>
    );
};

export default FeedbackComponent;