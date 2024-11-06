
import React from 'react';
import Banner from './components/banner.jsx';

const Home = () => {
  const movie = {
    title: "엄마친구아들",
    overview: "《갯마을 차차차》의 유제원 감독이 연출한 코미디 드라마. 인생 새출발을 위해 본가로 돌아온 여자가 옛 친구와 다시 얽히며 벌어지는 일을 그린다.",
    backdrop_path: "/example-backdrop.jpg" // 실제 이미지 URL을 넣어주세요
  };

  return (
    <div className="home">
      <Banner movie={movie} />
    </div>
  );
};

export default Home;
