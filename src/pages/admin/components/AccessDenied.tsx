
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AccessDenied = () => {
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
};

export default AccessDenied;
