import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MovieRow.css';
import Modal from './Modal'; // 새로운 모달 컴포넌트 import
import { API_URL, API_KEY } from '../config/config'; 

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 정보 상태
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

  const handlePosterClick = async (movieId) => {
    try {
      const response = await axios.get(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__container">
        <div className="movie-row__posters" ref={sliderRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="movie-row__poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              onClick={() => handlePosterClick(movie.id)} // 포스터 클릭 시 영화 정보 가져오기
            />
          ))}
        </div>
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
