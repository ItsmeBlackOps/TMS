// src/components/CandidateList.js

import React from 'react';

const CandidateList = ({ candidates, onSelectCandidate }) => {
    return (
        <div>
            <h2>Candidates List</h2>
            {candidates.map(candidate => (
                <div key={candidate.id} onClick={() => onSelectCandidate(candidate.id)}>
                    <p>{candidate.name}</p>
                    {/* Display other relevant candidate details */}
                </div>
            ))}
        </div>
    );
};

export default CandidateList;
