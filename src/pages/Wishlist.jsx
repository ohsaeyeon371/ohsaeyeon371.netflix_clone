import React, { useState } from 'react';
import './Wishlist.css';

const Wishlist = ({ wishlist = [], onRemoveFromWishlist }) => { // 기본값으로 빈 배열 설정
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="wishlist">
      <h2>내가 찜한 리스트</h2>
      <div className="wishlist__grid">
        {currentItems.length === 0 ? (
          <p>찜한 영화가 없습니다.</p>
        ) : (
          currentItems.map((movie) => (
            <div key={movie.id} className="wishlist__item">
              <img
                className="wishlist__poster"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <button onClick={() => onRemoveFromWishlist(movie.id)} className="wishlist__remove-button">
                찜 취소
              </button>
            </div>
          ))
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="wishlist__pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`wishlist__page-button ${currentPage === page + 1 ? 'active' : ''}`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
