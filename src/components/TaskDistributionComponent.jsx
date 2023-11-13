// src/components/TaskDistributionComponent.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const TaskDistributionComponent = () => {
    const [task, setTask] = useState({
        teamMember: '',
        candidateName: '',
        interviewDate: '',
        status: '',
        notes: ''
    });
    const [candidates, setCandidates] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch candidates and team members from Firestore
        const fetchCandidatesAndTeamMembers = async () => {
            try {
                const candidatesSnapshot = await getDocs(collection(firestore, 'candidates'));
                const teamMembersSnapshot = await getDocs(collection(firestore, 'teamMembers'));
                setCandidates(candidatesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setTeamMembers(teamMembersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchCandidatesAndTeamMembers();
    }, []);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await addDoc(collection(firestore, 'tasks'), {
                ...task,
                dateAssigned: new Date() // Automatically set the assignment date
            });
            setTask({ teamMember: '', candidateName: '', interviewDate: '', status: '', notes: '' }); // Reset form
            setIsSubmitting(false);
        } catch (err) {
            setError('Error submitting task');
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Task Distribution</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Team Member:
                    <select name="teamMember" value={task.teamMember} onChange={handleChange}>
                        <option value="">Select a Team Member</option>
                        {teamMembers.map(member => (
                            <option key={member.id} value={member.name}>{member.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Candidate Name:
                    <select name="candidateName" value={task.candidateName} onChange={handleChange}>
                        <option value="">Select a Candidate</option>
                        {candidates.map(candidate => (
                            <option key={candidate.id} value={candidate.name}>{candidate.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Interview Date:
                    <input type="date" name="interviewDate" value={task.interviewDate} onChange={handleChange} />
                </label>
                <label>
                    Status:
                    <select name="status" value={task.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>
                    Notes:
                    <textarea name="notes" value={task.notes} onChange={handleChange} />
                </label>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Task'}</button>
            </form>
        </div>
    );
};

export default TaskDistributionComponent;
