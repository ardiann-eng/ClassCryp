import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Mail, 
  Menu, 
  X 
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { path: "/announcements", label: "Announcements & Schedule", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { path: "/finance", label: "Finance", icon: <DollarSign className="w-4 h-4 mr-2" /> },
    { path: "/contact", label: "Contact", icon: <Mail className="w-4 h-4 mr-2" /> }
  ];

  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            {/* Logo and Brand Name */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-8 w-8 text-yellow-400"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <h1 className="text-2xl font-bold">CryptGen</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={closeMenu}
              >
                <Button 
                  variant="ghost" 
                  className={`font-medium hover:text-yellow-300 ${isActive(link.path) ? 'text-yellow-300' : 'text-white'}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={closeMenu}
                className="block"
              >
                <Button 
                  variant="ghost" 
                  className={`w-full flex justify-start font-medium hover:text-yellow-300 ${isActive(link.path) ? 'text-yellow-300' : 'text-white'}`}
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
