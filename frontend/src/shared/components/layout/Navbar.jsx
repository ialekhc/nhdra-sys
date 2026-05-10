import { useAuthStore } from '../../../features/auth/store/authStore';

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Hospital Dashboard</h2>
          <p className="text-xs text-slate-500">HDCL Patient Records</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">{user?.name || 'User'}</p>
          <p className="text-xs text-slate-500">{user?.role || '-'}</p>
        </div>
      </div>
    </header>
  );
};
