import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import "./ChangePasswordForm.css";

export default function ChangePasswordForm({ onSuccess }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const changePassword = useAuthStore((s) => s.changePassword);
    const error = useAuthStore((s) => s.error);

    const onSubmit = async (e) => {
        e.preventDefault();
        const success = await changePassword(currentPassword, newPassword, checkPassword);
        
        // 성공 시 폼 초기화 및 콜백 실행
        if (success) {
            setCurrentPassword("");
            setNewPassword("");
            setCheckPassword("");
            onSuccess && onSuccess();
        }
    };

    return (
        <form onSubmit={onSubmit} className="change-password-form">
            <h2 className="change-password-title">비밀번호 변경</h2>
            
            <input
                placeholder="현재 비밀번호"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="change-password-input"
            />
            
            <input
                placeholder="새 비밀번호"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="change-password-input"
            />
            
            <input
                placeholder="새 비밀번호 확인"
                type="password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="change-password-input"
            />
            
            {error && <p className="error-message">{error}</p>}
            
            <div className="button-group">
                <button type="submit" className="change-password-button">
                    비밀번호 변경
                </button>
            </div>
        </form>
    );
}
