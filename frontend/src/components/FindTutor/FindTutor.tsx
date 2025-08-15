import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom Animated Dropdown Component
const AnimatedDropdown = ({ label, placeholder, options, value, onChange, style = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);

  // Calculate max height when dropdown opens
  useEffect(() => {
    if (isOpen && dropdownContentRef.current) {
      const contentHeight = dropdownContentRef.current.scrollHeight;
      setMaxHeight(Math.min(contentHeight, 300)); // Max height of 300px with scroll
    } else {
      setMaxHeight(0);
    }
  }, [isOpen, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="text-left">
      <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
          type="button"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm text-left flex items-center justify-between transition-all duration-200 hover:border-gray-400"
          style={style}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? '' : 'text-gray-500'}>
            {displayText}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Content */}
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-hidden transition-all duration-300 ease-out"
          style={{
            maxHeight: `${maxHeight}px`,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <div
            ref={dropdownContentRef}
            className="overflow-y-auto scrollbar-hide"
            style={{ maxHeight: '300px' }}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                className={`w-full px-4 py-3 text-left text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 ${
                  value === option.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                }`}
                onClick={() => handleOptionSelect(option.value)}
                style={{
                  animationDelay: `${index * 20}ms`,
                  animation: isOpen ? 'slideInOption 0.3s ease-out forwards' : 'none'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInOption {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

const FindTutor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    subject: '',
    levelOfEducation: '',
    location: '',
    priceRange: '',
    gender: ''
  });
  
  // Show tutor results based on URL parameters or search
  const [showResults, setShowResults] = useState(false);
  
  // Check if accessed from parent dashboard
  const urlParams = new URLSearchParams(location.search);
  const isFromParentDashboard = urlParams.get('source') === 'parent-dashboard';
  
  // Handle back button click
  const handleBackClick = () => {
    navigate('/parent-dashboard');
  };
  
  // Mock tutors data - replace with actual data from API
  const tutors = [
    {
      id: 1,
      name: "Ahmad Khan",
      subject: "Mathematics",
      experience: "5+ years",
      rating: 4.9,
      reviews: 45,
      hourlyRate: "Rs. 1,500/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in Mathematics", "5+ years teaching experience"]
    },
    {
      id: 2,
      name: "Sara Mustafa",
      subject: "Chemistry",
      experience: "7+ years",
      rating: 4.8,
      reviews: 28,
      hourlyRate: "Rs. 1,800/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in English", "7+ years teaching experience"]
    },
    {
      id: 3,
      name: "Hamraaz Ali",
      subject: "Physics",
      experience: "6+ years",
      rating: 4.9,
      reviews: 120,
      hourlyRate: "Rs. 2,000/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in Chemistry", "6+ years teaching experience"]
    },
    {
      id: 4,
      name: "Fazla Khalid",
      subject: "Computer Science",
      experience: "4+ years",
      rating: 4.7,
      reviews: 15,
      hourlyRate: "Rs. 2,200/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in Computer Science", "4+ years teaching experience"]
    },
    {
      id: 5,
      name: "Umar Khan",
      subject: "Mathematics",
      experience: "8+ years",
      rating: 4.8,
      reviews: 67,
      hourlyRate: "Rs. 1,600/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in Mathematics", "8+ years teaching experience"]
    },
    {
      id: 6,
      name: "Fahad Shaikh",
      subject: "Biology",
      experience: "5+ years",
      rating: 4.6,
      reviews: 32,
      hourlyRate: "Rs. 1,400/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in Biology", "5+ years teaching experience"]
    },
    {
      id: 7,
      name: "Laiba Ali",
      subject: "English",
      experience: "6+ years",
      rating: 4.9,
      reviews: 89,
      hourlyRate: "Rs. 1,300/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in English", "6+ years teaching experience"]
    },
    {
      id: 8,
      name: "Sidra Khan",
      subject: "Mathematics",
      experience: "4+ years",
      rating: 4.7,
      reviews: 23,
      hourlyRate: "Rs. 1,200/hr",
      image: "/api/placeholder/150/150",
      verified: true,
      specialties: ["MS in Mathematics", "4+ years teaching experience"]
    }
  ];

  // Options for dropdowns
  const subjectOptions = [
    { value: '', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'physics', label: 'Physics' },
    { value: 'biology', label: 'Biology' },
    { value: 'other', label: 'Other' }
  ];

  const educationLevelOptions = [
    { value: '', label: 'All Levels' },
    { value: 'primary', label: 'Primary (grades 1-5)' },
    { value: 'middle', label: 'Middle (grades 6-8)' },
    { value: 'secondary', label: 'Secondary (grades 9-10)' },
    { value: 'higher-secondary', label: 'Higher secondary (grades 11-12)' },
    { value: 'tertiary', label: 'Tertiary (university level)' },
    { value: 'other', label: 'Other' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'bahria-town-phase-1-6', label: 'Bahria Town Phase 1 to 6' },
    { value: 'bahria-town-phase-7-9', label: 'Bahria Town Phase 7 to 9' },
    { value: 'dha-phase-1', label: 'DHA Phase 1' },
    { value: 'dha-phase-2', label: 'DHA Phase 2' },
    { value: 'dha-phase-3', label: 'DHA Phase 3' },
    { value: 'other', label: 'Other' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'All Prices' },
    { value: '15000', label: '15,000' },
    { value: '20000', label: '20,000' },
    { value: '25000', label: '25,000' },
    { value: '30000', label: '30,000' },
    { value: '35000', label: '35,000' },
    { value: 'other', label: 'Other' }
  ];

  const genderOptions = [
    { value: '', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFindTutor = () => {
    setShowResults(true);
    // Scroll to results section
    setTimeout(() => {
      const element = document.getElementById('featured-tutors');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const handleViewProfile = (tutorId: number) => {
    navigate(`/tutor/${tutorId}`);
  };
  
  // Handle URL parameters and show results if coming from external link
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const hasParams = Array.from(urlParams.keys()).length > 0;
    
    if (hasParams) {
      // Set form data from URL parameters
      const newFormData = { ...formData };
      ['subject', 'levelOfEducation', 'location', 'priceRange', 'gender'].forEach(key => {
        const value = urlParams.get(key);
        if (value) {
          newFormData[key] = value;
        }
      });
      setFormData(newFormData);
      setShowResults(true);
      
      // Scroll to results if specified
      const scrollTo = urlParams.get('scrollTo');
      if (scrollTo === 'featured-tutors') {
        setTimeout(() => {
          const element = document.getElementById('featured-tutors');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  }, [location]);
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-sm ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button - only show when coming from parent dashboard */}
      {isFromParentDashboard && (
        <div className="text-white py-4" style={{ backgroundColor: '#003366' }}>
          <div className="px-4">
            <button
              onClick={handleBackClick}
              className="flex items-center text-white hover:text-gray-200 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span className="font-medium">Back to Parent Dashboard</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-white py-8 md:py-16" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Browse Tutors</h1>
          <p className="text-sm sm:text-base md:text-lg mb-8 px-2">
            <span className="block sm:inline">Discover experienced, verified tutors</span>
            <span className="block sm:inline"> specialized in your child's academic success.</span>
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              {/* Subject */}
              <AnimatedDropdown
                label="Subject"
                placeholder="Subject"
                options={subjectOptions}
                value={formData.subject}
                onChange={(value) => handleInputChange('subject', value)}
                style={{ color: '#003366' }}
              />

              {/* Level of Education */}
              <AnimatedDropdown
                label="Level of Education"
                placeholder="Level of Education"
                options={educationLevelOptions}
                value={formData.levelOfEducation}
                onChange={(value) => handleInputChange('levelOfEducation', value)}
                style={{ color: '#003366' }}
              />

              {/* Location */}
              <AnimatedDropdown
                label="Location"
                placeholder="Location"
                options={locationOptions}
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                style={{ color: '#003366' }}
              />

              {/* Price Range */}
              <AnimatedDropdown
                label="Price Range"
                placeholder="Price Range"
                options={priceRangeOptions}
                value={formData.priceRange}
                onChange={(value) => handleInputChange('priceRange', value)}
                style={{ color: '#003366' }}
              />

              {/* Gender */}
              <AnimatedDropdown
                label="Gender"
                placeholder="Gender"
                options={genderOptions}
                value={formData.gender}
                onChange={(value) => handleInputChange('gender', value)}
                style={{ color: '#003366' }}
              />
            </div>

            {/* Find a Tutor Button */}
            <button 
              onClick={handleFindTutor}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out"
            >
              Find a Tutor
            </button>
          </div>
        </div>
      </section>

      {/* Finding Perfect Tutor Section */}
      <section className="text-white py-16" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold mb-8 text-green-400">
            Finding the perfect tutor for your child is just a few steps away
          </h2>

          {/* Mobile Layout */}
          <div className="block md:hidden max-w-sm mx-auto text-left">
            <div className="relative">
              {/* Continuous vertical line - connects steps 1-4, stops at step 4 */}
              <div className="absolute left-7 top-14 w-0.5 bg-white opacity-40" style={{ height: 'calc(100% - 130px)' }}></div>
              
              {/* Step 1 */}
              <div className="flex items-start relative mb-20">
                <div className="relative mr-5">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl font-bold relative z-10" style={{ color: '#003366' }}>
                    1
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold mb-2 text-green-400">Search for Tutors</h3>
                  <p className="text-sm text-white leading-relaxed">
                    Browse through our extensive database of verified tutors using multiple filters to find the perfect match
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start relative mb-20">
                <div className="relative mr-5">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl font-bold relative z-10" style={{ color: '#003366' }}>
                    2
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold mb-2 text-green-400">Book a Session</h3>
                  <p className="text-sm text-white leading-relaxed">
                    Select your preferred date and time from the tutor's available slots and send a booking request
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start relative mb-20">
                <div className="relative mr-5">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl font-bold relative z-10" style={{ color: '#003366' }}>
                    3
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold mb-2 text-green-400">Confirm & Pay</h3>
                  <p className="text-sm text-white leading-relaxed">
                    Once the tutor confirms your booking, make a secure payment through our platform
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start">
                <div className="relative mr-5">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl font-bold relative z-10" style={{ color: '#003366' }}>
                    4
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold mb-2 text-green-400">Learn & Review</h3>
                  <p className="text-sm text-white leading-relaxed">
                    After the session, share your experience by leaving a review to help other parents
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="relative grid grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Connecting Lines - Desktop only */}
              <div className="absolute h-0.5 bg-white bg-opacity-40" style={{ top: '32px', left: '12.5%', right: '12.5%', width: '75%' }}></div>
              
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10" style={{ color: '#003366' }}>
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">Search for Tutors</h3>
                <p className="text-sm text-gray-300">
                  Browse through our extensive database of verified tutors across Pakistan in various subjects.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10" style={{ color: '#003366' }}>
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">Book a Session</h3>
                <p className="text-sm text-gray-300">
                  Select your preferred date and time from the tutor's available slots and send a booking request.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10" style={{ color: '#003366' }}>
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">Confirm & Pay</h3>
                <p className="text-sm text-gray-300">
                  Once the tutor accepts your booking, make a secure payment through our platform.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10" style={{ color: '#003366' }}>
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">Learn & Review</h3>
                <p className="text-sm text-gray-300">
                  After the session, share your experience by leaving a review to help other parents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pasdaan Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Why Choose Pasdaan?</h2>
            <p className="text-gray-600">
              We're committed to providing the best tutoring experience in Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Verified Tutors</h3>
              <p className="text-gray-600 text-sm">
                All tutors undergo a thorough verification process to ensure they are qualified, experienced, and trustworthy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Easy booking system allows you to find tutors available at any time you need them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Secure Communication</h3>
              <p className="text-gray-600 text-sm">
                Browse comprehensive tutor profiles with qualifications, experience, teaching style, and parent reviews.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Secure Payments</h3>
              <p className="text-gray-600 text-sm">
                Communicate directly with tutors through our secure platform and messaging system.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Transparent Reviews</h3>
              <p className="text-gray-600 text-sm">
                All reviews using our intuitive collection system.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C17.696 8.249 18 9.1 18 10zM8.343 16.92l-.707-.707a1 1 0 011.414-1.414l.707.707a6.002 6.002 0 01-1.414 1.414zm2.83-11.586l.707.707a1 1 0 11-1.414 1.414l-.707-.707a6.002 6.002 0 011.414-1.414zm-.707 8.839L9.05 12.757a3 3 0 114.243-4.243l1.415 1.415A5.994 5.994 0 0110 16a5.994 5.994 0 01-4.828-2.485z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer support to assist you with any questions or issues you may have.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors Section - Show only when search is performed */}
      {showResults && (
        <section id="featured-tutors" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Desktop header with View All button */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#003366' }}>Search Results</h2>
                <p className="text-gray-600">Found {tutors.length} tutors matching your criteria</p>
              </div>
              <button className="text-white font-medium py-2 px-4 rounded-md text-sm" style={{ backgroundColor: '#003366' }}>
                View All
              </button>
            </div>

            {/* Mobile header without View All button */}
            <div className="block md:hidden mb-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#003366' }}>Search Results</h2>
              <p className="text-gray-600">Found {tutors.length} tutors matching your criteria</p>
            </div>

            {/* Tutors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tutors.map((tutor) => (
                <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={tutor.image} 
                      alt={tutor.name}
                      className="w-full h-48 object-cover"
                    />
                    {tutor.verified && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1" style={{ color: '#003366' }}>
                      {tutor.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{tutor.subject}</p>
                    
                    <div className="flex items-center mb-2">
                      {renderStars(tutor.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {tutor.rating} ({tutor.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {tutor.specialties.map((specialty, index) => (
                        <p key={index} className="text-xs text-gray-600">• {specialty}</p>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">{tutor.hourlyRate}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleViewProfile(tutor.id)}
                      className="w-full text-white font-medium py-2 px-4 rounded-md mt-3 transition duration-200 hover:bg-blue-800"
                      style={{ backgroundColor: '#003366' }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View All button - shown only on mobile after all profiles */}
            <div className="block md:hidden text-center mt-8">
              <button className="text-white font-medium py-3 px-6 rounded-md" style={{ backgroundColor: '#003366' }}>
                View All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-white pt-16 pb-4" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto text-center px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-green-400">Ready to Start Your Learning Journey?</h2>
          <p className="text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students across Pakistan who are achieving their academic 
            goals with the help of qualified tutors.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FindTutor;
