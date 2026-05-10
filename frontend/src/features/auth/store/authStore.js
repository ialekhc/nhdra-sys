import { create } from 'zustand';

const initialUser = (() => {
  try {
    return JSON.parse(localStorage.getItem('auth_user') || 'null');
  } catch {
    return null;
  }
})();

const initialToken = localStorage.getItem('auth_token') || null;

export const useAuthStore = create((set) => ({
  user: initialUser,
  token: initialToken,
  setAuth: ({ user, token }) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    set({ user: null, token: null });
  },
}));
