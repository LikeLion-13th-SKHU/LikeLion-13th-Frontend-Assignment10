import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import "./ChangePassword.css";


export default function ChangePassword() {
    const {isLoggedIn, changePassword} = useAuthStore();

    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [message, setMessage] = useState("");

    if (!isLoggedIn) {
        return <p>로그인 후 이용 가능합니다.</p>
    }

    const handleChangePassword = () => {
        if (!currentPw || ! newPw || !confirmPw) {
            setMessage("모든 칸을 입력해주세요.")
            return;
        }

        if (newPw.length < 6) {
            setMessage("새 비밀번호는 6자리 이상이어야 합니다.")
            return;
        }

        if (!/\d/.test(newPw)) {
            setMessage("새 비밀번호에는 숫자가 포함되어야 합니다.");
            return;
        }
        
        if(newPw !== confirmPw) {
            setMessage("새 비밀번호와 확인이 일치하지 않습니다.")
            return;
        }

        const success = changePassword(currentPw, newPw);
        if (success) {
            setMessage("비밀번호가 변경되었습니다.")
            setCurrentPw("");
            setNewPw("");
            setConfirmPw("");
        } else {
            setMessage("현재 비밀번호가 올바르지 않습니다.")
        }
    };

    return (
        <div className="change-password-page">
            <h2>비밀번호 변경</h2>
            <input 
                type="password" 
                placeholder="현재 비밀번호" 
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)} 
            /> 
            <input 
                type="password" 
                placeholder="새 비밀번호(6자 이상, 숫자 포함)" 
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)} 
            /> 
            <input 
                type="password" 
                placeholder="새 비밀번호 확인" 
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)} 
            /> 
            <button onClick={handleChangePassword}>변경하기</button>
            {message && <p className="message">{message}</p>}
        </div>
    )
}