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
    <div class='text-center mx-auto max-w-4xl'>
      <h1 class='m-4 text-3xl font-bold text-gray-800'>Home Page</h1> 
      <h2 class='mb-4 text-2xl text-gray-700'>MongoDB Data:</h2>
      <ul class='list-disc list-inside bg-white rounded-lg  p-6'>
        {data.map((movie, index) => (
          <li key={index} class='border-b last:border-none py-4'>
            <strong>Title:</strong> {movie.title}<br />
            <strong>Actors:</strong> {movie.actors.join(', ')}<br/>
            <strong>Release Year:</strong> {movie.release_year}<br/>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
