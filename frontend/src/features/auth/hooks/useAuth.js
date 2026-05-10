import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { parseApiError } from '../../../api/apiErrorHandler';

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const login = async (values) => {
    try {
      const response = await authApi.login(values);
      const payload = response.data.data;
      setAuth(payload);
      toast.success('Login successful');
      navigate('/dashboard');
      return payload;
    } catch (error) {
      toast.error(parseApiError(error));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore request errors during logout
    }

    logoutStore();
    navigate('/login');
  };

  return { login, logout };
};
