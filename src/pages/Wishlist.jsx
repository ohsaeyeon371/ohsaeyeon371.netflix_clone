import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import Modal from '../components/Modal'; // 모달 컴포넌트 import

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handleRemoveFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="wishlist">
      <h2>내가 찜한 영화</h2>
      <div className="wishlist__movies">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => (
            <div
              key={movie.id}
              className="wishlist__movie"
              onClick={() => handlePosterClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <h3>{movie.title || movie.name}</h3>
            </div>
          ))
        ) : (
          <p>찜한 영화가 없습니다.</p>
        )}
      </div>
      {selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          isInWishlist={true} // 항상 true로 표시하여 '찜됨' 상태를 나타냄
        />
      )}
    </div>
  );
};

export default Wishlist;
