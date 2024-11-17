import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchPage.css';
import { API_URL, API_KEY } from '../config/config';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

const SearchPage = () => {
  const initialGenre = '';
  const initialRating = 0;

  const [genre, setGenre] = useState(initialGenre);
  const [rating, setRating] = useState(initialRating);
  const [sort, setSort] = useState('popularity.desc');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handleAddToWishlist = (movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handlePosterClick = async (movie) => {
    try {
      const response = await axios.get(
        `${API_URL}movie/${movie.id}?api_key=${API_KEY}&language=ko-KR`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const resetFilters = () => {
    setGenre(initialGenre);
    setRating(initialRating);
    setMovies([]);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    let query = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko-KR`;

    if (genre) query += `&with_genres=${genre}`;
    if (rating) query += `&vote_average.gte=${rating}`;
    query += `&sort_by=${sort}`;

    try {
      const response = await axios.get(query);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="search-results">
          {movies.length > 0 ? (
            <div className="movie-grid">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-item"
                  onClick={() => handlePosterClick(movie)}
                >
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
      )}
      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onAddToWishlist={handleAddToWishlist} // 함수 전달
          isInWishlist={wishlist.some((item) => item.id === selectedMovie.id)}
        />
      )}
    </div>
  );
};

export default SearchPage;
