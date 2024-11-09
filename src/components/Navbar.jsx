import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">로고</div>
      <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
        <ul>
          <li>홈</li>
          <li>시리즈</li>
          <li>영화</li>
          <li>NEW! 요즘 대세 콘텐츠</li>
          <li>내가 찜한 리스트</li>
        </ul>
      </div>
      <button className="navbar__toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
