// login-project > src > components > LoginForm.jsx

import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import './LoginForm.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <h2 className="login-title">로그인</h2>

      <input
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />

      <input
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      {error && <p className="login-error">{error}</p>}

      <button type="submit" className="login-button">
        로그인
      </button>
    </form>
  );
}
