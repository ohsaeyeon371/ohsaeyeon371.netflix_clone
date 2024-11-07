import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  return (
    <div className="wishlist">
      <h2>내가 찜한 영화</h2>
      <div className="wishlist__movies">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => (
            <div key={movie.id} className="wishlist__movie">
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
    </div>
  );
};

export default Wishlist;
