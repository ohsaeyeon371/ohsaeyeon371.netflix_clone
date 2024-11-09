import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import Modal from '../components/Modal'; // Modal 컴포넌트 import

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 상태

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie); // 포스터 클릭 시 영화 정보 설정
  };

  const handleRemoveFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setSelectedMovie(null); // 모달을 닫음
  };

  return (
    <div className="wishlist">
      <h2>내가 찜한 영화</h2>
      <div className="wishlist__movies">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => (
            <div key={movie.id} className="wishlist__movie" onClick={() => handlePosterClick(movie)}>
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
          onClose={() => setSelectedMovie(null)} // 모달 닫기 기능
          onRemoveFromWishlist={handleRemoveFromWishlist}
          isInWishlist={true} // Wishlist에서 실행되므로 항상 true
        />
      )}
    </div>
  );
};

export default Wishlist;
