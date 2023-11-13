// src/components/InterviewForm.jsx

import React, { useState, useEffect } from 'react';

const InterviewForm = ({ onSubmit, initialData }) => {
    const [interviewData, setInterviewData] = useState({
        candidateName: '',
        interviewDate: '',
        time: '',
        interviewer: '',
        platformLocation: '',
        confirmationStatus: false
    });

    // Load initial data into the form when editing
    useEffect(() => {
        if (initialData) {
            setInterviewData(initialData);
        }
    }, [initialData]);

    // Update state when form inputs change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInterviewData({
            ...interviewData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(interviewData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Candidate Name:
                <input
                    type="text"
                    name="candidateName"
                    value={interviewData.candidateName}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Interview Date:
                <input
                    type="date"
                    name="interviewDate"
                    value={interviewData.interviewDate}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Time:
                <input
                    type="time"
                    name="time"
                    value={interviewData.time}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Interviewer:
                <input
                    type="text"
                    name="interviewer"
                    value={interviewData.interviewer}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Platform/Location:
                <input
                    type="text"
                    name="platformLocation"
                    value={interviewData.platformLocation}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Confirmation Status:
                <input
                    type="checkbox"
                    name="confirmationStatus"
                    checked={interviewData.confirmationStatus}
                    onChange={handleChange}
                />
            </label>
            <br />

            <button type="submit">Save Interview</button>
        </form>
    );
};

export default InterviewForm;
