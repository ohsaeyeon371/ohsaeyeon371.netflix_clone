import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MovieRow.css';
import Modal from './Modal'; // 상세 정보 모달 import
import { API_URL, API_KEY } from '../config/config';

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 정보 상태
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

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleScroll = (direction) => {
    const slider = sliderRef.current;
    const visibleWidth = slider.clientWidth; // 현재 보여지는 영역의 너비
    const totalWidth = slider.scrollWidth; // 전체 슬라이더의 너비

    let newScrollPosition;
    if (direction === 'left') {
      newScrollPosition = scrollPosition - visibleWidth; // 한 번에 보이는 영역만큼 왼쪽으로 스크롤
    } else {
      newScrollPosition = scrollPosition + visibleWidth; // 한 번에 보이는 영역만큼 오른쪽으로 스크롤
    }

    // 스크롤 위치가 최대값을 초과하지 않도록 제한
    newScrollPosition = Math.max(0, Math.min(newScrollPosition, totalWidth - visibleWidth));

    setScrollPosition(newScrollPosition);
    slider.scrollTo({
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
              onClick={() => handlePosterClick(movie)} // 포스터 클릭 시 영화 정보 가져오기
            />
          ))}
        </div>
        <button className="movie-row__arrow right" onClick={() => handleScroll('right')}>&gt;</button>
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

export default MovieRow;
