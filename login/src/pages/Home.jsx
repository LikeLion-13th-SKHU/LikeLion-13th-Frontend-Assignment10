import { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginStatus from "../components/LoginStatus";
import ChangePass from "../components/ChangePass";
import { useAuthStore } from "../stores/authStore";
import "./Home.css";

export default function Home() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [change, setChange] = useState(false);

  if (!isLoggedIn && change) setChange(false);

  if (change) {
    return <ChangePass onClose={() => setChange(false)} />;
  }

  return (
    <div className="home-page">
      <h1 className="home-title">홈</h1>
      <LoginStatus />
      {!isLoggedIn && <LoginForm />}

      {isLoggedIn && (
        <>
          <p className="home-text">로그인 완료!</p>
          <button onClick={() => setChange(true)} className="home-change">비밀번호 변경</button>
        </>
      )}
    </div>
  );
}