import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaTelegram, 
  FaDiscord,
  FaPaperPlane
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-accent"><span className="text-blue-400">Crypt</span>Gen</h3>
            <p className="text-gray-400 mb-4">
              Your premier class portal for Computer Science and Cryptography studies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                <FaWhatsapp size={18} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                <FaTelegram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-gray-400 hover:text-white transition">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/finance" className="text-gray-400 hover:text-white transition">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Study Materials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">University Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Academic Calendar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">Get the latest announcements delivered to your inbox.</p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none"
                required
              />
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-l-none"
              >
                <FaPaperPlane />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2023 CryptGen Class. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
