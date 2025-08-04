import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "Can I enroll in multiple courses at once?",
      answer: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience."
    },
    {
      question: "Enrollment Process for Different Courses",
      answer: "Our enrollment process is simple and streamlined. You can browse courses, select your preferred tutor, choose a schedule, and complete the registration in just a few clicks."
    },
    {
      question: "What kind of support can I expect from instructors?",
      answer: "Our instructors provide comprehensive support including personalized guidance, regular feedback, and assistance with assignments and projects."
    },
    {
      question: "Are the courses self-paced or do they have specific start and end dates?",
      answer: "We offer both options. You can choose self-paced courses for flexibility or join scheduled courses with specific timelines based on your preference."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Prerequisites vary by subject and level. Each course clearly lists any requirements, and our matching system helps you find appropriate courses for your current level."
    },
    {
      question: "Can I download the course materials for offline access?",
      answer: "Yes, most course materials are available for download so you can access them offline and study at your convenience."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Title, Contact Info and FAQ Image */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-6">
                Still you have any questions? Contact our Team via support@pasdaan.com
              </p>
              <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors">
                See All FAQ's
              </button>
            </div>
            
            {/* FAQ Image at bottom of left side */}
            <div className="hidden lg:flex justify-start items-end">
              <div className="w-full max-w-sm">
                <img 
                  src="/public/FAQ.png" 
                  alt="Frequently Asked Questions Illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Questions */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-medium text-gray-900 text-base">{faq.question}</span>
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ml-4">
                    <Plus className="w-5 h-5 text-green-600" />
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 mt-3">{faq.answer}</p>
                    {index === 1 && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100">
                        <span className="font-medium text-gray-700">Enrollment Process for Different Courses</span>
                        <span className="text-gray-400">→</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;