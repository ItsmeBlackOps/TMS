// src/components/TaskDetailsView.js

import React from 'react';

const TaskDetailsView = ({ task }) => {
    return (
        <div>
            <h2>Task Details</h2>
            <p>Title: {task.title}</p>
            <p>Status: {task.status}</p>
            {/* More task details */}
        </div>
    );
};

export default TaskDetailsView;
