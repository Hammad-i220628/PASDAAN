import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="w-full px-4">
          <div className="flex justify-center items-center">
            <span className="font-medium">Find Your Tutor Here →</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="w-full px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="/public/logo.png" 
              alt="PASDAAN" 
              className="h-10 sm:h-14 w-auto"
            />
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium ml-8 xl:ml-16">
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors pb-1 hover:border-b-2 hover:border-green-500">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors pb-1 hover:border-b-2 hover:border-green-500">About Us</a>
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors pb-1 hover:border-b-2 hover:border-green-500">Contact</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-gray-700 border-2 border-transparent hover:border-green-500 text-xs sm:text-sm font-medium px-2 sm:px-4 py-2 rounded-md">
              Sign Up
            </button>
            <button className="text-gray-700 border-2 border-transparent hover:border-green-500 text-xs sm:text-sm font-medium px-3 sm:px-6 py-2 rounded-md">
              Login
            </button>
            {/* Hamburger Menu Button */}
            <button 
              className="lg:hidden text-gray-700 hover:text-blue-900 focus:outline-none p-2"
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-4 space-y-3">
              <a href="#" className="block text-gray-700 hover:text-blue-900 transition-colors py-2 border-b border-gray-100">
                Home
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-900 transition-colors py-2 border-b border-gray-100">
                About Us
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-900 transition-colors py-2">
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;