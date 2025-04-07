import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
              <h3 className="text-xl font-bold">CryptGen</h3>
            </div>
            <p className="text-gray-400 text-sm">
              A vibrant community of cryptography and computer science students working together towards excellence.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-all">Home</Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-white transition-all">Announcements</Link>
              </li>
              <li>
                <Link href="/finance" className="hover:text-white transition-all">Finance</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-all">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-all">Study Materials</a>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-white transition-all">Class Schedule</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all">Photo Gallery</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all">Events Calendar</a>
              </li>
            </ul>
          </div>
          
          {/* Subscribe */}
          <div>
            <h4 className="text-lg font-bold mb-4">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and announcements.
            </p>
            
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 transition-all">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2023 CryptGen Class. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-all" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all" aria-label="YouTube">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
