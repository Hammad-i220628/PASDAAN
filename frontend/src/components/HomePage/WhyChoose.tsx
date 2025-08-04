import React from 'react';
import { Users, Target, User, MessageSquare, Calendar, CreditCard } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    {
      icon: Users,
      title: "Verified Tutors",
      description: "All tutors undergo a thorough verification process to ensure they are qualified, experienced, and trustworthy."
    },
    {
      icon: Target,
      title: "Advanced Matching",
      description: "Our smart matching algorithm helps you find tutors that best match your child's learning needs and goals."
    },
    {
      icon: User,
      title: "Detailed Profiles",
      description: "Browse comprehensive tutor profiles with qualifications, experience, teaching style, and parent reviews."
    },
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      description: "Communicate directly with tutors through our secure in platform messaging system."
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book, reschedule, or cancel sessions with ease using our intuitive calendar system."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Process payments securely through our platform with multiple payment options."
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Why Choose Pasdaan?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the best learning experience with verified tutors and personalized approach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-900 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;