import { useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginStatus from "../components/LoginStatus";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useAuthStore } from "../stores/authStore";
import "./Home.css";

export default function Home() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    
    return (
        <div className="home-page">
            <h1 className="home-title">홈</h1>
            <LoginStatus />
            {!isLoggedIn && <LoginForm />}
            {isLoggedIn && (
                <div className="logged-in-content">
                    <p className="home-text">로그인 완료!</p>
                    
                    {passwordChangeSuccess && (
                        <div className="success-message">
                            비밀번호가 변경되었습니다!
                        </div>
                    )}
                    
                    <button 
                        className="change-password-button" 
                        onClick={() => {
                            setShowChangePassword(!showChangePassword);
                            setPasswordChangeSuccess(false);
                        }}
                    >
                        {showChangePassword ? '비밀번호 변경 취소' : '비밀번호 변경'}
                    </button>
                    
                    {showChangePassword && (
                        <ChangePasswordForm 
                            onSuccess={() => {
                                setPasswordChangeSuccess(true);
                                setShowChangePassword(false);
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}