// src/components/CandidateManagementComponent.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const CandidateManagementComponent = () => {
    const [candidates, setCandidates] = useState([]);
    const [currentCandidate, setCurrentCandidate] = useState({ name: '', contactInfo: '', currentStage: '', specialRequirementsNotes: '', nervousnessManagement: '' });
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch existing candidate data from Firestore
        const fetchCandidates = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'candidates'));
                setCandidates(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                setError('Error fetching candidates');
            }
        };

        fetchCandidates();
    }, []);

    const handleInputChange = (e) => {
        setCurrentCandidate({ ...currentCandidate, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                const candidateDoc = doc(firestore, 'candidates', currentCandidate.id);
                await updateDoc(candidateDoc, currentCandidate);
            } else {
                await addDoc(collection(firestore, 'candidates'), currentCandidate);
            }
            setSuccessMessage(editing ? 'Candidate updated successfully!' : 'Candidate added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            setCurrentCandidate({ name: '', contactInfo: '', currentStage: '', specialRequirementsNotes: '', nervousnessManagement: '' }); // Reset form
            setEditing(false);
        } catch (err) {
            setError('Error submitting candidate');
        }
    };

    const handleSelectCandidate = (candidateId) => {
        const candidate = candidates.find(c => c.id === candidateId);
        setCurrentCandidate(candidate);
        setEditing(true);
    };

    return (
        <div>
            <h1>Candidate Management</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <select onChange={(e) => handleSelectCandidate(e.target.value)} defaultValue="">
                <option value="" disabled>Select a candidate</option>
                {candidates.map(candidate => (
                    <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
                ))}
            </select>
            <form onSubmit={handleSubmit}>
                <label>
                    Candidate Name:
                    <input type="text" name="name" value={currentCandidate.name} onChange={handleInputChange} />
                </label>
                <label>
                    Contact Information:
                    <input type="text" name="contactInfo" value={currentCandidate.contactInfo} onChange={handleInputChange} />
                </label>
                <label>
                    Current Stage:
                    <input type="text" name="currentStage" value={currentCandidate.currentStage} onChange={handleInputChange} />
                </label>
                <label>
                    Special Requirements/Notes:
                    <textarea name="specialRequirementsNotes" value={currentCandidate.specialRequirementsNotes} onChange={handleInputChange}></textarea>
                </label>
                <label>
                    Nervousness Management:
                    <textarea name="nervousnessManagement" value={currentCandidate.nervousnessManagement} onChange={handleInputChange}></textarea>
                </label>
                <button type="submit">{editing ? 'Update Candidate' : 'Add Candidate'}</button>
            </form>
        </div>
    );
};

export default CandidateManagementComponent;
