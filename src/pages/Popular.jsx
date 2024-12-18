import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Popular.css';
import { API_URL, API_KEY } from '../config/config';
import Modal from '../components/Modal'; // Modal 컴포넌트 import
import Loading from '../components/Loading'; // Loading 컴포넌트 import

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태
  const [wishlist, setWishlist] = useState([]); // 찜 목록 상태
  const sliderRef = useRef(null);
  const [isPageLoading, setIsPageLoading] = useState(true); // 페이지 전체 로딩 상태

  // 컴포넌트가 마운트될 때 localStorage에서 wishlist 불러오기
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPageLoading(true); // 페이지 로딩 시작
        const response = await axios.get(
          `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setIsPageLoading(false); // 데이터 로딩 완료 후 상태 해제
      }
    };

    fetchData();
  }, []);

  const handleAddToWishlist = (movie) => {
    // 중복 확인 후 추가
    if (!wishlist.some((item) => item.id === movie.id)) {
      const updatedWishlist = [...wishlist, movie];
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const handleRemoveFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

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

  if (isPageLoading) {
    return <Loading />; // 페이지 전체 로딩 중일 때 로딩 컴포넌트 렌더링
  }

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
            <div className="popular__rank">{index + 1}</div> {/* 순위 표시 */}
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
          onAddToWishlist={handleAddToWishlist} // 찜 추가 기능 전달
          onRemoveFromWishlist={handleRemoveFromWishlist} // 찜 제거 기능 전달
          isInWishlist={wishlist.some((item) => item.id === selectedMovie.id)} // 찜 상태 확인
        />
      )}
    </div>
  );
};

export default Popular;
