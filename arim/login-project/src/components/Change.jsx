// src/components/Change.jsx

import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import './LoginForm.css';

export default function ChangePasswordForm({ onCancel }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 👇 이렇게 필요한 값들을 각각 선택해서 가져오도록 수정합니다.
  const changePassword = useAuthStore((s) => s.changePassword);
  const error = useAuthStore((s) => s.error);
  const successMessage = useAuthStore((s) => s.successMessage);
  const clearMessages = useAuthStore((s) => s.clearMessages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(currentPassword, newPassword, confirmPassword);
  };

  const handleClose = () => {
    clearMessages();
    onCancel();
  };

  if (successMessage) {
    return (
      <div className="login-form">
        <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>
        <button onClick={handleClose} className="login-button">
          닫기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">비밀번호 변경</h2>

      <input
        type="password"
        placeholder="현재 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="새 비밀번호 (6자 이상, 숫자 포함)"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="login-input"
      />

      {error && <p className="login-error">{error}</p>}

      <button type="submit" className="login-button">
        변경하기
      </button>
    </form>
  );
}
