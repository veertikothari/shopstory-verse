
import { Link } from 'react-router-dom';
import { Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  toggleSidebar: () => void;
}

const MobileHeader = ({ toggleSidebar }: MobileHeaderProps) => {
  return (
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
  );
};

export default MobileHeader;
