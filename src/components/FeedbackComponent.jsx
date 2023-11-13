// src/components/FeedbackComponent.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FeedbackComponent = () => {
    const [feedback, setFeedback] = useState({
        candidateName: '',
        interviewDate: '',
        interviewer: '',
        feedbackProvided: '',
        nextSteps: '',
        candidateResponse: ''
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
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(firestore, 'feedbacks'), feedback);
            setSuccessMessage('Feedback submitted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            setFeedback({ candidateName: '', interviewDate: '', interviewer: '', feedbackProvided: '', nextSteps: '', candidateResponse: '' }); // Reset form
        } catch (err) {
            setError('Error submitting feedback');
        }
    };

    return (
        <div>
            <h1>Interview Feedback</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Candidate Name:
                    <select name="candidateName" value={feedback.candidateName} onChange={handleChange}>
                        <option value="">Select a Candidate</option>
                        {candidates.map(candidate => (
                            <option key={candidate.id} value={candidate.name}>{candidate.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Interview Date:
                    <input type="date" name="interviewDate" value={feedback.interviewDate} onChange={handleChange} />
                </label>
                <label>
                    Interviewer:
                    <select name="interviewer" value={feedback.interviewer} onChange={handleChange}>
                        <option value="">Select an Interviewer</option>
                        {interviewers.map(interviewer => (
                            <option key={interviewer.id} value={interviewer.name}>{interviewer.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Feedback Provided:
                    <textarea name="feedbackProvided" value={feedback.feedbackProvided} onChange={handleChange} />
                </label>
                <label>
                    Next Steps:
                    <textarea name="nextSteps" value={feedback.nextSteps} onChange={handleChange} />
                </label>
                <label>
                    Candidate's Response:
                    <textarea name="candidateResponse" value={feedback.candidateResponse} onChange={handleChange} />
                </label>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackComponent;
