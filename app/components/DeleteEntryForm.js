import React, { useState, useEffect } from 'react';

const DeleteEntryForm = ({ entry, onDeleteEntry, onCancel }) => {
  const [title, setTitle] = useState(entry ? entry.title : ''); // State for the title of the entry
  const [actors, setActors] = useState(entry ? entry.actors.join(', ') : ''); // State for the actors of the entry
  const [releaseYear, setReleaseYear] = useState(entry ? entry.release_year : ''); // State for the release year of the entry

  useEffect(() => {
    if (entry) {
      setTitle(entry.title); // Set the title state to the entry's title
      setActors(entry.actors.join(', ')); // Set the actors state to the entry's actors joined by comma
      setReleaseYear(entry.release_year); // Set the release year state to the entry's release year
    }
  }, [entry]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movies/${entry._id}`, {
        method: 'DELETE', // Send a DELETE request to the API endpoint for deleting the entry
      });
      if (response.ok) {
        onDeleteEntry(entry._id); // Call the onDeleteEntry function with the entry's ID to remove it from the list
      } else {
        console.error('Error deleting entry:', response.statusText); // Log an error message if the deletion request fails
      }
    } catch (error) {
      console.error('Error deleting entry:', error.message); // Log an error message if an exception occurs during deletion
    }
  };

  return (
    // this form is not displayed
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
