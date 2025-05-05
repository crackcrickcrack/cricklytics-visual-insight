
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-headline tracking-tight">CRICK<span className="text-cricket-blue">6</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 rounded-lg text-base font-medium hover:bg-muted transition-colors">
              HOME
            </Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-lg text-base font-medium hover:bg-muted transition-colors">
              STATS
            </Link>
            <Link to="/compare" className="px-4 py-2 rounded-lg text-base font-medium hover:bg-muted transition-colors">
              COMPARE
            </Link>
            <Link to="/matches" className="px-4 py-2 rounded-lg text-base font-medium hover:bg-muted transition-colors">
              MATCHES
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button size="sm" className="ml-2 cricket-button-primary rounded-lg">
              SIGN IN
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link 
              to="/" 
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              STATS
            </Link>
            <Link 
              to="/compare" 
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              COMPARE
            </Link>
            <Link 
              to="/matches" 
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              MATCHES
            </Link>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-base font-medium">THEME</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            </div>
            <Button className="w-full cricket-button-primary">
              SIGN IN
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
