import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  user: null,
  error: null,
  passwordChanged: false,

  login: async (username, password) => {
    set({ error: null });
    await new Promise((r) => setTimeout(r, 500));

    if (!username || !password) {
      set({ error: "아이디와 비밀번호를 모두 입력해주세요." });
      return false;
    }

    if (password.length < 6) {
      set({ error: "비밀번호는 최소 6자 이상이어야 합니다. " });
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

  changePassword: async (oldPassword, newPassword, checkPassword) => {
    set({ error: null });
    const { user } = get();

    if (user.password === newPassword) {
      set({
        error:
          "현재 비밀번호와 새 비밀번호는 다르게 설정해야 합니다. 다시 시도해주세요.",
      });
      return false;
    }

    if (user.password !== oldPassword) {
      set({ error: "현재 비밀번호가 일치하지 않습니다." });
      return false;
    }

    if (newPassword.length < 6) {
      set({ error: "새 비밀번호는 최소 6자 이상이어야 합니다." });
      return false;
    }

    if (!/\d/.test(newPassword)) {
      set({ error: "새 비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다." });
      return false;
    }

    if (newPassword !== checkPassword) {
      set({
        error: "새 비밀번호와 확인 비밀번호가 다릅니다. 다시 시도해주세요.",
      });
      return false;
    }

    set({
      isLoggedIn: true,
      user: { ...user, password: newPassword },
      error: null,
      passwordChanged: true,
    });
    return true;
  },

  setPasswordChanged: (value) => set({ passwordChanged: value }),
}));
