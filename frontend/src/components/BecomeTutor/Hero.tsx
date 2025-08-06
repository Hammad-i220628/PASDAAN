import React from 'react';

const Hero = () => {
  return (
    <section className="text-white py-10 relative" style={{ backgroundColor: '#003366' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl ml-4 sm:ml-8 lg:ml-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
            Become a Tutor
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            Share your knowledge, build your reputation, and grow your<br/>
            tutoring business with Pakistan's trusted education platform.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded transition-colors duration-200 text-sm sm:text-base">
            Apply Now
          </button>
        </div>
      </div>
      {/* Diagonal green area spanning full height */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute block w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M900,0 L300,400 L1200,400 L1200,0 Z" fill="#10b981" opacity="0.15"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
