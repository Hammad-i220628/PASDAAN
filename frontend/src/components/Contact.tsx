import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-white py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-7xl mx-auto text-center px-3 sm:px-4 lg:px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">Help & Support</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">Find answers to your questions about Pasdaan's tutoring platform. Browse our FAQs or contact our support team for assistance.</p>
        </div>
      </section>
      {/* Support Categories */}
      <section className="py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12" style={{ color: '#003366' }}>How Can We Help You?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Parents Guide</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Help for parents using Pasdaan to find tutors, book sessions, and manage their children's learning.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Tutor Resources</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Guidance for tutors on creating profiles, managing bookings, and receiving payments.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Booking & Sessions</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn how to book tutoring sessions, reschedule, or cancel appointments.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Payments & Billing</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Information about payment methods, fees, and billing processes.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Student Dashboard</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Help with accessing and using the student dashboard features.</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Account Settings</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Manage your account details, profiles, and notification preferences.</p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#003366' }}>Frequently Asked Questions</h2>
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
                <span>How do I find a tutor for my child?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>You can find a tutor by using our advanced search filters. Select your preferred subject, location, price range, and availability. You can also filter by tutor gender, qualifications, and experience level. Browse through the tutor profiles, read reviews, and check their verification status before making your selection.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How does the verification process work for tutors?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>All tutors on Pasdaan go through a multi-step verification process. This includes identity verification using government-issued ID, qualification verification through degree certificates, and a manual review by our admin team. Verified tutors display a "Verified" badge on their profiles for easy identification.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I book a tutoring session?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>To book a session, find a tutor you like and view their availability calendar. Select your preferred date and time slot, then send a booking request. The tutor will receive your request and can accept or decline. Once accepted, you'll receive a booking confirmation and the session will be added to your dashboard.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>What payment methods are accepted?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>Pasdaan accepts various payment methods including digital wallets (EasyPaisa, JazzCash), bank transfers, and credit/debit cards. All payments are processed securely through our platform, and you'll receive digital receipts for all transactions.</p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                <span>How do I access the student dashboard?</span>
                <span className="faq-plus">+</span>
              </summary>
              <div className="faq-content">
                <p>The student dashboard is accessible through the parent account. After logging in, you'll see links to individual dashboards for each of your children. Here, students can view homework assignments, test results, and resources shared by their tutors.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Support Call to Action */}
      <section className="text-white py-8 sm:py-12 lg:py-16" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-7xl mx-auto text-center px-3 sm:px-4 lg:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-3 sm:mb-4">Still Need Help?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">Our support team is available to assist you with any questions or concerns you may have about using Pasdaan.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 shadow-lg hover:shadow-xl">Contact Support</button>
        </div>
      </section>
    </div>
  );
};

export default Contact;

