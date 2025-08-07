import React from 'react';
import { DollarSign, Shield, Smartphone, User, Search, Calendar } from 'lucide-react';

const BecomeATutor = () => {
  const whyJoinFeatures = [
    {
      icon: DollarSign,
      title: "Earn Commands",
      description: "Receive payments securely through our platform with transparent fee structure and reliable payout schedules."
    },
    {
      icon: Shield,
      title: "Trusted Reputation",
      description: "Build a trusted reputation with verified profiles and collect reviews to attract more students."
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly Platform",
      description: "Manage your tutoring business on the go with our dedicated mobile apps for iOS and Android."
    },
    {
      icon: User,
      title: "Create Your Professional Profile",
      description: "Showcase your qualifications, experience, and teaching style with a verified profile that can be found online."
    },
    {
      icon: Search,
      title: "Get Discovered",
      description: "Our smart matching system connects you with students who need your specific expertise and teaching style."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Set your own availability and manage bookings efficiently through our intuitive scheduling system."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Set up your comprehensive profile with your personal information, qualifications, experience, subjects you teach, hourly rate, and availability schedule."
    },
    {
      step: "2", 
      title: "Complete Verification",
      description: "Upload your credentials and identification documents so our trusted tutors. Once verified, your profile will display a trust badge with parents."
    },
    {
      step: "3",
      title: "Receive Booking Requests",
      description: "Parents and students can discover you through browsing based on your expertise and availability. Receive custom fit from booking request via email."
    },
    {
      step: "4",
      title: "Accept Bookings & Teach",
      description: "Review and accept booking requests, communicate with parents through our secure messaging system, and conduct your tutoring sessions."
    },
    {
      step: "5",
      title: "Get Paid & Grow",
      description: "Receive secure payments for completed sessions, collect positive reviews from satisfied parents, and build your reputation to attract more students."
    }
  ];

  const featureCategories = [
    {
      title: "Profile Management",
      features: [
        "Create profile, mentorship program support",
        "Upload teaching experience and certificates",
        "Profile visibility control",
        "Online consultation capability"
      ]
    },
    {
      title: "Schedule Management", 
      features: [
        "Interactive availability calendar",
        "Custom lesson time slot session",
        "Booking request management system",
        "Session tracking and history"
      ]
    },
    {
      title: "Discovery & Visibility",
      features: [
        "AI-powered matching with students",
        "SEO-optimized profiles for better discovery",
        "Real-time enquiry notifications",
        "Featured tutor opportunities"
      ]
    },
    {
      title: "Payment & Communication",
      features: [
        "Secure payment processing",
        "Clear earnings dashboard and payout",
        "In-platform secure messaging",
        "Review collection and display"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-white py-10 relative" style={{ backgroundColor: '#003366' }}>
        {/* Diagonal green area spanning full height - moved before content */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <svg className="absolute block w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M900,0 L300,400 L1200,400 L1200,0 Z" fill="#10b981" opacity="0.15"></path>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl ml-4 sm:ml-8 lg:ml-16">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
              Become a Tutor
            </h1>
            <p className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed">
              Share your knowledge, build your reputation, and grow your<br/>
              tutoring business with Pakistan's trusted education platform.
            </p>
            <a href="/tutor-application" className="relative z-20 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded transition-colors duration-200 text-sm sm:text-base inline-block">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Why Join Pasdaan Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>
              Why Join Pasdaan?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyJoinFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>
              How It Works
            </h2>
          </div>

          <div className="relative">
            <div className="space-y-0">
              {steps.map((stepItem, index) => (
                <div key={index} className="flex items-start relative pb-8 last:pb-0">
                  {/* Vertical line connecting steps (only show line below if not the last step) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-10 w-px bottom-0 bg-gray-300"></div>
                  )}
                  
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0 w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6 relative z-10" style={{ backgroundColor: '#003366' }}>
                    {stepItem.step}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {stepItem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>
              Platform Features for Tutors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="text-white p-4" style={{ backgroundColor: '#003366' }}>
                  <h3 className="text-sm font-semibold text-center">
                    {category.title}
                  </h3>
                </div>
                
                {/* Features List */}
                <div className="p-4">
                  <ul className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1 text-xs">•</span>
                        <span className="text-gray-700 text-xs leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-white py-12" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 text-green-400">
            Ready to Start Your Tutoring Journey?
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 max-w-3xl mx-auto">
            Join thousands of students across Pakistan who are achieving their academic 
            goals with the help of qualified tutors.
          </p>
          <a href="/tutor-application" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded transition-colors duration-200 inline-block">
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default BecomeATutor;
