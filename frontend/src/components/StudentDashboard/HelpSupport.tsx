import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Menu } from 'lucide-react';
import StudentSidebar from './StudentSidebar';

const HelpSupport = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Sample student data
  const studentProfiles = [
    {
      id: 1,
      name: 'Ali',
      grade: 'Grade 8 • Age 13',
      school: 'City School North Campus',
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Fatima',
      grade: 'Grade 10 • Age 16',
      school: 'Beaconhouse School',
      avatar: 'F'
    }
  ];

  const currentStudent = studentProfiles.find(s => s.id.toString() === studentId);

  // Smooth scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Redirect to student dashboard if no studentId
    if (!studentId) {
      navigate('/student-dashboard');
    }
  }, [studentId, navigate]);

  const handleBackToParent = () => {
    navigate('/parent-dashboard?section=student-dashboard');
  };

  if (!currentStudent) {
    // If student not found, redirect to parent dashboard
    React.useEffect(() => {
      navigate('/parent-dashboard');
    }, [navigate]);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header with Student Welcome - Fixed */}
      <div className="bg-blue-900 text-white px-4 md:px-6 py-4 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={handleBackToParent} className="p-2 hover:bg-blue-800 rounded-lg transition-colors mr-2 md:mr-4">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-lg md:text-xl font-bold">Welcome back, {currentStudent.name}!</h1>
          </div>
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add top padding to account for fixed header */}
      <div className="pt-16">
        <div className="flex min-h-screen">
          <StudentSidebar
            studentId={studentId}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-60 bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 sm:mb-8 w-full min-w-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-2 truncate">Help & Support</h1>
                <p className="text-sm sm:text-base text-gray-600 break-words">Everything you need to know about using Pasdaan for your learning journey, managing your studies, and getting the most out of your tutoring sessions.</p>
              </div>

              {/* Support Categories */}
              <section className="py-6 sm:py-8 lg:py-12 px-0 sm:px-0 lg:px-0">
                <div className="max-w-7xl mx-auto">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-12" style={{ color: '#003366' }}>How Can We Help You Learn Better?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Getting Started</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn how to navigate your dashboard, update your profile, set learning goals, and connect with your tutors effectively.</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Attending Sessions</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Tips for joining online sessions, using the interactive tools, participating actively, and making the most of your tutoring time.</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Homework & Assignments</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn how to submit homework, track assignments, get feedback from tutors, and manage your study schedule effectively.</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Study Tools & Resources</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Discover available study materials, practice exercises, educational videos, and other resources to enhance your learning.</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Communication</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Learn how to message your tutors, ask questions, share concerns, and communicate with parents about your progress.</p>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: '#003366' }}>Account & Settings</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Manage your profile, notification preferences, study reminders, and privacy settings to personalize your learning experience.</p>
                  </div>
                </div>
                </div>
              </section>

              {/* FAQs Section */}
              <div className="max-w-7xl mx-auto mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#003366' }}>Frequently Asked Questions for Students</h2>
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
                      <span>How do I join my tutoring sessions?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>You'll receive a notification and email reminder before your session. Click "Join Session" from your dashboard or the email link. Make sure you have a stable internet connection and your camera/microphone are working properly.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>What should I do if I'm having trouble understanding a topic?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Don't hesitate to ask questions during your sessions! You can also message your tutor between sessions, access additional study materials in your dashboard, or request extra practice exercises on topics you find challenging.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>How do I submit my homework and assignments?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Go to your "Home Work" section in the dashboard. You can upload files, take photos of written work, or type your answers directly. Submit before the deadline to receive feedback from your tutor.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>Can I message my tutor outside of session times?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Yes! Use the Messages section to ask questions, clarify doubts, or discuss your progress with your tutors. They typically respond within a few hours during their working hours.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>How can I track my academic progress?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Check your "Results" section to see grades, progress reports, and tutor feedback. You can view your improvement over time and identify areas that need more attention.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>What if I need to miss a tutoring session?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Let your tutor and parents know as soon as possible. Sessions can usually be rescheduled if you give enough notice. If you're sick or have an emergency, contact support for help with rescheduling.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>How do I set up my study schedule?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Use the "Schedule" section to view your upcoming sessions, set study reminders, and plan your homework time. You can also coordinate with your parents to find the best times for your tutoring sessions.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>What study materials and resources are available?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Access practice worksheets, educational videos, interactive exercises, and subject-specific resources in your "My Courses" section. Your tutors may also share additional materials during sessions.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>How can I prepare for my tutoring sessions?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Review previous session notes, complete any assigned homework, prepare questions about topics you find difficult, and ensure your learning space is quiet and free from distractions.</p>
                    </div>
                  </details>
                  <details className="faq-item">
                    <summary className="faq-summary">
                      <span>What should I do if I'm facing technical issues?</span>
                      <span className="faq-plus">+</span>
                    </summary>
                    <div className="faq-content">
                      <p>Try refreshing your browser first. If problems persist, contact our student support team immediately. We can help with connection issues, audio/video problems, or accessing your materials.</p>
                    </div>
                  </details>
                </div>
              </div>

              {/* Contact Support Section */}
              <section className="text-white py-8 sm:py-12 lg:py-16 rounded-lg" style={{ backgroundColor: '#003366' }}>
                <div className="max-w-7xl mx-auto text-center px-3 sm:px-4 lg:px-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-3 sm:mb-4">Need Help with Your Studies?</h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">Our student support team is here to help you succeed in your learning journey. Don't hesitate to reach out!</p>
                  

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                      onClick={() => window.open('https://wa.me/+923061797003', '_blank')}
                      className="bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                      Contact Student Support
                    </button>
                    <button className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 w-full sm:w-auto">
                      Join Study Community
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
