import React, { useState } from 'react';
import axios from 'axios';
import MovieRow from '../components/MovieRow';
import SearchForm from '../components/SearchForm';
import './SearchPage.css';

const SearchPage = () => {
  const apiKey = 'YOUR_TMDB_API_KEY';
  const baseUrl = 'https://api.themoviedb.org/3';

  const [movies, setMovies] = useState([]);

  const handleSearch = async (genre, rating, language) => {
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
    <div className="search-page">
      <h2>선호하는 설정을 선택하세요</h2>
      <SearchForm onSearch={handleSearch} />
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
