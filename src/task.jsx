// src/components/Task.js

import React, { useState } from 'react';
import { firestore } from './firebase';  // Import Firestore

function Task() {
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firestore.collection('tasks').add({ name: task });
      alert('Task added!');
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Type:
        <input type="text" value={task} onChange={handleChange} />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default Task;
