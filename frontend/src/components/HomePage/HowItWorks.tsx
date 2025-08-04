import React from 'react';
import { Search, Users, Calendar, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Search",
      description: "Search for tutors based on subject, location, price, and other filters."
    },
    {
      number: 2,
      title: "Connect",
      description: "Message tutors directly to discuss your child's needs and learning goals."
    },
    {
      number: 3,
      title: "Book",
      description: "Schedule sessions at convenient times using our easy booking system."
    },
    {
      number: 4,
      title: "Learn",
      description: "Your child receives personalized in person tutoring to achieve academic success."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">How Pasdaan Works</h2>
          <p className="text-xl text-gray-600">Find the perfect tutor in just a few simple steps</p>
        </div>

        <div className="relative">
          {/* Connecting line background */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-blue-900 hidden lg:block"></div>
          
          <div className="flex justify-center items-start space-x-8 lg:space-x-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center max-w-xs relative">
                <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-4 relative z-10">
                  <span className="text-xl font-bold text-teal-400">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
