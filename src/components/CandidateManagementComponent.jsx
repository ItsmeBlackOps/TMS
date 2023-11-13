// src/components/CandidateManagementComponent.js

import React, { useState, useEffect } from 'react';
import FirestoreService from '../services/firestoreService';
import CandidateForm from './CandidateForm'; // Sub-component for adding/editing candidates
import CandidateList from './CandidateList'; // Sub-component for listing candidates

const CandidateManagementComponent = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            const candidatesData = await FirestoreService.getAll('candidates');
            setCandidates(candidatesData);
        };

        fetchCandidates();
    }, []);

    const handleSelectCandidate = (candidateId) => {
        const candidate = candidates.find(c => c.id === candidateId);
        setSelectedCandidate(candidate);
        setIsEditing(true);
    };

    const handleCandidateSubmit = async (candidateData) => {
        if (isEditing && selectedCandidate) {
            await FirestoreService.update('candidates', selectedCandidate.id, candidateData);
        } else {
            await FirestoreService.add('candidates', candidateData);
        }
        setSelectedCandidate(null);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Candidate Management</h1>
            <CandidateForm onSubmit={handleCandidateSubmit} initialData={selectedCandidate} />
            <CandidateList candidates={candidates} onSelectCandidate={handleSelectCandidate} />
        </div>
    );
};

export default CandidateManagementComponent;
