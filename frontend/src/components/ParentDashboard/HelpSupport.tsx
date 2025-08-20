import React from 'react';

const HelpSupport = () => {
  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 w-full min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-2 truncate">Help & Support</h1>
          <p className="text-sm sm:text-base text-gray-600 break-words">Everything you need to know about finding tutors, managing your children's education, and using Pasdaan as a parent.</p>
        </div>

        {/* Support Categories */}
        <section className="py-6 sm:py-8 lg:py-12 px-0 sm:px-0 lg:px-0">
          <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12" style={{ color: '#003366' }}>How Can We Help You?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Finding the Right Tutor</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn how to search for qualified tutors, check their credentials, and choose the best match for your child's learning needs.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Booking & Scheduling</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Understand how to book sessions, manage schedules, handle cancellations, and set up recurring lessons for your children.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Payments & Billing</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Get information about payment methods, billing cycles, refunds, and managing multiple children's tuition expenses.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Monitoring Progress</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Track your children's academic progress, view session reports, and communicate effectively with tutors about learning goals.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Safety & Security</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn about our safety measures, parental controls, session monitoring, and how to ensure a secure learning environment.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Managing Multiple Children</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Tips for organizing schedules, payments, and progress tracking when you have multiple children using the platform.</p>
            </div>
          </div>
          </div>
        </section>

        {/* FAQs Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#003366' }}>Frequently Asked Questions for Parents</h2>
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
                <span>How do I find the right tutor for my child?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Use our filter system to search by subject, grade level, experience, and location. Read tutor profiles, check their qualifications and reviews from other parents. You can also contact tutors directly to discuss your child's specific needs before booking a session.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>Are all tutors on Pasdaan verified and background checked?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Yes, all tutors go through a comprehensive verification process including ID verification, educational credential checks, and background screening. Look for the "Verified" badge on tutor profiles to ensure they've completed our verification process.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I book and pay for tutoring sessions?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Select your preferred tutor, choose available time slots, and complete the booking. Payment is processed securely through our platform using credit/debit cards or mobile wallets. You only pay after the session is completed successfully.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>Can I monitor my child's tutoring sessions?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Yes! You can enable session recording in your parental controls, receive progress reports after each session, and communicate with tutors through our messaging system. You'll also get weekly progress summaries via email.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>What if I'm not satisfied with a tutor or session?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>If you're not satisfied with a session, contact our support team within 24 hours. We offer refunds for unsatisfactory sessions and can help you find a better-matched tutor. Your satisfaction and your child's learning experience are our top priorities.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I manage schedules for multiple children?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Create separate profiles for each child in your parent dashboard. You can view all upcoming sessions in one calendar, set individual schedules, and manage payments for all children from a single account. Use our family plan for discounted rates on multiple bookings.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>What safety measures are in place for online tutoring?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>All sessions are conducted through our secure platform with built-in monitoring tools. Parents can enable session recording, set communication restrictions, approve tutor contacts, and receive real-time notifications. Our AI monitors sessions for inappropriate content.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How can I track my child's academic progress?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Access detailed progress reports in your dashboard showing session summaries, homework completion, test scores, and tutor feedback. You'll receive weekly progress emails and can schedule parent-tutor meetings to discuss your child's development.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>What if my child needs to cancel or reschedule a session?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Sessions can be cancelled or rescheduled up to 2 hours before the start time without penalty. For cancellations with less notice, a 50% fee applies. Emergency cancellations due to illness or family emergencies are handled case-by-case by our support team.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I set up parental controls and restrictions?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Go to Settings Parental Controls to configure communication restrictions, session time limits, content filters, and approval requirements. You can require approval for all tutor contacts, limit session duration, and set allowed tutoring hours.</p>
              </div>
            </details>
          </div>
        </div>


        {/* Contact Support Section */}
        <section className="text-white py-8 sm:py-12 lg:py-16 rounded-lg" style={{ backgroundColor: '#003366' }}>
          <div className="max-w-7xl mx-auto text-center px-3 sm:px-4 lg:px-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-3 sm:mb-4">Still Need Help?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">Our parent support team is available 24/7 to help you with any questions about your child's education journey on Pasdaan.</p>
            

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open('https://wa.me/+923061797003', '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                Contact Parent Support
              </button>
              <button className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 w-full sm:w-auto">
                Join Parent Community
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpSupport;
