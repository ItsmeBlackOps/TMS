// src/components/TaskForm.js

import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData }) => {
    const [taskData, setTaskData] = useState({ title: '', status: '' });

    useEffect(() => {
        if (initialData) {
            setTaskData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input name="title" value={taskData.title} onChange={handleChange} />
            </label>
            <label>
                Status:
                <input name="status" value={taskData.status} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TaskForm;
