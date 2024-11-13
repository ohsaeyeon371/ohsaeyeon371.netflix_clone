import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate 초기화

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserIconClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">로고</div>
      <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
        <ul>
          <li>
            <Link to="/" className="navbar__link">홈</Link> {/* 홈 페이지로 이동 */}
          </li>
          <li>
            <Link to="/popular" className="navbar__link">NEW! 요즘 대세 콘텐츠</Link> {/* Popular 페이지로 이동 */}
          </li>
          <li>
            <Link to="/search" className="navbar__link">찾아보기</Link> {/* SearchPage로 이동 */}
          </li>
          <li>
            <Link to="/wishlist" className="navbar__link">내가 찜한 리스트</Link> {/* Wishlist 페이지로 이동 */}
          </li>
          <li>
            <FontAwesomeIcon 
              icon={faUser} 
              className="user-icon" 
              onClick={handleUserIconClick} // 직접 navigate 사용
            />
          </li>
        </ul>
      </div>
      
      <button className="navbar__toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
