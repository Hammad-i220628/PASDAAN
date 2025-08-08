import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const TutorProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('About Me');

  // Scroll to top smoothly when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mock tutor data - in real app, you'd fetch this based on the ID
  const tutor = {
    id: 1,
    name: "Ahmed Khan",
    title: "Mathematics & Physics Tutor",
    location: "Lahore, Pakistan",
    experience: "5+ Years Experience",
    sessionsCompleted: "200+ Sessions Completed",
    verified: true,
    image: "/api/placeholder/150/150",
    rating: 4.9,
    reviews: 45,
    bio: "Passionate mathematics and physics tutor with over 6 years of experience teaching students from primary to university level. I believe in making complex concepts simple and enjoyable through practical examples and personalized teaching approaches. My teaching philosophy centers around building a strong foundation of concepts rather than rote memorization. I adapt my teaching style to match each student's learning pace and preferences, ensuring they not only pass exams but truly understand the subject material.",
    qualifications: [
      {
        degree: "MS in Physics",
        institution: "Lahore University of Management Sciences (LUMS)",
        year: "2018"
      },
      {
        degree: "BS in Mathematics",
        institution: "Punjab University",
        year: "2015"
      },
      {
        degree: "Advanced Teaching Certification",
        institution: "National Teaching Council",
        year: "2019"
      }
    ],
    subjects: ["Mathematics", "Physics", "Calculus", "Algebra", "Mechanics", "Trigonometry"],
    availability: "Weekdays 4-9 PM, Weekends 9 AM-6 PM",
    hourlyRate: "Rs. 1,500/hr",
    contactSupport: "+92 300 1234567"
  };

  const tabs = ['About Me', 'Reviews', 'Schedule', 'Pricing'];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'About Me':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-xl text-lg font-semibold mb-4 whitespace-nowrap" style={{ color: '#003366' }}>About Me</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{tutor.bio}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#003366' }}>Qualifications</h3>
              <div className="space-y-4">
                {tutor.qualifications.map((qual, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">{qual.degree}</h4>
                    <p className="text-gray-600">{qual.institution}</p>
                    <p className="text-gray-500 text-sm">{qual.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#003366' }}>Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'Reviews':
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Reviews section coming soon...</p>
          </div>
        );
      
      case 'Schedule':
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Schedule section coming soon...</p>
          </div>
        );
      
      case 'Pricing':
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Pricing section coming soon...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-lg ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-white py-8" style={{ backgroundColor: '#003366' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <img 
                src={tutor.image} 
                alt={tutor.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
              />
              {tutor.verified && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <span>✓</span>
                  <span>Verified Tutor</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{tutor.name}</h1>
              <p className="text-base text-gray-200 mb-3">{tutor.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{tutor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{tutor.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{tutor.sessionsCompleted}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <button 
                className="bg-white text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6a1 1 0 10-2 0v5.586l-1.293-1.293z" />
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span>Save Profile</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="bg-white">
            {/* Tab Navigation */}
            <div>
              <nav className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 md:px-6 py-4 text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab
                        ? 'border-b-3 border-green-500 text-gray-800 bg-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={activeTab === tab ? { borderBottomWidth: '3px', borderBottomColor: '#10B981' } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Action Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                >
                  Tutor Availability
                </button>
                <button 
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-md transition duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-white py-8" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {/* Company Info - Centered */}
            <div className="text-center mb-8">
              <div className="mb-4 flex justify-center">
                <img 
                  src="/logo.png" 
                  alt="Pasdaan Logo"
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 px-4">
                Connecting students with qualified tutors for personalized learning experiences.
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-300 hover:text-sky-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links and Support - Horizontal */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Quick Links */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">How It Works</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Find Tutors</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Become a Tutor</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Safety</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            {/* Contact - Centered */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">+923061797003</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">info@pasdaan.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">Islamabad, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <img 
                  src="/logo.png" 
                  alt="Pasdaan Logo"
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6">
                Connecting students with qualified tutors for personalized learning experiences.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-300 hover:text-sky-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Tutors</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Become a Tutor</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">+923061797003</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">info@pasdaan.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">Islamabad, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default TutorProfile;
