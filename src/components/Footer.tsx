import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1f2937] text-white/80 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-white">HalfwayMeet</span>
            </Link>
            <p className="text-sm text-white/60">
              Find the perfect meeting spot, fair for everyone.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/find-meetup" className="text-sm hover:text-white transition-colors">
                  Find Meetup
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © {currentYear} HalfwayMeet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
