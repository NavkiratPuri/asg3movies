import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  },);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/mongodb');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
