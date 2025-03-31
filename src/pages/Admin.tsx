
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminCustomers from './admin/AdminCustomers';
import AdminProducts from './admin/AdminProducts';
import AdminSettings from './admin/AdminSettings';
import AccessDenied from './admin/components/AccessDenied';

const Admin = () => {
  const { isAdmin } = useAuth();
  
  // Protect the admin route
  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/customers" element={<AdminCustomers />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
