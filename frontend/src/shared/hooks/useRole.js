import { useAuthStore } from '../../features/auth/store/authStore';

export const useRole = () => {
  const user = useAuthStore((state) => state.user);
  return user?.role;
};
