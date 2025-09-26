import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    isLoggedIn: false,
    user: null,
    error: null,

    login: async (username, password) => {
        set({error: null});
        await new Promise((r) => setTimeout(r, 500));

        if (!username || !password) {
            set({ error: '아이디와 비밀번호를 모두 입력해주세요'});
            return false;
        }

        if (password.length < 6) {
            set({ error: '비밀번호는 최소 6자 이상이어야 합니다 '})
            return false;
        }

        if (!/\d/.test(password)) {
            set({error: '비밀번호는 최소 한 개의 숫자가 포함되어야 합니다'})
            return false;
        }

        set({isLoggedIn: true, user: {username, password}, error: null});
        return true;
    },

        logout: () => set({isLoggedIn: false,user: null, error: null}),

        changePassword: (currentPw, newPw) => {
            let success = false;

            set((state) => {
                if (!state.isLoggedIn) return state;

                if (state.user.password !== currentPw) {
                    success = false;
                    return state;
                }

                success = true;
                return {...state, user: {...state.user, password: newPw}};
            });
            return success;
        }
}));