import React from 'react';

const PlatformFeatures = () => {
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
  );
};

export default PlatformFeatures;
