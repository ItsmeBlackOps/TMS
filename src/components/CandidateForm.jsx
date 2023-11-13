// src/components/CandidateForm.js

import React, { useState, useEffect } from 'react';

const CandidateForm = ({ onSubmit, initialData }) => {
    const [candidateData, setCandidateData] = useState({
        name: '',
        contactInfo: '',
        currentStage: '',
        specialRequirementsNotes: '',
        // Add other necessary fields
    });

    useEffect(() => {
        if (initialData) {
            setCandidateData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(candidateData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add input fields for candidate form */}
            <button type="submit">Save Candidate</button>
        </form>
    );
};

export default CandidateForm;
