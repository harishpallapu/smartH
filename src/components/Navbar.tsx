
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, User, LogOut } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUser();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-health-blue" />
            <span className="font-medium text-xl">SmartHealth</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-health-blue ${
                location.pathname === '/' ? 'text-health-blue' : 'text-slate-700'
              }`}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-health-blue ${
                    location.pathname.includes('dashboard') ? 'text-health-blue' : 'text-slate-700'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/dashboard?tab=profile" 
                    className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-health-blue transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name || 'Profile'}</span>
                  </Link>
                  <Button size="sm" variant="outline" className="flex items-center space-x-1" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 ${
                  location.pathname === '/' ? 'text-health-blue' : 'text-slate-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 ${
                      location.pathname === '/dashboard' ? 'text-health-blue' : 'text-slate-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/dashboard?tab=profile" 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 ${
                      location.pathname === '/dashboard/profile' ? 'text-health-blue' : 'text-slate-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user?.name || 'Profile'}
                  </Link>
                  <button 
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 text-slate-700 text-left"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-100 text-slate-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-health-blue text-white hover:bg-health-blue/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
