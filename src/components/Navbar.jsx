import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li><Link to="/">홈</Link></li>
        <li><Link to="/popular">New!대세 콘텐츠</Link></li>
        <li><Link to="/search">찾아보기</Link></li>
        <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
