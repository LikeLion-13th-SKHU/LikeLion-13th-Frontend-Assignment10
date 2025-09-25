import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = useAuthStore((s) => s.changePassword);
  const isChangePassword = useAuthStore((s) => s.isChangePassword);
  const error = useAuthStore((s) => s.error);

  const onSubmit = async (e) => {
    e.preventDefault();
    await changePassword(nowPassword, newPassword, confirmPassword);
  };
  return (
    <div className="change-wrap">
      <h1 className="change-title">비밀번호 변경</h1>
      <form onSubmit={onSubmit} className="change-form">
        <h2 className="change-subtitle">비밀번호 변경</h2>
        <input
          placeholder="현재 비밀번호"
          type="password"
          value={nowPassword}
          onChange={(e) => setNowPassword(e.target.value)}
          className="password-input"
        />
        <input
          placeholder="새 비밀번호 (6자 이상, 숫자 포함)"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="password-input"
        />
        <input
          placeholder="새 비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="password-input"
        />

        {error && <p className="login-error">{error}</p>}
        {isChangePassword && (
          <p className="success-message">비밀번호가 변경되었습니다.</p>
        )}

        <button type="submit" className="change-button">
          변경하기
        </button>
      </form>
    </div>
  );
}
