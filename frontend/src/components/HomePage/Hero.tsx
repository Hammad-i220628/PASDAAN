import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    '/home_image1.jpg',
    '/home_image2.png',
    '/home_image3.png'
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative text-white py-8 sm:py-20 min-h-[70vh] sm:min-h-0 overflow-hidden">
      {/* Background Image Glider */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: isMobile ? 'center 10%' : 'center center'
            }}
          />
        ))}
      </div>
      
      {/* Bluish overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
      
      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentImageIndex 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end sm:justify-start min-h-[70vh] sm:min-h-0">
        <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-0 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Personalized Learning, Verified Tutors
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-12 text-gray-200 max-w-4xl mx-auto px-4">
            Connect with qualified in-person tutors in your area who are committed 
            to helping your child excel academically.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-xl max-w-6xl mx-auto">
            {/* Top buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a href="/find-tutor" className="text-white px-4 py-2 rounded-md transition-colors flex-1 sm:flex-none text-center inline-block" style={{ backgroundColor: '#003366' }}>
                Find a Tutor
              </a>
              <a href="/become-a-tutor" className="text-white px-4 py-2 rounded-md transition-colors flex-1 sm:flex-none text-center inline-block" style={{ backgroundColor: '#003366' }}>
                Become a Tutor
              </a>
            </div>
            
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Search by subject, e.g., Mathematics..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
              />
              <button className="text-white px-6 sm:px-8 py-3 rounded-md transition-colors font-medium" style={{ backgroundColor: '#003366' }}>
                Search
              </button>
            </div>
            
            {/* Filter buttons */}
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4">
              <button className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm">
                Location
              </button>
              <button className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm">
                Price Range
              </button>
              <button className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm">
                Qualification
              </button>
              <button className="px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm">
                Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;