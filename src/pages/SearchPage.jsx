
import axios from 'axios';
import './SearchPage.css';
import { API_URL, API_KEY } from '../config/config';
import React, { useState, useEffect } from 'react';


const SearchPage = () => {
  const initialGenre = '';
  const initialRating = 0;

  const [genre, setGenre] = useState('initialGenre');
  const [rating, setRating] = useState('initialGenre');
  const [sort, setSort] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);

    // 초기 로딩 시 영화 데이터 가져오기
  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const response = await axios.get(
          `${API_URL}discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching initial movies:', error);
      }
    };

    fetchInitialMovies();
  }, []);
  
  // 초기화 함수
  const resetFilters = () => {
    setGenre(initialGenre);
    setRating(initialRating);
  };

  const handleSearch = async () => {
    let query = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko-KR`;

    if (genre) query += `&with_genres=${genre}`;
    if (rating) query += `&vote_average.gte=${rating}`;
    query += `&sort_by=${sort}`;

    try {
      const response = await axios.get(query);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="search-page">
      <h2>영화 검색</h2>
      <div className="dropdown-container">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">장르 (전체)</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="10751">Family</option>
        </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">평점 (전체)</option>
          <option value="9">9~10</option>
          <option value="8">8~9</option>
          <option value="7">7~8</option>
          <option value="6">6~7</option>
          <option value="5">5~6</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신 개봉일순</option>
          <option value="vote_average.desc">평점 높은순</option>
        </select>
        <button onClick={resetFilters}>초기화</button>
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="search-results">
        {movies.length > 0 ? (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="movie-poster"
                />
                <h3>{movie.title || movie.name}</h3>
                <p>평점: {movie.vote_average} / 10</p>
              </div>
            ))}
          </div>
        ) : (
          <p>옵션을 선택하고 검색하세요.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
