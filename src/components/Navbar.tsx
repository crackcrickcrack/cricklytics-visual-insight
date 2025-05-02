
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-cricket-green" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm3 7H9v-2h6v2z" />
              </svg>
              <span className="ml-2 text-lg font-poppins font-bold">Cricklytics</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Stats Dashboard
            </Link>
            <Link to="/compare" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Compare Players
            </Link>
            <Link to="/matches" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
              Live Matches
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button size="sm" className="ml-2">
              Sign In
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Stats Dashboard
            </Link>
            <Link 
              to="/compare" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Compare Players
            </Link>
            <Link 
              to="/matches" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Matches
            </Link>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium">Theme</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            </div>
            <Button className="w-full mt-2">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
