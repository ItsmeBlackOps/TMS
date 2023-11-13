// src/components/FeedbackForm.js

import React, { useState, useEffect } from 'react';

const FeedbackForm = ({ onSubmit, initialData }) => {
    const [feedbackData, setFeedbackData] = useState({
        candidateName: '',
        interviewDate: '',
        feedbackContent: ''
        // Add other fields as necessary
    });

    useEffect(() => {
        if (initialData) {
            setFeedbackData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(feedbackData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for feedback form */}
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
