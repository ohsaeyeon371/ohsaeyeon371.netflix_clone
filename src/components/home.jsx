import React, { useState, useEffect } from 'react';
import Banner from './banner'
import MovieRow from './movierow';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import URLService from '../../util/movie/URL';

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

    const handleScroll = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
