import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => (
  <div>
    <div className="mb-5 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Cardio-Diabetic HMS</h1>
      <p className="mt-1 text-sm text-slate-500">Login to access patient record system</p>
    </div>
    <LoginForm />
  </div>
);
