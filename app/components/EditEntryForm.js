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
        <form onSubmit={handleSubmit} class="max-w-md mx-auto my-10 p-8 bg-blue-100 shadow-md rounded-lg">
            <h1 class="text-xl font-semibold mb-6">Edit movie form</h1>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Actors (comma-separated):</label>
                <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} required />
            </div>

            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2">Release Year:</label>
                <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
            </div>

            <button type="submit" class="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
            <button type="button" onClick={onCancel} class="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
        </form>
    );
};

export default EditEntryForm;
