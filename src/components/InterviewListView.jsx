// src/components/InterviewListView.js

import React from 'react';

const InterviewListView = ({ interviews, onSelectInterview, onEditInterview }) => {
    return (
        <div>
            <h2>Scheduled Interviews</h2>
            {interviews.map(interview => (
                <div key={interview.id}>
                    <div>{interview.candidateName} - {interview.interviewDate}</div>
                    <button onClick={() => onSelectInterview(interview.id)}>View</button>
                    <button onClick={() => onEditInterview(interview.id)}>Edit</button>
                </div>
            ))}
        </div>
    );
};

export default InterviewListView;
