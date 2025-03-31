import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

import AdminDashboard from './admin/AdminDashboard';
import AdminCustomers from './admin/AdminCustomers';
import AdminProducts from './admin/AdminProducts';
import AdminSettings from './admin/AdminSettings';
import { useIsMobile } from '@/hooks/use-mobile';

const Admin = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Protect the admin route
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6 text-center">
          You do not have permission to access the admin dashboard.
        </p>
        <Button asChild>
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', icon: <BarChart size={20} />, label: 'Dashboard' },
    { path: '/admin/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {isMobile && (
        <div className="bg-white p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu size={24} />
            </Button>
            <h1 className="text-xl font-bold ml-2">Admin Dashboard</h1>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <Home size={18} className="mr-2" />
              Store
            </Link>
          </Button>
        </div>
      )}

      <div
        className={`${
          isMobile
            ? `fixed inset-0 z-50 transform transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-64 min-h-screen'
        }`}
      >
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}

        <div
          className={`${
            isMobile
              ? 'fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50'
              : 'bg-white h-full shadow-sm'
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSidebar}
                className="absolute top-2 right-2"
              >
                <X size={20} />
              </Button>
            )}

            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold">ShopStory</h2>
            </div>

            <ScrollArea className="flex-1">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </ScrollArea>

            <Separator className="my-4" />

            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-700 font-medium">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sm">{profile?.first_name || user?.email}</p>
                  <p className="text-gray-500 text-xs">{user?.email}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {!isMobile && (
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button asChild variant="outline">
              <Link to="/">
                <Home size={18} className="mr-2" />
                Back to Store
              </Link>
            </Button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/customers" element={<AdminCustomers />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
