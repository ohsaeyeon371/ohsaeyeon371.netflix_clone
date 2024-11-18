import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === email && userData.password === password) {
        alert('로그인 성공!');
        navigate('/'); // 로그인 성공 시 홈 페이지로 이동
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } else {
      alert('등록된 사용자가 없습니다.');
    }
  };
  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">로그인</button>
      </form>
      <div className="register-link">
        <p>계정이 없으신가요?</p>
        <Link to="/register" className="register-button">회원가입</Link>
      </div>
    </div>
  );
};

export default Login;
