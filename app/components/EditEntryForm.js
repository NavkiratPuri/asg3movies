import React, { useState, useEffect } from 'react';

const EditEntryForm = ({ entry, onUpdateEntry, onCancel }) => {
    const [title, setTitle] = useState(entry ? entry.title : '');
    const [actors, setActors] = useState(entry ? entry.actors.join(', ') : '');
    const [releaseYear, setReleaseYear] = useState(entry ? entry.release_year : '');

    useEffect(() => {
        if (entry) {
            setTitle(entry.title);
            setActors(entry.actors.join(', '));
            setReleaseYear(entry.release_year);
        }
    }, [entry]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/editEntry';
        const method = 'PUT';
        const body = JSON.stringify({
            id: entry._id,
            title,
            actors: actors.split(',').map(actor => actor.trim()),
            release_year: parseInt(releaseYear)
        });

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });
            const data = await response.json();
            if (response.ok) {
                onUpdateEntry(data.entry);
                console.log('Entry updated successfully:', data.entry);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating entry:', error);
        }
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit movie form</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Actors (comma-separated):</label>
            <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} required />

            <label>Release Year:</label>
            <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />

            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditEntryForm;
