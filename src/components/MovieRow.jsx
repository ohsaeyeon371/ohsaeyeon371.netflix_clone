import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieRow.css';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="movie-row__poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
