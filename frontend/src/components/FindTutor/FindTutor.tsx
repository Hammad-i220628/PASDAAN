import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindTutor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    levelOfEducation: '',
    location: '',
    priceRange: '',
    gender: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFindTutor = () => {
    // Navigate to tutors listing page with search parameters
    const searchParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
    
    // Add scroll parameter to navigate to featured tutors section
    searchParams.append('scrollTo', 'featured-tutors');
    
    navigate(`/tutors-listing?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-white py-16" style={{ backgroundColor: '#003366' }}>
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
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  style={{ color: '#003366' }}
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                >
                  <option value="" style={{ color: '#003366' }}>Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="physics">Physics</option>
                  <option value="biology">Biology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Level of Education */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Level of Education</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  style={{ color: '#003366' }}
                  value={formData.levelOfEducation}
                  onChange={(e) => handleInputChange('levelOfEducation', e.target.value)}
                >
                  <option value="" style={{ color: '#003366' }}>Level of Education</option>
                  <option value="primary">Primary (grades 1-5)</option>
                  <option value="middle">Middle (grades 6-8)</option>
                  <option value="secondary">Secondary (grades 9-10)</option>
                  <option value="higher-secondary">Higher secondary (grades 11-12)</option>
                  <option value="tertiary">Tertiary (university level)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  style={{ color: '#003366' }}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                >
                  <option value="" style={{ color: '#003366' }}>Location</option>
                  <option value="bahria-town-phase-1-6">Bahria Town Phase 1 to 6</option>
                  <option value="bahria-town-phase-7-9">Bahria Town Phase 7 to 9</option>
                  <option value="dha-phase-1">DHA Phase 1</option>
                  <option value="dha-phase-2">DHA Phase 2</option>
                  <option value="dha-phase-3">DHA Phase 3</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Price Range</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  style={{ color: '#003366' }}
                  value={formData.priceRange}
                  onChange={(e) => handleInputChange('priceRange', e.target.value)}
                >
                  <option value="" style={{ color: '#003366' }}>Price Range</option>
                  <option value="15000">15,000</option>
                  <option value="20000">20,000</option>
                  <option value="25000">25,000</option>
                  <option value="30000">30,000</option>
                  <option value="35000">35,000</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Gender */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  style={{ color: '#003366' }}
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="" style={{ color: '#003366' }}>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
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
