// src/components/StatisticsComponent.js

import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const StatisticsComponent = () => {
    const [metrics, setMetrics] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch metrics data from Firestore
        const fetchMetrics = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'metrics'));
                setMetrics(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                setError('Error fetching metrics');
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div>
            <h1>Interview Process Metrics</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.map(metric => (
                        <tr key={metric.id}>
                            <td>{metric.name}</td>
                            <td>{metric.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatisticsComponent;
