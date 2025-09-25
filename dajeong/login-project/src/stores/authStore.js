import {create} from 'zustand';

export const useAuthStore = create((set, get) => ({
    isLoggedIn: false,
    isChangePassword: false,
    user: null,
    error: null,
    password: null,
    
    // 로그인
    login: async (username, password) => {
        set({error:null});
        await new Promise((r) => setTimeout(r, 500));

        if (!username || !password) {
            set({ error: '아이디와 비밀번호를 모두 입력해주세요.'});
            return false;
        }

        if (password.length < 6) {
            set({ error: '비밀번호는 최소 6자 이상이어야 합니다.'});
            return false;
        }

        if (!/\d/.test(password)) {
            set({ error: '비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다.'});
            return false;
        }

        set({ isLoggedIn: true, user: {username}, error: null, password});
        return true;
    },

    logout: () => set({isLoggedIn: false, user: null, error: null}),

    changePassword: async(nowPassword, newPassword, confirmPassword) => {
        set({error: null, isChangePassword: false});
        const now = get().password;

        if (nowPassword !== now) {
            set({error: '현재 비밀번호가 올바르지 않습니다.'});
            return;
        }

        if (newPassword.length < 6) {
            set({error: '비밀번호는 최소 6자 이상이어야 합니다.'});
            return;
        }
        if (!/\d/.test(newPassword)) {
            set({error: '비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다.'})
            return;
        }
        if (newPassword !== confirmPassword) {
            set({error: "비밀번호가 일치하지 않습니다."});
            return;
        }
        if (newPassword === now) {
            set({error: "현재 비밀번호와 다른 비밀번호를 사용해야 합니다."});
            return;
        }

        set({password: newPassword, isChangePassword: true, error: null});
        return true;
    }
}))