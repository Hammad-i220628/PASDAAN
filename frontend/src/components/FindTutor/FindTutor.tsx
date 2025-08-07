import React, { useState } from 'react';

const FindTutor = () => {
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
    // Handle the find tutor logic here
    console.log('Search criteria:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-white py-16" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Browse Tutors</h1>
          <p className="text-lg mb-8">
            Discover experienced, verified tutors specialized in your child's<br />
            academic success.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
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
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="english">English</option>
                  <option value="urdu">Urdu</option>
                  <option value="computer-science">Computer Science</option>
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
                  <option value="primary">Primary (1-5)</option>
                  <option value="middle">Middle (6-8)</option>
                  <option value="secondary">Secondary (9-10)</option>
                  <option value="higher-secondary">Higher Secondary (11-12)</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
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
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="faisalabad">Faisalabad</option>
                  <option value="multan">Multan</option>
                  <option value="online">Online</option>
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
                  <option value="1000-2000">PKR 1,000 - 2,000</option>
                  <option value="2000-3000">PKR 2,000 - 3,000</option>
                  <option value="3000-5000">PKR 3,000 - 5,000</option>
                  <option value="5000-7000">PKR 5,000 - 7,000</option>
                  <option value="7000+">PKR 7,000+</option>
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
                  <option value="any">Any</option>
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

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Connecting Lines - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute h-0.5 bg-white bg-opacity-40" style={{ top: '32px', left: '12.5%', right: '12.5%', width: '75%' }}></div>
            
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
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Verified Tutors</h3>
              <p className="text-gray-600 text-sm">
                All tutors undergo a thorough verification process to ensure they are qualified, experienced, and trustworthy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                📅
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Easy booking system allows you to find tutors available at any time you need them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                💬
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
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                💳
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Secure Payments</h3>
              <p className="text-gray-600 text-sm">
                Communicate directly with tutors through our secure platform and messaging system.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>Transparent Reviews</h3>
              <p className="text-gray-600 text-sm">
                All reviews using our intuitive collection system.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#003366' }}>
                🎧
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#003366' }}>24/7 Support</h3>
              <p className="text-gray-600 text-sm"></p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white py-16" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-green-400">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students across Pakistan who are achieving their academic 
            goals with the help of qualified tutors.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FindTutor;
