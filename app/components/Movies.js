import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEntryForm from './EditEntryForm';

const Movies = () => {
  const [data, setData] = useState([]); // State for storing movie data
  const [deletedCount, setDeletedCount] = useState(0); // State for tracking deleted count
  const [selectedMovie, setSelectedMovie] = useState(null); // State for storing selected movie
  const [isEditFormVisible, setIsEditFormVisible] = useState(false); // State for controlling edit form visibility

  useEffect(() => {
    fetchData(); // Fetch data when deletedCount changes
  }, [deletedCount]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/mongodb'); // Fetch movie data from API
      setData(res.data); // Update movie data state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onDeleteEntry = async (id) => {
    try {
      await axios.delete(`/api/movies`, { data: { id } }); // Delete movie entry
      setDeletedCount((prevCount) => prevCount + 1); // Increment deleted count
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie); // Set selected movie for editing
    setIsEditFormVisible(true); // Show edit form
  };

  const handleSaveEditedMovie = async (updatedEntry) => {
    try {
      await axios.put(`/api/editEntry/${updatedEntry._id}`, updatedEntry); // Update movie entry
      console.log('Movie updated successfully:', updatedEntry);
      fetchData(); // Fetch updated data
      handleCancelEdit(); // Hide edit form
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedMovie(null); // Clear selected movie
    setIsEditFormVisible(false); // Hide edit form
  };

  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>; // Display message if no data available
  }

  return (
    <div class='text-center mx-auto max-w-4xl'>
      <h1  class='m-4 text-3xl font-bold text-gray-800'>MongoDB Data:</h1>
      <ul class='list-disc list-inside bg-white rounded-lg shadow-md p-6'>
        {data.map((movie, index) => (
          <li key={index} class='border-b last:border-none py-4'>
            <strong>Title:</strong> {movie.title}<br /> {/* Display movie title */}
            <strong>Actors:</strong> {movie.actors.join(', ')}<br /> {/* Display movie actors */}
            <strong>Release Year:</strong> {movie.release_year}<br /> {/* Display movie release year */}
            <button onClick={() => handleEditMovie(movie)} class="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button> {/* Edit button */}

            <button onClick={() => onDeleteEntry(movie._id)} class="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button> {/* Delete button */}
            <br />
          </li>
        ))}
      </ul>
      {isEditFormVisible && selectedMovie && (
        <EditEntryForm
          entry={selectedMovie}
          onSave={handleSaveEditedMovie}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Movies;
