import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        alert('로그인 성공!');
        navigate('/');
      } else {
        alert('로그인 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
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
