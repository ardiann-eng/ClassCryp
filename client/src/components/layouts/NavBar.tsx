import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, currentPath, onClick }: NavLinkProps) => {
  const isActive = currentPath === href;
  
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium transition duration-150",
          isActive 
            ? "text-white bg-primary-foreground" 
            : "text-white hover:bg-primary-foreground"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default function NavBar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="text-2xl font-bold text-white font-accent">CryptGen</a>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <NavLink href="/" currentPath={location}>Home</NavLink>
            <NavLink href="/announcements" currentPath={location}>Announcements</NavLink>
            <NavLink href="/finance" currentPath={location}>Finance</NavLink>
            <NavLink href="/contact" currentPath={location}>Contact</NavLink>
          </div>
          
          <div className="flex md:hidden items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-primary">
            <NavLink href="/" currentPath={location} onClick={closeMobileMenu}>Home</NavLink>
            <NavLink href="/announcements" currentPath={location} onClick={closeMobileMenu}>Announcements</NavLink>
            <NavLink href="/finance" currentPath={location} onClick={closeMobileMenu}>Finance</NavLink>
            <NavLink href="/contact" currentPath={location} onClick={closeMobileMenu}>Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
