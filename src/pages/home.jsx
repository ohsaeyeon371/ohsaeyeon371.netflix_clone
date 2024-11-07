import React from 'react';
import Banner from '../components/Banner.jsx';
import MovieRow from '../components/MovieRow';
import { API_URL, API_KEY } from '../config/config';

const Home = () => {
  const apiKey = 'a788b64a1e85b53d1f19cb4b6b728a66';
  const baseUrl = 'https://a788b64a1e85b53d1f19cb4b6b728a66.themoviedb.org/3';
  const fetchUrl = `${baseUrl}/trending/movie/week?api_key=${apiKey}&language=ko-KR`;

  return (
    <div className="home">
      <Banner fetchUrl={fetchUrl} />
      <MovieRow title="인기 영화" fetchUrl={`${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR`} />
      <MovieRow title="최신 영화" fetchUrl={`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR`} />
      <MovieRow title="액션 영화" fetchUrl={`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28&language=ko-KR`} />
    </div>
  );
};

export default Home;
