import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TutorsListing = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    subject: '',
    levelOfEducation: '',
    location: '',
    priceRange: '',
    gender: ''
  });

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

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewProfile = (tutorId: number) => {
    navigate(`/tutor/${tutorId}`);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="text-white py-12" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Browse Tutors</h1>
            <p className="text-sm md:text-lg text-gray-200">
              Discover experienced, verified tutors specialized in your child's academic success.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Subject */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ color: '#003366' }}
                  value={searchFilters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                >
                  <option value="">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="physics">Physics</option>
                  <option value="biology">Biology</option>
                  <option value="english">English</option>
                </select>
              </div>

              {/* Level of Education */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Level of Education</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ color: '#003366' }}
                  value={searchFilters.levelOfEducation}
                  onChange={(e) => handleFilterChange('levelOfEducation', e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="primary">Primary (grades 1-5)</option>
                  <option value="middle">Middle (grades 6-8)</option>
                  <option value="secondary">Secondary (grades 9-10)</option>
                  <option value="higher-secondary">Higher secondary (grades 11-12)</option>
                  <option value="tertiary">Tertiary (university level)</option>
                </select>
              </div>

              {/* Location */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ color: '#003366' }}
                  value={searchFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">All Locations</option>
                  <option value="bahria-town-phase-1-6">Bahria Town Phase 1 to 6</option>
                  <option value="bahria-town-phase-7-9">Bahria Town Phase 7 to 9</option>
                  <option value="dha-phase-1">DHA Phase 1</option>
                  <option value="dha-phase-2">DHA Phase 2</option>
                  <option value="dha-phase-3">DHA Phase 3</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Price Range</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ color: '#003366' }}
                  value={searchFilters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="15000">Rs. 15,000</option>
                  <option value="20000">Rs. 20,000</option>
                  <option value="25000">Rs. 25,000</option>
                  <option value="30000">Rs. 30,000</option>
                  <option value="35000">Rs. 35,000</option>
                </select>
              </div>

              {/* Gender */}
              <div className="text-left">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  style={{ color: '#003366' }}
                  value={searchFilters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="text-center mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out">
              Search Tutors
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Desktop header with View All button */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#003366' }}>Featured Tutors</h2>
              <p className="text-gray-600">Meet our highly-rated tutors who are making a difference in students' lives</p>
            </div>
            <button className="text-white font-medium py-2 px-4 rounded-md text-sm" style={{ backgroundColor: '#003366' }}>
              View All
            </button>
          </div>

          {/* Mobile header without View All button */}
          <div className="block md:hidden mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#003366' }}>Featured Tutors</h2>
            <p className="text-gray-600">Meet our highly-rated tutors who are making a difference in students' lives</p>
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

      {/* CTA Section */}
      <section className="text-white py-12" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto text-center px-4">
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-green-400">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-sm md:text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of students across Pakistan who are achieving their academic goals with the help of qualified tutors.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TutorsListing;
