import React, { useState, useEffect } from 'react';

const DeleteEntryForm = ({ entry, onDeleteEntry, onCancel }) => {
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movies/${entry._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDeleteEntry(entry._id);
      } else {
        console.error('Error deleting entry:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting entry:', error.message);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <h1>Delete movie form</h1>
      <label>Title:</label>
      <input type="text" value={title} disabled />

      <label>Actors (comma-separated):</label>
      <input type="text" value={actors} disabled />

      <label>Release Year:</label>
      <input type="number" value={releaseYear} disabled />

      <button type="submit">Delete</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default DeleteEntryForm;
