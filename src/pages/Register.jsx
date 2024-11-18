import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 컴포넌트 추가
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
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        password,
        name,
      });

      if (response.status === 201 || response.data.success) {
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
      </form>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p> {/* 로그인 페이지로 이동하는 링크 추가 */}
    </div>
  );
};

export default Register;
