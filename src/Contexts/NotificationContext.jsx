// src/contexts/NotificationContext.js

import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    // Set a notification with message and type ('error', 'info', 'success')
    const notify = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null); // Clear notification after 3 seconds
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            {notification && <Notification message={notification.message} type={notification.type} />}
        </NotificationContext.Provider>
    );
};

// Notification component that displays the message
const Notification = ({ message, type }) => {
    const styles = {
        // Define styles for different types of notifications
        error: { backgroundColor: 'red', color: 'white' },
        info: { backgroundColor: 'blue', color: 'white' },
        success: { backgroundColor: 'green', color: 'white' },
        // Common styles
        common: { padding: '10px', borderRadius: '5px', margin: '10px', position: 'fixed', bottom: '10px', right: '10px', zIndex: 1000 }
    };

    return (
        <div style={{ ...styles.common, ...styles[type] }}>
            {message}
        </div>
    );
};
