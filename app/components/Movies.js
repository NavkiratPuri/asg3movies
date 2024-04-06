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
    <div>
      <h1>MongoDB Data:</h1>
      <ul>
        {data.map((movie, index) => (
          <li key={index}>
            <strong>Title:</strong> {movie.title}<br />
            <strong>Actors:</strong> {movie.actors.join(', ')}<br />
            <strong>Release Year:</strong> {movie.release_year}<br />
            <button onClick={() => handleEditMovie(movie)}>Edit</button>
            <button onClick={() => onDeleteEntry(movie._id)}>Delete</button>
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
