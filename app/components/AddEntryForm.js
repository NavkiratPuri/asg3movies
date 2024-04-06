import React, { useState } from 'react';

const AddEntryForm = ({ onAddEntry }) => {

  const [title, setTitle] = useState(''); // State for storing the title
  const [actors, setActors] = useState(''); // State for storing the actors
  const [releaseYear, setReleaseYear] = useState(''); // State for storing the release year

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/addEntry', { // Make a POST request to the '/api/addEntry' endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, actors: actors.split(','), release_year: parseInt(releaseYear) }), // Convert the data to JSON format
    });
    const data = await response.json(); // Parse the response data as JSON
    if (response.ok) {
      onAddEntry(data.entry); // Call the onAddEntry function with the new entry data
      setTitle(''); // Reset the title state
      setActors(''); // Reset the actors state
      setReleaseYear(''); // Reset the release year state
    } else {
      console.error(data.error); // Log the error message to the console
    }
    window.location.reload(); // Reload the page
  };

  return (
    <form onSubmit={handleSubmit} class="max-w-md mx-auto my-10 p-8 bg-blue-100 shadow-md rounded-lg">
      <h1 class="text-xl font-semibold mb-6">Add Form</h1>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /> {/* Input field for the title */}
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Actors (comma-separated):</label>
        <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} required /> {/* Input field for the actors */}
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Release Year:</label>
        <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required /> {/* Input field for the release year */}
      </div>

      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Entry</button> {/* Submit button */}
    </form>
  );
};

export default AddEntryForm;
