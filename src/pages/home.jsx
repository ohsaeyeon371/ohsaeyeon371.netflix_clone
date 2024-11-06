import React, { useState, useEffect, useRef } from 'react';
import Banner from './Banner';
import MovieRow from './MovieRow';
import URLService from '../../util/movie/URL';
import WishlistService from '../../util/movie/wishlist';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [popularMoviesUrl, setPopularMoviesUrl] = useState('');
  const [newReleasesUrl, setNewReleasesUrl] = useState('');
  const [actionMoviesUrl, setActionMoviesUrl] = useState('');

  const apiKey = localStorage.getItem('TMDb-Key') || '';
  const urlService = new URLService();

  useEffect(() => {
    setPopularMoviesUrl(urlService.getURL4PopularMovies(apiKey));
    setNewReleasesUrl(urlService.getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(urlService.getURL4GenreMovies(apiKey, '28'));
    loadFeaturedMovie();
  }, [apiKey]);

  const loadFeaturedMovie = async () => {
    const movie = await urlService.fetchFeaturedMovie(apiKey);
    setFeaturedMovie(movie);
  };

  return (
    <div className="home">
      <Banner movie={featuredMovie} />
      <MovieRow title="인기 영화" fetchUrl={popularMoviesUrl} />
      <MovieRow title="최신 영화" fetchUrl={newReleasesUrl} />
      <MovieRow title="액션 영화" fetchUrl={actionMoviesUrl} />
    </div>
  );
};

export default Home;
