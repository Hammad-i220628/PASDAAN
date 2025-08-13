import React from 'react';

const HelpSupport = () => {
  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 w-full min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-2 truncate">Help & Support</h1>
          <p className="text-sm sm:text-base text-gray-600 break-words">Everything you need to know about managing your tutor profile, sessions, and earnings on Pasdaan.</p>
        </div>

        {/* Support Categories */}
        <section className="py-6 sm:py-8 lg:py-12 px-0 sm:px-0 lg:px-0">
          <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12" style={{ color: '#003366' }}>How Can We Help You?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Profile Setup</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn how to create an attractive tutor profile, add qualifications, and get verified to attract more students.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Managing Sessions</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Understand how to manage booking requests, schedule sessions, and handle cancellations or rescheduling.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Earnings & Payments</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Get information about payment schedules, commission rates, and how to withdraw your earnings.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Student Communication</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Best practices for communicating with students and parents through the platform messaging system.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Reviews & Ratings</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Tips on maintaining high ratings and handling student feedback to improve your tutoring reputation.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Technical Support</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Troubleshooting guide for common technical issues and platform features.</p>
            </div>
          </div>
          </div>
        </section>

        {/* FAQs Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#003366' }}>Frequently Asked Questions for Tutors</h2>
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
            <style>
              {`
                .faq-item {
                  border-bottom: 1px solid #e5e7eb;
                  padding: 0.75rem 0;
                }
                .faq-summary {
                  cursor: pointer;
                  font-weight: 600;
                  color: #003366;
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  outline: none;
                  list-style: none;
                  font-size: 0.875rem;
                  line-height: 1.5;
                  gap: 1rem;
                }
                @media (min-width: 640px) {
                  .faq-summary {
                    font-size: 1rem;
                    align-items: center;
                  }
                  .faq-item {
                    padding: 1rem 0;
                  }
                }
                .faq-summary::-webkit-details-marker {
                  display: none;
                }
                .faq-plus {
                  font-size: 1.25rem;
                  font-weight: bold;
                  color: #003366;
                  transition: transform 0.2s;
                  flex-shrink: 0;
                  margin-top: 0.125rem;
                }
                @media (min-width: 640px) {
                  .faq-plus {
                    font-size: 1.5rem;
                    margin-top: 0;
                  }
                }
                details[open] .faq-plus {
                  transform: rotate(45deg);
                }
                .faq-content {
                  margin-top: 0.75rem;
                  color: #6b7280;
                  line-height: 1.6;
                  font-size: 0.875rem;
                  padding-right: 0;
                }
                @media (min-width: 640px) {
                  .faq-content {
                    margin-top: 1rem;
                    font-size: 1rem;
                    padding-right: 2rem;
                  }
                }
              `}
            </style>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I get verified as a tutor?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>To get verified, complete your profile with accurate information, upload clear photos of your educational certificates and government-issued ID. Our admin team will review your documents within 2-3 business days. Once verified, you'll get a "Verified" badge on your profile which helps build trust with potential students.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I set my availability and rates?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Go to your Settings page and click on the "Availability" tab to set your weekly schedule. You can set different time slots for each day and mark yourself as available or unavailable. For rates, visit your Profile section where you can set hourly rates for different subjects and grade levels.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>When and how do I receive payments?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Payments are processed weekly every Friday. After deducting our 15% platform commission, the remaining amount is transferred to your registered bank account or mobile wallet. You can track all your earnings and payment history in the "Earnings" section of your dashboard.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>What should I do if a student doesn't show up for a session?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>If a student doesn't show up within 15 minutes of the scheduled time, mark the session as "No Show" in your dashboard. You'll still receive full payment for the session. Try to contact the student/parent through our messaging system to reschedule if needed.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How can I improve my profile ranking and get more bookings?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>To improve your ranking: 1) Complete your profile 100% with detailed bio and qualifications, 2) Get verified quickly, 3) Maintain a high response rate to booking requests, 4) Collect positive reviews from students, 5) Keep your availability updated, and 6) Upload a professional profile photo.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>Can I teach multiple subjects and grade levels?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Yes! You can add multiple subjects and specify which grade levels you're comfortable teaching for each subject. This increases your visibility to more students. Make sure to set appropriate rates for different subjects and grade levels based on complexity and your expertise.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I handle difficult students or parents?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Always maintain professionalism and patience. Use our messaging system for all communications to keep records. If issues persist, contact our support team through the platform. For serious concerns about inappropriate behavior, report immediately. You have the right to decline future sessions with problematic students.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>What resources are available to help me teach better?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Visit the "Resources" section in your dashboard for teaching materials, curriculum guides, and educational tools. We regularly update this section with helpful content. You can also join our tutor community forums to share experiences and get tips from experienced tutors.</p>
              </div>
            </details>
          </div>
        </div>

        {/* Support Call to Action */}
        <section className="text-white py-8 sm:py-12 lg:py-16 rounded-lg" style={{ backgroundColor: '#003366' }}>
          <div className="max-w-7xl mx-auto text-center px-3 sm:px-4 lg:px-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-3 sm:mb-4">Still Need Help?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">Our tutor support team is here to help you succeed. Contact us for personalized assistance with your tutoring journey.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                Contact Tutor Support
              </button>
              <button className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 w-full sm:w-auto">
                Join Tutor Community
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpSupport;
