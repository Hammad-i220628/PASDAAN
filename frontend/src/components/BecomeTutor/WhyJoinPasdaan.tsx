import React from 'react';
import { DollarSign, Shield, Smartphone, User, Search, Calendar } from 'lucide-react';

const WhyJoinPasdaan = () => {
  const features = [
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>
            Why Join Pasdaan?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
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
  );
};

export default WhyJoinPasdaan;
