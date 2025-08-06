import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="text-white py-2 text-sm" style={{ backgroundColor: '#003366' }}>
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
              src="/logo.png" 
              alt="PASDAAN" 
              className="h-10 sm:h-14 w-auto"
            />
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium ml-8 xl:ml-16">
              <a href="/" className="text-gray-700 transition-colors pb-1 hover:border-b-2 hover:border-green-500" style={{ ":hover": { color: '#003366' } }} onMouseEnter={(e) => e.target.style.color = '#003366'} onMouseLeave={(e) => e.target.style.color = ''}>Home</a>
              <a href="/about-us" className="text-gray-700 transition-colors pb-1 hover:border-b-2 hover:border-green-500" style={{ ":hover": { color: '#003366' } }} onMouseEnter={(e) => e.target.style.color = '#003366'} onMouseLeave={(e) => e.target.style.color = ''}>About Us</a>
              <a href="/contact" className="text-gray-700 transition-colors pb-1 hover:border-b-2 hover:border-green-500" style={{ ":hover": { color: '#003366' } }} onMouseEnter={(e) => e.target.style.color = '#003366'} onMouseLeave={(e) => e.target.style.color = ''}>Contact</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="/signup" className="text-gray-700 border-2 border-transparent hover:border-green-500 text-xs sm:text-sm font-medium px-2 sm:px-4 py-2 rounded-md inline-block">
              Sign Up
            </a>
            <a href="/login" className="text-gray-700 border-2 border-transparent hover:border-green-500 text-xs sm:text-sm font-medium px-3 sm:px-6 py-2 rounded-md inline-block">
              Login
            </a>
            {/* Hamburger Menu Button */}
            <button 
              className="lg:hidden text-gray-700 hover:text-blue-900 focus:outline-none p-2"
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
      </div>
      
      {/* Full-screen Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Menu panel with slide-in animation and bubbles */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 animate-slideInFromRight overflow-hidden">
            {/* Super Cool Animated Bubbles Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
            </div>
            
            {/* Header with logo and close button */}
            <div className="relative z-20 flex justify-between items-center px-4 py-4 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm animate-slideInFromTop">
              <img 
                src="/logo.png" 
                alt="PASDAAN" 
                className="h-10 w-auto"
              />
              <button 
                className="relative z-30 text-gray-700 hover:text-green-600 focus:outline-none p-3 transition-colors bg-white rounded-full shadow-lg"
                onClick={toggleMenu}
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Centered Navigation */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full -mt-20">
              <nav className="flex flex-col items-center space-y-8">
                <a 
                  href="/" 
                  className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-105 animate-fadeInUp bg-white bg-opacity-70 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg"
                  style={{ animationDelay: '0.1s' }}
                  onClick={toggleMenu}
                >
                  Home
                </a>
                <a 
                  href="/about-us" 
                  className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-105 animate-fadeInUp bg-white bg-opacity-70 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg"
                  style={{ animationDelay: '0.2s' }}
                  onClick={toggleMenu}
                >
                  About Us
                </a>
                <a 
                  href="/contact" 
                  className="text-2xl font-medium text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-105 animate-fadeInUp bg-white bg-opacity-70 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg"
                  style={{ animationDelay: '0.3s' }}
                  onClick={toggleMenu}
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;