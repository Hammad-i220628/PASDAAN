import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const steps = [
    {
      number: 1,
      title: "Search & Discover Tutors",
      description: "Use our powerful search tools to find the perfect tutor based on your specific requirements and preferences.",
      features: [
        "Advanced filters for subject, location, price range & more",
        "Save favorites and get personalized recommendations",
        "Browse verified tutors with detailed profiles"
      ]
    },
    {
      number: 2,
      title: "Connect & Communicate",
      description: "Reach out to tutors directly through our secure in-platform messaging system to discuss your learning needs.",
      features: [
        "Private and secure messaging within Pasdaan",
        "Real-time notifications for new messages",
        "Secure file sharing for learning materials"
      ]
    },
    {
      number: 3,
      title: "Book Sessions",
      description: "Schedule tutoring sessions with your chosen tutor using our intuitive calendar system.",
      features: [
        "Visual calendar shows tutor availability",
        "Simple booking requests with quick confirmations",
        "Session reminders and easy rescheduling options"
      ]
    },
    {
      number: 4,
      title: "Pay Securely",
      description: "Make secure payments through our trusted payment system with multiple options designed for Pakistani users.",
      features: [
        "Multiple payment methods (EasyPaisa, JazzCash, Bank Transfer)",
        "Transparent pricing with no hidden fees",
        "Digital receipts and complete payment history"
      ]
    },
    {
      number: 5,
      title: "Learn & Review",
      description: "After completing sessions, share your experience to help other parents and recognize great tutors.",
      features: [
        "Post-session review system with star ratings",
        "Detailed feedback options for continuous improvement",
        "Build your child's educational journey with trusted tutors"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-white py-16" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3 whitespace-nowrap">
            Trust, Quality, Convenience
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 px-2">
            Connect with verified Pakistani tutors in just a few simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-6 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  {/* Number Circle - Mobile Optimized */}
                  <div className="text-white flex items-center justify-center w-16 flex-shrink-0" style={{ backgroundColor: '#003366' }}>
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#003366' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white pt-16 pb-8" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 text-green-400">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 leading-relaxed px-2">
            Join thousands of students across Pakistan who are achieving their academic 
            goals with the help of qualified tutors.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
