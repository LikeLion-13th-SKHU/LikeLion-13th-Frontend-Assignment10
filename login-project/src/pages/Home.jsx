import { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginStatus from "../components/LoginStatus";
import { useAuthStore } from "../stores/authStore";
import "../styles/Home.css";
import PasswordChange from "../components/PasswordChange";

export default function Home() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const passwordChanged = useAuthStore((s) => s.passwordChanged);
  const setPasswordChanged = useAuthStore((s) => s.setPasswordChanged);

  return (
    <div className="home-page">
      {!showChangePassword && <h1 className="home-title">홈</h1>}
      {!showChangePassword && <LoginStatus />}
      {!isLoggedIn && <LoginForm />}
      {isLoggedIn && !showChangePassword && (
        <p className="home-text">로그인 완료!</p>
      )}
      {isLoggedIn && !showChangePassword && (
        <button
          className="home-password-button"
          onClick={() => {
            setShowChangePassword(true);
            setPasswordChanged(false);
          }}
        >
          비밀번호 변경
        </button>
      )}
      {isLoggedIn && showChangePassword && <PasswordChange />}
      {passwordChanged && <p>비밀번호가 변경되었습니다.</p>}
    </div>
  );
}
