import ChangePassword from "../components/ChangePassword";
import LoginForm from "../components/LoginForm";
import LoginStatus from "../components/LoginStatus";
import { useAuthStore } from "../stores/authStore";
import "./Home.css";

export default function Home() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const changingPassword = useAuthStore((s) => s.changingPassword);
  const setChangingPassword = useAuthStore((s) => s.setChangingPassword);

  const onClick = (e) => {
    e.preventDefault();
    setChangingPassword();
  };

  return (
    <>
      <div className="home-page">
        {!changingPassword ? (
          <h1 className="home-title">홈</h1>
        ) : (
          <h1 className="home-title">비밀번호 변경</h1>
        )}
        <LoginStatus />
        {isLoggedIn && changingPassword && <ChangePassword />}
        {!isLoggedIn && !changingPassword && <LoginForm />}
        {isLoggedIn && !changingPassword && (
          <p className="home-text">로그인 완료!</p>
        )}
        {isLoggedIn && !changingPassword && (
          <button onClick={onClick} className="change-password">
            비밀번호 변경
          </button>
        )}
      </div>
    </>
  );
}
