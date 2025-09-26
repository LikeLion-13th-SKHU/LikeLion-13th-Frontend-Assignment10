// src/stores/authStore.js

import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  // get을 추가합니다.
  isLoggedIn: false,
  user: null,
  error: null,
  successMessage: null,

  // 현재 비밀번호를 저장할 상태를 추가합니다.
  currentPassword: null,

  clearMessages: () => set({ error: null, successMessage: null }),

  login: async (username, password) => {
    set({ error: null, successMessage: null });
    await new Promise((r) => setTimeout(r, 500));

    if (!username || !password) {
      set({ error: '아이디와 비밀번호를 모두 입력해주세요.' });
      return false;
    }
    if (password.length < 6 || !/\d/.test(password)) {
      set({ error: '비밀번호는 6자 이상이며 숫자를 포함해야 합니다.' });
      return false;
    }

    // 로그인 성공 시, 입력한 비밀번호를 상태에 저장합니다.
    set({
      isLoggedIn: true,
      user: { username },
      error: null,
      currentPassword: password,
    });
    return true;
  },

  logout: () =>
    set({ isLoggedIn: false, user: null, error: null, currentPassword: null }),

  changePassword: async (enteredPassword, newPassword, confirmPassword) => {
    set({ error: null, successMessage: null });
    await new Promise((r) => setTimeout(r, 500));

    // 👇 현재 비밀번호가 맞는지 확인하는 로직을 추가합니다.
    if (enteredPassword !== get().currentPassword) {
      set({ error: '현재 비밀번호가 일치하지 않습니다.' });
      return false;
    }

    if (!enteredPassword || !newPassword || !confirmPassword) {
      set({ error: '모든 필드를 입력해주세요.' });
      return false;
    }
    if (newPassword !== confirmPassword) {
      set({ error: '새 비밀번호가 일치하지 않습니다.' });
      return false;
    }
    if (newPassword.length < 6 || !/\d/.test(newPassword)) {
      set({ error: '새 비밀번호는 6자 이상이며 숫자를 포함해야 합니다.' });
      return false;
    }

    // 비밀번호 변경 성공 시, 저장된 비밀번호도 새 값으로 업데이트합니다.
    set({
      successMessage: '비밀번호가 성공적으로 변경되었습니다.',
      currentPassword: newPassword,
    });
    return true;
  },
}));
