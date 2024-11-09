import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Popular.css';
import { API_URL, API_KEY } from '../config/config';
import Modal from '../components/Modal'; // Modal 컴포넌트 import

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handlePosterClick = async (movie) => {
    try {
      const response = await axios.get(`${API_URL}movie/${movie.id}?api_key=${API_KEY}&language=ko-KR`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="popular">
      <h2>오늘 대한민국의 인기 콘텐츠</h2>
      <div className="popular__controls">
        <button className="arrow left" onClick={() => handleScroll('left')}>〈</button>
        <button className="arrow right" onClick={() => handleScroll('right')}>〉</button>
      </div>
      <div className="popular__container" ref={sliderRef}>
        {movies.map((movie, index) => (
          <div key={movie.id} className="popular__movie" onClick={() => handlePosterClick(movie)}>
            <div className="popular__rank">{index + 1}</div>
            <img
              className="popular__poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
            <div className="popular__info">
              <p className="popular__title">{movie.title || movie.name}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)} // 모달 닫기 기능
        />
      )}
    </div>
  );
};

export default Popular;
