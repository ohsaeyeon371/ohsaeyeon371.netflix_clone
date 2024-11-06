import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MovieRow.css';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);

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
    const scrollAmount = sliderRef.current.clientWidth; // 한 번에 슬라이드할 양
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(sliderRef.current.scrollWidth - sliderRef.current.clientWidth, scrollPosition + scrollAmount);
    setScrollPosition(newPosition);
    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__container">
        <button className="scroll-button left" onClick={() => handleScroll('left')}>&lt;</button>
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
        <button className="scroll-button right" onClick={() => handleScroll('right')}>&gt;</button>
      </div>
    </div>
  );
};

export default MovieRow;
