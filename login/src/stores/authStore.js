import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  user: null,
  error: null,

  login: async (username, password) => {
    set({ error: null });
    await new Promise((r) => setTimeout(r, 500));

    if (!username || !password) {
      set({ error: "아이디와 비밀번호를 모두 입력해주세요." });
      return false;
    }

    if (password.length < 6) {
      set({ error: "비밀번호는 최소 6자 이상이어야 합니다." });
      return false;
    }

    if (!/\d/.test(password)) {
      set({ error: "비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다." });
      return false;
    }

    set({ isLoggedIn: true, user: { username, password }, error: null });
    return true;
  },

  logout: () => set({ isLoggedIn: false, user: null, error: null }),

  changePassword: async (previousPassword, newPassword) => {
    set({ error: null });
    const { isLoggedIn, user } = get();

    if (!isLoggedIn) { // isLoggedIn이 true일 때
      set({ error: "로그인이 필요합니다." });
      return false;
    }

    if (user?.password !== previousPassword) {
      set({ error: "현재 비밀번호가 일치하지 않습니다." });
      return false;
    }

    if (newPassword.length < 6 || !/\d/.test(newPassword)) {
      set({ error: "새 비밀번호는 6자 이상이며 숫자를 포함해야 합니다." });
      return false;
    }

    set({ user: { ...user, password: newPassword }, error: null });
    return true;
  },
}));