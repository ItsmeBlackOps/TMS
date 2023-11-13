// src/components/TaskManagementComponent.js

import React, { useState, useEffect } from 'react';
import FirestoreService from '../services/firestoreService';
import TaskListView from './TaskListView';
import TaskDetailsView from './TaskDetailsView';
import TaskForm from './TaskForm';

const TaskManagementComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await FirestoreService.getAll('tasks');
            setTasks(tasksData);
        };

        fetchTasks();
    }, []);

    const handleSelectTask = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        setSelectedTask(task);
        setIsEditing(false);
    };

    const handleEditTask = (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        setSelectedTask(task);
        setIsEditing(true);
    };

    const handleTaskSubmit = async (taskData) => {
        try {
            if (isEditing && selectedTask) {
                await FirestoreService.update('tasks', selectedTask.id, taskData);
            } else {
                await FirestoreService.add('tasks', taskData);
            }
        } catch (error) {
            console.error('Error managing task:', error);
            // Handle error appropriately
        }
        setSelectedTask(null);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Task Management</h1>
            <TaskListView tasks={tasks} onSelectTask={handleSelectTask} onEditTask={handleEditTask} />
            {selectedTask && !isEditing && <TaskDetailsView task={selectedTask} />}
            {(selectedTask && isEditing) || (!selectedTask && <TaskForm onSubmit={handleTaskSubmit} initialData={selectedTask} />)}
        </div>
    );
};

export default TaskManagementComponent;
