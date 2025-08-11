import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookASession = () => {
  const { tutorId } = useParams();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed, so 2 = March)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<{day: number, month: number, year: number} | null>({
    day: 11,
    month: 2, // March
    year: 2025
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('3:00 PM');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('EasyPaisa');
  const [isProfileExpanded, setIsProfileExpanded] = useState(true);

  // Mock tutor data - in real app, fetch based on tutorId
  const tutor = {
    id: tutorId,
    name: "Ahmed Khan",
    title: "Mathematics, Physics Teacher",
    rating: 4.7,
    reviews: 102,
    verified: true,
    experience: "3+ years of tutoring experience",
    qualifications: "MS Mathematics, University of Karachi",
    subjects: "Mathematics, Physics, Statistics",
    teachingLevel: "O Levels, A Levels, Intermediate",
    location: "DHA Phase 5, Karachi",
    hourlyRate: 1500,
    image: "/api/placeholder/80/80"
  };

  const subjects = ['Mathematics', 'Physics', 'Statistics', 'Chemistry'];
  const levels = ['O Levels', 'A Levels', 'Intermediate', 'Matric'];
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM'
  ];
  const paymentMethods = [
    { id: 'easypaisa', name: 'EasyPaisa' },
    { id: 'jazzcash', name: 'JazzCash' },
    { id: 'banktransfer', name: 'Bank Transfer' }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Mock availability - in real app, this would come from API based on tutor's schedule
  const getAvailabilityForDate = (day: number, month: number, year: number) => {
    // For demo purposes, make certain dates available
    const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const unavailableDates = [
      '2025-03-03', '2025-03-05', '2025-03-15', '2025-03-16', '2025-03-17',
      '2025-03-22', '2025-03-23', '2025-03-24', '2025-03-29', '2025-03-30'
    ];
    
    // Past dates are unavailable
    const today = new Date();
    const checkDate = new Date(year, month, day);
    if (checkDate < today) {
      return false;
    }
    
    return !unavailableDates.includes(dateString);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add day headers
    const dayHeaders = dayNames.map(day => (
      <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
        {day}
      </div>
    ));

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        selectedDate.day === day && 
        selectedDate.month === currentMonth && 
        selectedDate.year === currentYear;
      const isAvailable = getAvailabilityForDate(day, currentMonth, currentYear);
      
      days.push(
        <div key={day} className="p-1">
          <div 
            className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer rounded smooth-transition ${
              isSelected 
                ? 'bg-blue-900 text-white' 
                : isAvailable 
                ? 'hover:bg-blue-50 text-gray-900 hover:scale-105'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => isAvailable && setSelectedDate({
              day,
              month: currentMonth,
              year: currentYear
            })}
          >
            {day}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {dayHeaders}
        {days}
      </div>
    );
  };

  const sessionDuration = 1; // hours
  const totalCost = tutor.hourlyRate * sessionDuration;

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
            max-height: 0;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            max-height: 2000px;
          }
        }
        
        @keyframes slideUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
            max-height: 2000px;
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
            max-height: 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .smooth-transition {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .ultra-smooth {
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .hover-smooth {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
      
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Tutor Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 ultra-smooth">
              {!isProfileExpanded ? (
                // Collapsed State
                <div className="cursor-pointer smooth-transition" onClick={() => setIsProfileExpanded(true)}>
                  {/* Dropdown Arrow */}
                  <div className="flex justify-end mb-4">
                    <svg className="w-5 h-5 text-gray-400 transform hover-smooth hover:text-gray-600 hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Collapsed Tutor Info */}
                  <div className="flex items-start mb-4">
                    <img 
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{tutor.name}</h3>
                      <p className="text-gray-500 mb-3 text-sm">{tutor.title}</p>
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full inline-block">
                        <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-600 text-sm font-medium">Verified Tutor</span>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed Rating */}
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      {tutor.rating % 1 !== 0 && (
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <defs>
                            <linearGradient id="half-collapsed">
                              <stop offset="50%" stopColor="currentColor" />
                              <stop offset="50%" stopColor="#D1D5DB" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#half-collapsed)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 text-gray-500">
                      {tutor.rating} ({tutor.reviews} reviews)
                    </span>
                  </div>
                </div>
              ) : (
                // Expanded State
                <div className="smooth-transition">
                  {/* Dropdown Arrow */}
                  <div className="flex justify-end mb-4">
                    <svg 
                      className="w-5 h-5 text-gray-400 cursor-pointer transform rotate-180 hover-smooth hover:text-gray-600 hover:scale-110"
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      onClick={() => setIsProfileExpanded(false)}
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Tutor Header */}
                  <div className="flex items-start mb-6 animate-fadeInUp">
                    <img 
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-20 h-20 rounded-full object-cover mr-4 transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 transition-colors duration-200">{tutor.name}</h3>
                      <p className="text-gray-500 mb-3 transition-colors duration-200">{tutor.title}</p>
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full inline-block transition-all duration-200 hover:bg-blue-100">
                        <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-600 text-sm font-medium">Verified Tutor</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-6 animate-fadeInUp" style={{animationDelay: '100ms'}}>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      {tutor.rating % 1 !== 0 && (
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <defs>
                            <linearGradient id="half">
                              <stop offset="50%" stopColor="currentColor" />
                              <stop offset="50%" stopColor="#D1D5DB" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 text-gray-500">
                      {tutor.rating} ({tutor.reviews} reviews)
                    </span>
                  </div>

                  {/* Tutor Details */}
                  <div className="space-y-6 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                    <div className="flex items-start transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -m-3" style={{animationDelay: '250ms'}}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 mt-1 transition-colors duration-200 hover:bg-blue-100">
                        <svg className="w-5 h-5 text-slate-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 transition-colors duration-200">Experience</p>
                        <p className="text-gray-500 transition-colors duration-200">5+ years of tutoring experience</p>
                      </div>
                    </div>

                    <div className="flex items-start transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -m-3 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 mt-1 transition-colors duration-200 hover:bg-blue-100">
                        <svg className="w-5 h-5 text-slate-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.909V17h2V9L12 3z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 transition-colors duration-200">Qualifications</p>
                        <p className="text-gray-500 transition-colors duration-200">MSc Mathematics, University of Karachi</p>
                      </div>
                    </div>

                    <div className="flex items-start transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -m-3 animate-fadeInUp" style={{animationDelay: '350ms'}}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 mt-1 transition-colors duration-200 hover:bg-blue-100">
                        <svg className="w-5 h-5 text-slate-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 transition-colors duration-200">Subjects</p>
                        <p className="text-gray-500 transition-colors duration-200">Mathematics, Physics, Statistics</p>
                      </div>
                    </div>

                    <div className="flex items-start transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -m-3 animate-fadeInUp" style={{animationDelay: '400ms'}}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 mt-1 transition-colors duration-200 hover:bg-blue-100">
                        <svg className="w-5 h-5 text-slate-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L21 9l-9-6zM18.82 9L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 transition-colors duration-200">Teaching Level</p>
                        <p className="text-gray-500 transition-colors duration-200">O-Levels, A-Levels, Intermediate</p>
                      </div>
                    </div>

                    <div className="flex items-start transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -m-3 animate-fadeInUp" style={{animationDelay: '450ms'}}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 mt-1 transition-colors duration-200 hover:bg-blue-100">
                        <svg className="w-5 h-5 text-slate-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 transition-colors duration-200">Location</p>
                        <p className="text-gray-500 transition-colors duration-200">DHA Phase 5, Karachi</p>
                      </div>
                    </div>

                    <div className="flex items-start transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -m-3 animate-fadeInUp" style={{animationDelay: '500ms'}}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 mt-1 transition-colors duration-200 hover:bg-blue-100">
                        <svg className="w-5 h-5 text-slate-700 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 transition-colors duration-200">Hourly Rate</p>
                        <p className="text-gray-500 transition-colors duration-200">PKR 1,500 per hour</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Book a Session</h1>
              <p className="text-gray-600 mb-8">
                Select your preferred date and time to schedule a session with {tutor.name}
              </p>
              
              {selectedDate && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Selected:</strong> {selectedDate.day} {getMonthName(selectedDate.month)} {selectedDate.year} at {selectedTimeSlot}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Select Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Select Subject
                  </label>
                  <select 
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent smooth-transition hover:border-blue-400"
                  >
                    <option value="">Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Select Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Select Level
                  </label>
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent smooth-transition hover:border-blue-400"
                  >
                    <option value="">Level of Education</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Select Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Select Date
                  </label>
                  <div className="border border-gray-300 rounded-md p-4">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4 bg-blue-900 text-white px-4 py-2 rounded">
                      <ChevronLeft 
                        className="w-5 h-5 cursor-pointer hover:bg-blue-800 rounded p-1 hover-smooth hover:scale-110" 
                        onClick={() => navigateMonth('prev')}
                      />
                      <span className="font-medium">{getMonthName(currentMonth)} {currentYear}</span>
                      <ChevronRight 
                        className="w-5 h-5 cursor-pointer hover:bg-blue-800 rounded p-1 hover-smooth hover:scale-110" 
                        onClick={() => navigateMonth('next')}
                      />
                    </div>
                    {renderCalendar()}
                  </div>
                </div>

                {/* Select Time Slot */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTimeSlot(time)}
                        className={`px-4 py-2 text-sm rounded-md border smooth-transition hover:scale-105 ${
                          selectedTimeSlot === time
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-blue-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Session Duration
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent smooth-transition hover:border-blue-400">
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                  </select>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Hourly Rate</span>
                    <span className="text-gray-900">PKR {tutor.hourlyRate.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Selected Date</span>
                    <span className="text-gray-900">
                      {selectedDate ? `${selectedDate.day} ${getMonthName(selectedDate.month)} ${selectedDate.year}` : 'Not selected'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Session Duration</span>
                    <span className="text-gray-900">{sessionDuration} Hour</span>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">PKR {totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-4">
                    Select Payment Method
                  </label>
                  <div className="space-y-3">
                    {paymentMethods.map(method => (
                      <label key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.name}
                          onChange={() => setSelectedPaymentMethod(method.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-900">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pay Now Button */}
                <button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md ultra-smooth hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!selectedDate || !selectedSubject || !selectedLevel || !selectedTimeSlot}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookASession;
