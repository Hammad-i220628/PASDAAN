import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="text-white py-2 text-sm" style={{ backgroundColor: '#003366' }}>
        <div className="w-full px-4">
          <div className="flex justify-center items-center">
            <a href="/find-tutor" className="font-medium hover:underline cursor-pointer">Find Your Tutor Here →</a>
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
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
      </div>
      
      {/* Mobile Sidebar Menu */}
      <>
        {/* Mobile backdrop */}
        <div 
          className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`
          fixed lg:hidden transition-transform duration-500 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          w-60 bg-white shadow-sm flex flex-col h-screen border-l border-gray-200 z-50 overflow-hidden
          right-0 top-0
        `}>
            {/* Mobile close button */}
            <div className="flex justify-end p-4 flex-shrink-0">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Logo */}
            <div className="p-6 pb-4 flex-shrink-0 flex justify-center">
              <img 
                src="/logo.png" 
                alt="PASDAAN" 
                className="h-8 w-auto"
              />
            </div>

            {/* Menu Content - appears right after logo */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 flex flex-col items-center">
              {/* Menu Items */}
              <nav className="flex flex-col items-center space-y-4 mb-8">
                <a
                  href="/"
                  className={`text-xl font-medium transition-all duration-500 transform px-4 py-3 rounded-lg hover:bg-blue-50 ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } hover:scale-105 hover:text-green-600`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    color: '#003366',
                    transitionDelay: isMobileMenuOpen ? '0.2s' : '0s'
                  }}
                >
                  Home
                </a>
                <a
                  href="/about-us"
                  className={`text-xl font-medium transition-all duration-500 transform px-4 py-3 rounded-lg hover:bg-blue-50 ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } hover:scale-105 hover:text-green-600`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    color: '#003366',
                    transitionDelay: isMobileMenuOpen ? '0.3s' : '0s'
                  }}
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className={`text-xl font-medium transition-all duration-500 transform px-4 py-3 rounded-lg hover:bg-blue-50 ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } hover:scale-105 hover:text-green-600`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    color: '#003366',
                    transitionDelay: isMobileMenuOpen ? '0.4s' : '0s'
                  }}
                >
                  Contact
                </a>
              </nav>

              {/* Auth Links */}
              <div className="flex flex-col items-center space-y-3 w-full px-4">
                <a
                  href="/signup"
                  className={`w-full max-w-xs py-4 px-6 rounded-xl text-lg font-medium text-white bg-green-500 hover:bg-green-600 text-center transition-all duration-500 transform ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  } hover:scale-105 shadow-lg`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? '0.5s' : '0s'
                  }}
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  className={`w-full max-w-xs py-4 px-6 rounded-xl text-lg font-medium border-2 border-green-500 hover:bg-green-50 text-center transition-all duration-500 transform ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  } hover:scale-105 shadow-lg`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    color: '#003366',
                    transitionDelay: isMobileMenuOpen ? '0.6s' : '0s'
                  }}
                >
                  Login
                </a>
              </div>
              
              {/* Bottom padding for better scroll experience */}
              <div className="h-8"></div>
            </div>
          </div>
        </>
    </header>
  );
};

export default Header;
