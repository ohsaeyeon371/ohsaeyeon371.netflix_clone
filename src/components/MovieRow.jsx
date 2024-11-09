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
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // localStorage에서 찜 목록 불러오기
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

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

  const handleAddToWishlist = (movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleRemoveFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };
  
  const handleScroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 300; // 한 번에 스크롤할 픽셀 수

    if (direction === 'left') {
      setScrollPosition((prevPosition) => {
        const newPosition = Math.max(prevPosition - scrollAmount, 0);
        slider.scrollTo({
          left: newPosition,
          behavior: 'smooth',
        });
        return newPosition;
      });
    } else {
      setScrollPosition((prevPosition) => {
        const newPosition = Math.min(
          prevPosition + scrollAmount,
          slider.scrollWidth - slider.clientWidth
        );
        slider.scrollTo({
          left: newPosition,
          behavior: 'smooth',
        });
        return newPosition;
      });
    }
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
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          isInWishlist={wishlist.some((item) => item.id === selectedMovie.id)}
        />
      )}
    </div>
  );
};

export default MovieRow;
