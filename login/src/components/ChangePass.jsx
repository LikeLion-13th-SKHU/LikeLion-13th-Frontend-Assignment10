import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import './ChangePass.css';

export default function ChangePass() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const changePassword = useAuthStore((s) => s.changePassword);
  const error = useAuthStore((s) => s.error);

  const [previousPw, setPreviousPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [localError, setLocalError] = useState("");
  const [message, setMessage] = useState("");

  if (!isLoggedIn) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setMessage("");

    if (!previousPw || !newPw || !confirmPw) {
      setLocalError("모든 칸을 입력해주세요.");
      return;
    }
    if (newPw !== confirmPw) {
      setLocalError("새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const ok = await changePassword(previousPw, newPw);
    if (ok) {
      setMessage("비밀번호가 변경되었습니다.");
      setPreviousPw("");
      setNewPw("");
      setConfirmPw("");
    }
  };

  return (
    <div className="home-page">
      <form onSubmit={onSubmit} className="login-form">
        <h2 className="login-title">비밀번호 변경</h2>

        <input
          type="password"
          placeholder="현재 비밀번호"
          value={previousPw}
          onChange={(e) => setPreviousPw(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="새 비밀번호 (6자 이상, 숫자 포함)"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className="login-input"
        />

        {(localError || error) && (
          <p className="login-error">{localError || error}</p>
        )}
        {message && <p>{message}</p>}

        <button type="submit" className="login-button">변경하기</button>
      </form>
    </div>
  );
}