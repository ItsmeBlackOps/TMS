// src/components/FeedbackList.js

import React from 'react';

const FeedbackList = ({ feedbackEntries, onSelectFeedback }) => {
    return (
        <div>
            <h2>Feedback Entries</h2>
            {feedbackEntries.map(feedback => (
                <div key={feedback.id} onClick={() => onSelectFeedback(feedback.id)}>
                    <p>{feedback.candidateName}</p>
                    <p>{feedback.interviewDate}</p>
                    {/* Display other relevant feedback details */}
                </div>
            ))}
        </div>
    );
};

export default FeedbackList;
