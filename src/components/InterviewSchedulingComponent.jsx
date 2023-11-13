// src/components/InterviewSchedulingComponent.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const InterviewSchedulingComponent = () => {
    const [interview, setInterview] = useState({
        candidateName: '',
        interviewDate: '',
        time: '',
        interviewer: '',
        platformLocation: '',
        confirmationStatus: false
    });
    const [candidates, setCandidates] = useState([]);
    const [interviewers, setInterviewers] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch candidates and interviewers from Firestore
        const fetchData = async () => {
            try {
                const candidatesSnapshot = await getDocs(collection(firestore, 'candidates'));
                const interviewersSnapshot = await getDocs(collection(firestore, 'interviewers'));
                setCandidates(candidatesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setInterviewers(interviewersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInterview({ ...interview, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(firestore, 'interviews'), interview);
            setSuccessMessage('Interview scheduled successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            setInterview({ candidateName: '', interviewDate: '', time: '', interviewer: '', platformLocation: '', confirmationStatus: false }); // Reset form
        } catch (err) {
            setError('Error scheduling interview');
        }
    };

    return (
        <div>
            <h1>Interview Scheduling</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Candidate Name:
                    <select name="candidateName" value={interview.candidateName} onChange={handleChange}>
                        <option value="">Select a Candidate</option>
                        {candidates.map(candidate => (
                            <option key={candidate.id} value={candidate.name}>{candidate.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Interview Date:
                    <input type="date" name="interviewDate" value={interview.interviewDate} onChange={handleChange} />
                </label>
                <label>
                    Time:
                    <input type="time" name="time" value={interview.time} onChange={handleChange} />
                </label>
                <label>
                    Interviewer:
                    <select name="interviewer" value={interview.interviewer} onChange={handleChange}>
                        <option value="">Select an Interviewer</option>
                        {interviewers.map(interviewer => (
                            <option key={interviewer.id} value={interviewer.name}>{interviewer.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Platform/Location:
                    <input type="text" name="platformLocation" value={interview.platformLocation} onChange={handleChange} />
                </label>
                <label>
                    Confirmation Status:
                    <input type="checkbox" name="confirmationStatus" checked={interview.confirmationStatus} onChange={handleChange} />
                </label>
                <button type="submit">Schedule Interview</button>
            </form>
        </div>
    );
};

export default InterviewSchedulingComponent;
