import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const MainLayout = () => (
  <div className="flex min-h-screen">
    <div className="hidden md:block md:w-64">
      <Sidebar />
    </div>
    <div className="flex min-h-screen flex-1 flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  </div>
);
