import React, { useState } from 'react';

const AddEntryForm = ({ onAddEntry }) => {

  const [title, setTitle] = useState('');
  const [actors, setActors] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/addEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, actors: actors.split(','), release_year: parseInt(releaseYear) }),
    });
    const data = await response.json();
    if (response.ok) {
      onAddEntry(data.entry);
      setTitle('');
      setActors('');
      setReleaseYear('');
    } else {
      console.error(data.error);
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Form</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Actors (comma-separated):</label>
      <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} required />

      <label>Release Year:</label>
      <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
