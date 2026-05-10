import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@cardiodiabetic.local',
      password: 'Admin@12345',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(login)}>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Email</label>
        <Input type="email" placeholder="Enter your email" {...register('email')} />
        {errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <Input type="password" placeholder="Enter your password" {...register('password')} />
        {errors.password ? <p className="text-xs text-red-600">{errors.password.message}</p> : null}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};
