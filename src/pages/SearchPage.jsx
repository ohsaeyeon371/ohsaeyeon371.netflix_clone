import React, { useState } from 'react';
import axios from 'axios';
import MovieRow from '../components/MovieRow';
// import SearchForm from '../components/SearchForm';
import './SearchPage.css';
import { API_URL, API_KEY } from '../config/config';

const SearchPage = () => {
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    let query = `${API_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${sort}`;

    if (genre) query += `&with_genres=${genre}`;
    if (rating) query += `&vote_average.gte=${rating}`;
    if (language) query += `&with_original_language=${language}`;

    try {
      const response = await axios.get(query);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleReset = () => {
    setGenre('');
    setRating('');
    setLanguage('');
    setSort('popularity.desc');
    setMovies([]);
  };

  return (
    <div className="search-page">
      <h2>선호하는 설정을 선택하세요</h2>
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
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">언어 (전체)</option>
          <option value="en">영어</option>
          <option value="ko">한국어</option>
          <option value="ja">일본어</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popularity.desc">인기순</option>
          <option value="release_date.desc">최신 개봉일순</option>
          <option value="vote_average.desc">평점 높은순</option>
        </select>
        <button onClick={handleSearch}>검색</button>
        <button onClick={handleReset}>초기화</button>
      </div>
      <div className="search-results">
        {movies.length > 0 ? (
          <MovieRow title="검색 결과" movies={movies} />
        ) : (
          <p>영화를 찾기 위해 옵션을 선택하세요.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;









