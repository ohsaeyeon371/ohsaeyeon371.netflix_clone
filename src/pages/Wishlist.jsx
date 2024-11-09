import React, { useState } from 'react';
import './Wishlist.css';

const Wishlist = ({ wishlist = [], onRemoveFromWishlist }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeOverview = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="wishlist">
      <h2>내가 찜한 리스트</h2>
      <div className="wishlist__movies">
        {wishlist.length === 0 ? (
          <p>찜한 영화가 없습니다.</p>
        ) : (
          wishlist.map((movie) => (
            <div
              key={movie.id}
              className="wishlist__movie"
              onClick={() => handlePosterClick(movie)}
            >
              <img
                className="wishlist__poster"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
            </div>
          ))
        )}
      </div>
      {selectedMovie && (
        <div className="wishlist__overview">
          <div className="wishlist__overview-content">
            <h3>{selectedMovie.title || selectedMovie.name}</h3>
            <p>{selectedMovie.overview}</p>
            <button
              className="wishlist__button"
              onClick={() => {
                onRemoveFromWishlist(selectedMovie.id);
                closeOverview();
              }}
            >
              찜 취소
            </button>
            <button className="wishlist__button" onClick={closeOverview}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
