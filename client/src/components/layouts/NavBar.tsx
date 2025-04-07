import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CryptgenLogo from "./Logo";

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
    <nav className="sticky top-0 z-50 gradient-bg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-white font-accent flex items-center">
                <CryptgenLogo className="h-8 w-8 mr-2" />
                <span className="text-[#C4E75A]">Crypt</span>Gen
              </Link>
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/" className={cn("nav-link", location === "/" ? "active" : "")}>
              Home
            </Link>
            <Link href="/announcements" className={cn("nav-link", location === "/announcements" ? "active" : "")}>
              Announcements
            </Link>
            <Link href="/finance" className={cn("nav-link", location === "/finance" ? "active" : "")}>
              Finance
            </Link>
            <Link href="/contact" className={cn("nav-link", location === "/contact" ? "active" : "")}>
              Contact
            </Link>
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
          <div className="px-2 pt-2 pb-3 space-y-1 gradient-bg flex flex-col">
            <Link href="/" onClick={closeMobileMenu} className={cn("nav-link", location === "/" ? "active" : "")}>
              Home
            </Link>
            <Link href="/announcements" onClick={closeMobileMenu} className={cn("nav-link", location === "/announcements" ? "active" : "")}>
              Announcements
            </Link>
            <Link href="/finance" onClick={closeMobileMenu} className={cn("nav-link", location === "/finance" ? "active" : "")}>
              Finance
            </Link>
            <Link href="/contact" onClick={closeMobileMenu} className={cn("nav-link", location === "/contact" ? "active" : "")}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
