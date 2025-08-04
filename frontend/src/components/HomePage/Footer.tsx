import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/public/logo.png" 
                alt="Pasdaan Logo"
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-blue-200 mb-6">
              Connecting students with qualified tutors for personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-blue-200 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-blue-200 hover:text-pink-500 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-blue-200 hover:text-sky-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Find Tutors</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Become a Tutor</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <span className="text-blue-200">+92 300 1234567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <span className="text-blue-200">info@pasdaan.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span className="text-blue-200">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-blue-200">© 2025 Pasdaan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;