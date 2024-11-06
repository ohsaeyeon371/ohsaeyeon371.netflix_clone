import React from 'react';
import './Banner.css';

const Banner = ({ movie }) => {
  const backdropUrl = movie ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';

  return (
    <div className="banner" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="banner-content">
        <h1 className="banner-title">{movie.title}</h1>
        <p className="banner-overview">{movie.overview}</p>
        <div className="banner-buttons">
          <button className="play-btn">재생</button>
          <button className="info-btn">상세 정보</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
