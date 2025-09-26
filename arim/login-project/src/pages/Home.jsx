// src/pages/Home.jsx

import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import LoginStatus from '../components/LoginStatus';
import ChangePasswordForm from '../components/Change';
import { useAuthStore } from '../stores/authStore';
import './Home.css';

export default function Home() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const clearMessages = useAuthStore((s) => s.clearMessages);

  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowChangePassword(false);
      clearMessages();
    }
  }, [isLoggedIn, clearMessages]);

  const handleChangePasswordClick = () => {
    clearMessages();
    setShowChangePassword(true);
  };

  const handleCancelChangePassword = () => {
    setShowChangePassword(false);
  };

  return (
    <div className="home-page">
      <h1 className="home-title">홈</h1>
      <LoginStatus />

      {isLoggedIn && (
        <>
          {!showChangePassword ? (
            <>
              <p className="home-text">로그인 완료!</p>
              <button
                onClick={handleChangePasswordClick}
                className="login-button"
              >
                비밀번호 변경
              </button>
            </>
          ) : (
            <ChangePasswordForm onCancel={handleCancelChangePassword} />
          )}
        </>
      )}

      {!isLoggedIn && <LoginForm />}
    </div>
  );
}
