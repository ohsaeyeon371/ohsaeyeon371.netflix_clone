import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banner.css';

const Banner = ({ fetchUrl }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl);
        const movies = response.data.results;
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return (
    movie && (
      <header
        className="banner"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: 'center center',
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
          <div className="banner__buttons">
            <button className="banner__button">재생</button>
            <button className="banner__button">상세 정보</button>
          </div>
          <p className="banner__description">{movie.overview}</p>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    )
  );
};

export default Banner;
