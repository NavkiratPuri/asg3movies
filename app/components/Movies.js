import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEntryForm from './EditEntryForm';

const Movies = () => {
  const [data, setData] = useState([]);
  const [deletedCount, setDeletedCount] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [deletedCount]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/mongodb');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onDeleteEntry = async (id) => {
    try {
      await axios.delete(`/api/movies`, { data: { id } });
      setDeletedCount((prevCount) => prevCount + 1);
      fetchData();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setIsEditFormVisible(true);
  };

  const handleSaveEditedMovie = async (updatedEntry) => {
    try {
      await axios.put(`/api/editEntry/${updatedEntry._id}`, updatedEntry);
      console.log('Movie updated successfully:', updatedEntry);
      fetchData();
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedMovie(null);
    setIsEditFormVisible(false);
  };

  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  return (
    <div class='text-center mx-auto max-w-4xl'>
      <h1  class='m-4 text-3xl font-bold text-gray-800'>MongoDB Data:</h1>
      <ul class='list-disc list-inside bg-white rounded-lg shadow-md p-6'>
        {data.map((movie, index) => (
          <li key={index} class='border-b last:border-none py-4'>
            <strong>Title:</strong> {movie.title}<br />
            <strong>Actors:</strong> {movie.actors.join(', ')}<br />
            <strong>Release Year:</strong> {movie.release_year}<br />
            <button onClick={() => handleEditMovie(movie)} class="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>

            <button onClick={() => onDeleteEntry(movie._id)} class="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
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
