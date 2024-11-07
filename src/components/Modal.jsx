import React from 'react';
import './Modal.css';

const Modal = ({ movie, onClose }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
        {movie.number_of_episodes && (
          <p>총 {movie.number_of_episodes} 화</p>
        )}
        <button onClick={onClose} className="modal__close">닫기</button>
      </div>
    </div>
  );
};

export default Modal;
