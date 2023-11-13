// src/components/CandidateManagement.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

const CandidateManagement = () => {
    const [candidates, setCandidates] = useState([]);
    const [currentCandidate, setCurrentCandidate] = useState({ name: '', contactInfo: '' });
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null); // State to hold error messages
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'candidates'));
                const candidatesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCandidates(candidatesData);
            } catch (err) {
                console.error("Firebase operation failed:", err);
                setError(`Error submitting data to Firebase: ${err.message}`);
            }
            
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setCurrentCandidate({ ...currentCandidate, [e.target.name]: e.target.value });
        setError(null);
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
            setSuccessMessage('Data submitted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(`Error submitting data to Firebase: ${err.message}`);
        }
    };

    const handleSelectCandidate = (candidateId) => {
        const candidate = candidates.find(c => c.id === candidateId);
        setCurrentCandidate(candidate);
        setEditing(true);
        setError(null); // Clear error on selecting a candidate
    };

    return (
        <div>
            <h1>Candidate Management</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} {/* Success message */}
            <select onChange={(e) => handleSelectCandidate(e.target.value)} defaultValue="">
                <option value="" disabled>Select a candidate</option>
                {candidates.map(candidate => (
                    <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
                ))}
            </select>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={currentCandidate.name}
                    onChange={handleInputChange}
                    placeholder="Candidate Name"
                />
                <input
                    name="contactInfo"
                    value={currentCandidate.contactInfo}
                    onChange={handleInputChange}
                    placeholder="Contact Information"
                />
                <button type="submit">{editing ? 'Update' : 'Add'} Candidate</button>
            </form>
        </div>
    );
};

export default CandidateManagement;
