import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import "./ChangePassword.css";

export default function ChangePassword() {
  const error = useAuthStore((s) => s.error);
  const changingPassword = useAuthStore((s) => s.changingPassword);
  const changePassword = useAuthStore((s) => s.changePassword);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  if (!changingPassword) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    await changePassword(currentPassword, newPassword, checkNewPassword);
  };

  return (
    <form onSubmit={onSubmit} className="password-form">
      <input
        placeholder="현재 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="password-input"
        type="password"
      />

      <input
        placeholder="새 비밀번호 (6자 이상, 숫자 포함)"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="password-input"
        type="password"
      />

      <input
        placeholder="새 비밀번호 확인"
        value={checkNewPassword}
        onChange={(e) => setCheckNewPassword(e.target.value)}
        className="password-input"
        type="password"
      />

      {error && <p className="password-error">{error}</p>}
      <button type="submit" className="password-button">
        변경하기
      </button>
    </form>
  );
}
