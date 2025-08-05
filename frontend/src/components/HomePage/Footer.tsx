import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white py-8" style={{ backgroundColor: '#003366' }}>
      {/* White horizontal line at the top - full width */}
      <div className="border-t border-white w-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Company Info - Centered */}
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <img 
                src="/logo.png" 
                alt="Pasdaan Logo"
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 px-4">
              Connecting students with qualified tutors for personalized learning experiences.
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-sky-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links and Support - Horizontal */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Find Tutors</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Become a Tutor</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Safety</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Contact - Centered */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-3" />
                <span className="text-gray-300">+923061797003</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 mr-3" />
                <span className="text-gray-300">info@pasdaan.com</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span className="text-gray-300">Islamabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Pasdaan Logo"
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Connecting students with qualified tutors for personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-sky-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Tutors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Become a Tutor</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" />
                <span className="text-gray-300">+923061797003</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" />
                <span className="text-gray-300">info@pasdaan.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span className="text-gray-300">Islamabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;