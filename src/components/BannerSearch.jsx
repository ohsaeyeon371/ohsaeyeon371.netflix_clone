import React, { useState } from 'react';
import axios from 'axios';
import MovieRow from '../components/MovieRow';
import './Search.css';

const Search = () => {
  const apiKey = 'YOUR_TMDB_API_KEY';
  const baseUrl = 'https://api.themoviedb.org/3';

  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');
  const [movies, setMovies] = useState([]);

  const genreOptions = {
    '장르 (전체)': '',
    'Action': 28,
    'Adventure': 12,
    'Comedy': 35,
    'Crime': 80,
    'Family': 10751,
  };

  const ratingOptions = {
    '평점 (전체)': '',
    '9~10': '9',
    '8~9': '8',
    '7~8': '7',
    '6~7': '6',
    '5~6': '5',
  };

  const languageOptions = {
    '언어 (전체)': '',
    '영어': 'en',
    '한국어': 'ko',
  };

  const handleSearch = async () => {
    let query = `${baseUrl}/discover/movie?api_key=${apiKey}&language=ko-KR`;
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

  return (
    <div className="search">
      <h2>선호하는 설정을 선택하세요</h2>
      <div className="search-options">
        <select onChange={(e) => setGenre(genreOptions[e.target.value])}>
          {Object.keys(genreOptions).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <select onChange={(e) => setRating(ratingOptions[e.target.value])}>
          {Object.keys(ratingOptions).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <select onChange={(e) => setLanguage(languageOptions[e.target.value])}>
          {Object.keys(languageOptions).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <button onClick={handleSearch}>검색</button>
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

export default Search;
