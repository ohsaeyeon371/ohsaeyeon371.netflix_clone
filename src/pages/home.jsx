import React from 'react';
import MovieRow from './components/MovieRow';

const Home = () => {
  const apiKey = 'YOUR_TMDB_API_KEY';
  const baseUrl = 'https://api.themoviedb.org/3';

  return (
  <>

    <div className="home">
      <MovieRow title="인기 영화" fetchUrl={`${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR`} />
      <MovieRow title="최신 영화" fetchUrl={`${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR`} />
      <MovieRow title="액션 영화" fetchUrl={`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28&language=ko-KR`} />
    </div>
    </>
  );

};

export default Home;
