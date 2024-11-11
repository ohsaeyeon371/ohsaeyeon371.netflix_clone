import React, { useState } from 'react';
import axios from 'axios';
import './SearchPage.css';
import { API_URL, API_KEY } from '../config/config';

const SearchPage = () => {
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    let query = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko-KR`;

    if (genre) query += `&with_genres=${genre}`;
    if (rating) query += `&vote_average.gte=${rating}`;

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
          <option value="9">9점 이상</option>
          <option value="8">8점 이상</option>
          <option value="7">7점 이상</option>
          <option value="6">6점 이상</option>
          <option value="5">5점 이상</option>
        </select>
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
