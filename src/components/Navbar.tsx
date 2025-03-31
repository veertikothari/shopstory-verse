
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, logout, profile, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            ShopStory
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user.email}
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
