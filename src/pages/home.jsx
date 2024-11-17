import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import { API_URL, API_KEY } from '../config/config'; 
import Loading from '../components/Loading';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 전체 데이터를 불러오고 나서 로딩 상태를 false로 변경
    const loadData = async () => {
      // 데이터를 fetch하거나, API 호출 등 로딩이 필요한 작업 수행
      setTimeout(() => { // 예시: 데이터를 불러오는데 걸리는 시간 시뮬레이션
        setIsLoading(false);
      }, 2000);
    };
    loadData();
  }, []);

  return (
    <div className="home">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* 대표 이미지를 위한 배너 */}
          <Banner fetchUrl={`${API_URL}trending/movie/week?api_key=${API_KEY}&language=ko-KR`} />
          
          {/* 영화 리스트 */}
          <MovieRow title="인기 영화" fetchUrl={`${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR`} />
          <MovieRow title="최신 영화" fetchUrl={`${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR`} />
          <MovieRow title="액션 영화" fetchUrl={`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=28&language=ko-KR`} />
          <MovieRow title="코미디 영화" fetchUrl={`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=35&language=ko-KR`} />
        </>
      )}
    </div>
  );
};

export default Home;
