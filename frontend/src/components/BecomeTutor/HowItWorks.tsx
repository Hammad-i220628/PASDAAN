import React from 'react';

const HowItWorks = () => {
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>
            How It Works
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line connecting all steps */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gray-300"></div>
          
          <div className="space-y-8">
            {steps.map((stepItem, index) => (
              <div key={index} className="flex items-start relative">
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
  );
};

export default HowItWorks;
