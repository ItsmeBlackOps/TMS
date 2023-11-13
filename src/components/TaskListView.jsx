// src/components/TaskListView.js

import React from 'react';

const TaskListView = ({ tasks, onSelectTask, onEditTask }) => {
    return (
        <div>
            <h2>Tasks List</h2>
            {tasks.map(task => (
                <div key={task.id}>
                    {task.title} - {task.status}
                    <button onClick={() => onSelectTask(task.id)}>View</button>
                    <button onClick={() => onEditTask(task.id)}>Edit</button>
                </div>
            ))}
        </div>
    );
};

export default TaskListView;
