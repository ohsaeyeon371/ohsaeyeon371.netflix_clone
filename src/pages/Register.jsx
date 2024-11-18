import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
<<<<<<< HEAD
      const response = await axios.post('/api/register', {
=======
      const response = await axios.post('http://localhost:5000/api/register', {
        // 서버 URL을 정확하게 명시
>>>>>>> 373df204ff398588985a7d479f28aecfb3270dad
        email,
        password,
        name,
      });
<<<<<<< HEAD

      if (response.data.success) {
=======
      

      if (response.status === 201 || response.data.success) {
>>>>>>> 373df204ff398588985a7d479f28aecfb3270dad
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        alert('회원가입 실패: ' + (response.data.message || '알 수 없는 오류'));
      }
      
    } catch (error) {
      console.error('회원가입 오류:', error.response ? error.response.data : error.message);
      alert('회원가입 중 오류가 발생했습니다.');
    }
    
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
<<<<<<< HEAD
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <label htmlFor="confirmPassword">비밀번호 확인:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button">회원가입</button>
=======
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
>>>>>>> 373df204ff398588985a7d479f28aecfb3270dad
      </form>
    </div>
  );
};

export default Register;
