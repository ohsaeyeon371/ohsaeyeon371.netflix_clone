import React from 'react';
import './Modal.css';

const Modal = ({ movie, onClose, onAddToWishlist, onRemoveFromWishlist, isInWishlist }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>X</button>
        <img
          className="modal__image"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || movie.name}
        />
        <div className="modal__info">
          <h2>{movie.title || movie.name}</h2>
          <p>{movie.overview}</p>
          <p><strong>개봉일자:</strong> {movie.release_date}</p>
          <p><strong>평점:</strong> {movie.vote_average} / 10</p>
          <div className="modal__buttons">
            <button className="modal__button">재생</button>
            {isInWishlist ? (
              <button className="modal__button modal__button--active" onClick={() => onRemoveFromWishlist(movie.id)}>
                찜됨
              </button>
            ) : (
              <button className="modal__button" onClick={() => onAddToWishlist(movie)}>
                찜
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;