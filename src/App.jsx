import React, { useState } from 'react';
import TaskDistributionComponent from './components/TaskDistributionComponent';
import InterviewSchedulingComponent from './components/InterviewSchedulingComponent';
import FeedbackComponent from './components/FeedbackComponent';
import CandidateManagementComponent from './components/CandidateManagementComponent';
import StatisticsComponent from './components/StatisticsComponent';

const App = () => {
    const [activeComponent, setActiveComponent] = useState('taskDistribution');

    return (
        <div>
            <nav>
                <button onClick={() => setActiveComponent('taskDistribution')}>Task Distribution</button>
                <button onClick={() => setActiveComponent('interviewScheduling')}>Interview Scheduling</button>
                <button onClick={() => setActiveComponent('feedback')}>Feedback</button>
                <button onClick={() => setActiveComponent('candidateManagement')}>Candidate Management</button>
                <button onClick={() => setActiveComponent('statistics')}>Statistics</button>
            </nav>

            {activeComponent === 'taskDistribution' && <TaskDistributionComponent />}
            {activeComponent === 'interviewScheduling' && <InterviewSchedulingComponent />}
            {activeComponent === 'feedback' && <FeedbackComponent />}
            {activeComponent === 'candidateManagement' && <CandidateManagementComponent />}
            {activeComponent === 'statistics' && <StatisticsComponent />}
        </div>
    );
};

export default App;
