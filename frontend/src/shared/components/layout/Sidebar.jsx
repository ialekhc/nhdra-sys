import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../../config/routes';
import { useAuthStore } from '../../../features/auth/store/authStore';
import { Button } from '../ui/Button';

export const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const allowedItems = SIDEBAR_ITEMS.filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="flex h-screen w-full max-w-64 flex-col border-r border-slate-200 bg-white px-4 py-4">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-brand-800">Cardio-Diabetic HMS</h1>
        <p className="text-xs text-slate-500">Patient Record Management</p>
      </div>

      <nav className="flex-1 space-y-1">
        {allowedItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-brand-100 text-brand-800' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Button
        variant="secondary"
        onClick={() => {
          logout();
          window.location.href = '/login';
        }}
      >
        Logout
      </Button>
    </aside>
  );
};
