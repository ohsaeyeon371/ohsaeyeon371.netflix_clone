import React from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import { API_URL, API_KEY } from '../config/config'; 

const Home = () => {
  return (
    <div className="home">
      {/* 대표 이미지를 위한 배너 */}
      <Banner fetchUrl={`${API_URL}trending/movie/week?api_key=${API_KEY}&language=ko-KR`} />
      
      {/* 영화 리스트 */}
      <MovieRow title="인기 영화" fetchUrl={`${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR`} />
      <MovieRow title="최신 영화" fetchUrl={`${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR`} />
      <MovieRow title="액션 영화" fetchUrl={`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=28&language=ko-KR`} />
      <MovieRow title="코미디 영화" fetchUrl={`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=35&language=ko-KR`} />
    </div>
  );
};

export default Home;
