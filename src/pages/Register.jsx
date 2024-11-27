import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 기존 사용자 목록 불러오기
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 이메일 중복 확인
    const isEmailUsed = users.some((user) => user.email === email);
    if (isEmailUsed) {
      alert('이미 사용 중인 이메일입니다.');
      return;
    }

    // 새로운 사용자 추가
    const newUser = { email, password, name };
    users.push(newUser);

    // 로컬스토리지에 저장
    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입 성공!');
    navigate('/login');
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
      </p>
    </div>
  );
};

export default Register;
