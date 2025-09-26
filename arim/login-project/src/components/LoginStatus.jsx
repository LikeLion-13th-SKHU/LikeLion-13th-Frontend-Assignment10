import { useAuthStore } from '../stores/authStore';
import './LoginStatus.css';

export default function LoginStatus() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!isLoggedIn) return null;

  return (
    <div className="status-wrap">
      <span>
        안녕하세요, <b>{user?.username}</b> 님!
      </span>
      <button onClick={logout} className="logout-button">
        로그아웃
      </button>
    </div>
  );
}
