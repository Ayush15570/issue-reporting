import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
       
        <div>
          <h2 className="text-2xl font-bold mb-3">🌍 UrbanEyes</h2>
          <p className="text-gray-300 text-sm">
            Empowering citizens to report issues and make informed decisions for
            cleaner, safer, and smarter cities.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Report Issues</li>
            <li>View Reports</li>
            <li>AI Classification</li>
            <li>Community Insights</li>
            <li>Awareness Guides</li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Reports Map</li>
            <li>Success Stories</li>
            <li>City Analytics</li>
            <li>Blog</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: support@urbaneyes.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: 123 Smart City Road, Bhopal</li>
          </ul>
        </div>
      </div>

      
      <div className="border-t border-green-600 text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} UrbanEyes. All rights reserved. |{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
