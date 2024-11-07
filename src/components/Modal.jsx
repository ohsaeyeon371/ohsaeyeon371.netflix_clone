import React from 'react';
import './Modal.css';

const Modal = ({ movie, onClose, onAddToWishlist }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview}</p>
        {movie.number_of_episodes && (
          <p>총 {movie.number_of_episodes} 화</p>
        )}
        <div className="modal__buttons">
          <button onClick={onAddToWishlist} className="modal__button">찜</button> {/* 찜 버튼 추가 */}
          <button onClick={onClose} className="modal__close">닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
