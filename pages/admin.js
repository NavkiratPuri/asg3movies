// pages/admin.js

import React, { useState, useEffect } from 'react';
import Navbar from '../app/components/Navbar';
import Footer from '../app/components/Footer';
import Movies from '../app/components/Movies';
import AddEntryForm from '../app/components/AddEntryForm';
import EditEntryForm from '../app/components/EditEntryForm';
import DeleteEntryForm from '../app/components/DeleteEntryForm';
import  "../app/globals.css";

const Admin = () => {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);

    const handleDeleteEntry = async (id) => {
        const response = await fetch('/api/deleteEntry', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (response.ok) {
            setEntries(entries.filter((entry) => entry._id !== id));
        } else {
            console.error(data.error);
        }
    };

    const handleAddEntry = (newEntry) => {
        console.log('New entry added:', newEntry);
        setEntries([...entries, newEntry]);
    };

    const handleEditEntry = (entry) => {
        setSelectedEntry(entry);
    };

    const handleCancelEdit = () => {
        setSelectedEntry(null);
    };

    const handleShowDeleteForm = (entry) => {
        setSelectedEntry(entry);
        setIsDeleteFormVisible(true);
    };

    const handleCancelDelete = () => {
        setSelectedEntry(null);
        setIsDeleteFormVisible(false);
    };

    return (
        <div class='text-center'>            
            <Navbar />
            <h1 class='m-4 text-3xl font-bold text-gray-800'>Admin</h1>
            <AddEntryForm onAddEntry={handleAddEntry} />

            {selectedEntry && !isDeleteFormVisible && (
                <EditEntryForm
                    entry={selectedEntry}
                    onUpdateEntry={handleUpdateEntry}
                    onCancel={handleCancelEdit}
                />
            )}

            {selectedEntry && isDeleteFormVisible && (
                <DeleteEntryForm
                    entry={selectedEntry}
                    onDeleteEntry={handleDeleteEntry}
                    onCancel={handleCancelDelete}
                />
            )}
            <Movies
                entries={entries}
                onDeleteEntry={handleDeleteEntry}
                onEditEntry={handleEditEntry}
                onDeleteEntryForm={handleShowDeleteForm}
            />
            <Footer />
        </div>
    );
}

export default Admin;
