import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import "../styles/PasswordChange.css";

export default function PasswordChange() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = useAuthStore((s) => s.changePassword);
  const error = useAuthStore((s) => s.error);

  const onSubmit = async (e) => {
    e.preventDefault();

    await changePassword(oldPassword, newPassword, confirmPassword);
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <form onSubmit={onSubmit} className="password-form">
        <p className="password-title">비밀번호 변경</p>
        <input
          className="password-input"
          type="text"
          value={oldPassword}
          placeholder="현재 비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          value={newPassword}
          placeholder="새 비밀번호 (6자 이상, 숫자 포함)"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="password-input"
          type="text"
          value={confirmPassword}
          placeholder="새 비밀번호 확인"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="password-error">{error}</p>}
        <button className="password-button" type="submit">
          변경하기
        </button>
      </form>
    </div>
  );
}
