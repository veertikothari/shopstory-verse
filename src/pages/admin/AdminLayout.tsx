
import { useState, ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminSidebar from './components/AdminSidebar';
import MobileHeader from './components/MobileHeader';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {isMobile && <MobileHeader toggleSidebar={toggleSidebar} />}

      <AdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        closeSidebar={closeSidebar} 
        handleLogout={handleLogout} 
      />

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

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
