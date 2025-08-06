import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 400); // Match animation duration
    } else {
      setMenuOpen(true);
    }
  };
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
          {/* Backdrop with blur effect */}
          <div className={`absolute inset-0 backdrop-blur-sm bg-black/20 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}></div>
          
          {/* Menu panel with enhanced gradient background */}
          <div className={`absolute inset-0 ${isClosing ? 'animate-slideOutToRight' : 'animate-slideInFromRight'}`}
               style={{ 
                 background: 'linear-gradient(135deg, #003366 0%, #1e3a8a 50%, #1e40af 100%)', 
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
               }}>
            {/* Header with logo and close button */}
            <div className={`relative z-20 flex justify-between items-center px-4 py-4 border-b border-white/20 bg-white/95 backdrop-blur-md ${isClosing ? 'animate-slideOutToTop' : 'animate-slideInFromTop'}`}>
              <div className="bg-white/90 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                <img 
                  src="/logo.png" 
                  alt="PASDAAN" 
                  className="h-10 w-auto"
                />
              </div>
              <button 
                className="relative z-30 text-white hover:text-gray-200 focus:outline-none p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={toggleMenu}
                type="button"
              >
                <X className="w-6 h-6 text-blue-900" />
              </button>
            </div>
            
            {/* Centered Navigation */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full -mt-20">
              <nav className="flex flex-col items-center space-y-8">
                <a 
                  href="/" 
                  className={`text-xl font-medium text-gray-800 hover:text-white hover:bg-blue-600/90 transition-all duration-500 bg-white/95 backdrop-blur-sm px-12 py-5 rounded-xl shadow-xl border border-white/30 tracking-wide transform hover:scale-105 hover:-translate-y-1 ${isClosing ? 'animate-fadeOutDown' : 'animate-fadeInUp'}`}
                  style={{ 
                    animationDelay: isClosing ? '0s' : '0.2s', 
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                  onClick={toggleMenu}
                >
                  Home
                </a>
                <a 
                  href="/about-us" 
                  className={`text-xl font-medium text-gray-800 hover:text-white hover:bg-blue-600/90 transition-all duration-500 bg-white/95 backdrop-blur-sm px-12 py-5 rounded-xl shadow-xl border border-white/30 tracking-wide transform hover:scale-105 hover:-translate-y-1 ${isClosing ? 'animate-fadeOutDown' : 'animate-fadeInUp'}`}
                  style={{ 
                    animationDelay: isClosing ? '0.1s' : '0.3s', 
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                  onClick={toggleMenu}
                >
                  About Us
                </a>
                <a 
                  href="/contact" 
                  className={`text-xl font-medium text-gray-800 hover:text-white hover:bg-blue-600/90 transition-all duration-500 bg-white/95 backdrop-blur-sm px-12 py-5 rounded-xl shadow-xl border border-white/30 tracking-wide transform hover:scale-105 hover:-translate-y-1 ${isClosing ? 'animate-fadeOutDown' : 'animate-fadeInUp'}`}
                  style={{ 
                    animationDelay: isClosing ? '0.2s' : '0.4s', 
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
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