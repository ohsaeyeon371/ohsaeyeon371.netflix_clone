import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MovieRow.css';
import { API_URL, API_KEY } from '../config/config';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const handleScroll = (direction) => {
    const scrollAmount = 300; // 한 번 스크롤할 때 이동할 양
    const newScrollPosition = direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    sliderRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__container">
        <button className="movie-row__arrow left" onClick={() => handleScroll('left')}>&lt;</button>
        <div className="movie-row__posters" ref={sliderRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="movie-row__poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          ))}
        </div>
        <button className="movie-row__arrow right" onClick={() => handleScroll('right')}>&gt;</button>
      </div>
    </div>
  );
};

export default MovieRow;
