// src/services/firestoreService.js

import { firestore } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const FirestoreService = {
    // Fetch all documents from a collection
    getAll: async (collectionName) => {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Add a document to a collection
    add: async (collectionName, data) => {
        return await addDoc(collection(firestore, collectionName), data);
    },

    // Update a document in a collection
    update: async (collectionName, id, data) => {
        const docRef = doc(firestore, collectionName, id);
        return await updateDoc(docRef, data);
    },

    // Delete a document from a collection
    delete: async (collectionName, id) => {
        const docRef = doc(firestore, collectionName, id);
        return await deleteDoc(docRef);
    }
};

export default FirestoreService;
