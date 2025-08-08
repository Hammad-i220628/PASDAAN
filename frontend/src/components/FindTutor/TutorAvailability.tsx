import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const TutorAvailability = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('Month View');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mock tutor data - in real app, you'd fetch this based on the ID
  const tutor = {
    id: 1,
    name: "Sara Mushtaq",
    title: "Mathematics & Physics",
    location: "Bahria Town Phase 7A & 7B • Islamabad",
    verified: true,
    image: "/api/placeholder/150/150"
  };

  // Mock availability data for March 2025
  const availabilityData = {
    "2025-03-01": ["4:00 PM - 7:00 PM", "6:00 PM - 7:00 PM"],
    "2025-03-02": ["2:00 PM - 4:00 PM", "5:00 PM - 8:00 PM"],
    "2025-03-04": ["3:00 PM - 6:00 PM", "5:00 PM - 6:30 PM"],
    "2025-03-06": ["4:00 PM - 5:30 PM"],
    "2025-03-07": ["3:00 PM - 6:00 PM", "6:00 PM - 8:00 PM"],
    "2025-03-08": ["5:00 PM - 7:00 PM", "6:00 PM - 7:00 PM"],
    "2025-03-09": ["4:00 PM - 6:30 PM", "6:00 PM - 7:00 PM"],
    "2025-03-10": ["6:00 PM - 8:30 PM"],
    "2025-03-11": ["3:00 PM - 6:00 PM", "5:00 PM - 6:30 PM"],
    "2025-03-12": ["3:00 PM - 5:00 PM"],
    "2025-03-13": ["3:00 PM - 6:30 PM", "5:00 PM - 8:00 PM"],
    "2025-03-14": ["9:00 AM - 11:30 AM", "3:00 PM - 5:00 PM", "6:00 PM - 8:00 PM"]
  };

  const thisWeekAvailability = [
    {
      date: "Tuesday, March 11, 2025",
      times: [
        { time: "3:00 PM - 6:30 PM", status: "booked" },
        { time: "5:00 PM - 6:00 PM", status: "available" }
      ]
    },
    {
      date: "Wednesday, March 12, 2025",
      times: [
        { time: "4:00 PM - 6:30 PM", status: "available" }
      ]
    },
    {
      date: "Thursday, March 13, 2025",
      times: [
        { time: "3:00 PM - 6:30 PM", status: "available" },
        { time: "5:00 PM - 8:00 PM", status: "booked" }
      ]
    }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const renderCalendar = () => {
    const year = 2025;
    const month = 3; // March
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
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
      const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const availability = availabilityData[dateString];
      const hasAvailability = availability && availability.length > 0;
      
      days.push(
        <div key={day} className="p-1">
          <div 
            className={`w-full h-16 border rounded text-center p-1 cursor-pointer text-xs ${
              hasAvailability ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
            onClick={() => hasAvailability && setSelectedDate(dateString)}
          >
            <div className="font-medium">{day}</div>
            {hasAvailability && (
              <div className="mt-1">
                {availability.slice(0, 2).map((time, index) => (
                  <div key={index} className="text-green-600 text-xs truncate">
                    {time}
                  </div>
                ))}
                {availability.length > 2 && (
                  <div className="text-green-600 text-xs">...</div>
                )}
              </div>
            )}
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

  const handleBookSession = () => {
    // Handle booking logic here
    alert('Booking session functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tutor Info Section */}
      <section className="text-white py-8" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <img 
                src={tutor.image} 
                alt={tutor.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
              />
              {tutor.verified && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <span>✓</span>
                  <span>Verified Tutor</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{tutor.name}</h1>
              <p className="text-green-400 text-base mb-2">{tutor.title}</p>
              <p className="text-gray-200 text-sm">{tutor.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#003366' }}>
            Availability
          </h2>

          {/* Legend */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded mr-2"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold" style={{ color: '#003366' }}>March 2025</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Today</button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Week View</button>
              <button className="px-3 py-1 text-sm border rounded bg-blue-50 border-blue-300">Month View</button>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-8">
            {renderCalendar()}
          </div>

          {/* This Week's Availability */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#003366' }}>
              This Week's Availability
            </h3>
            
            <div className="space-y-4">
              {thisWeekAvailability.map((dayAvailability, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {dayAvailability.date}
                  </h4>
                  <div className="space-y-2">
                    {dayAvailability.times.map((timeSlot, timeIndex) => (
                      <div 
                        key={timeIndex}
                        className={`p-2 rounded text-sm ${
                          timeSlot.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {timeSlot.time}
                        {timeSlot.status === 'booked' && (
                          <span className="ml-2 text-xs">(Booked)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book Session Button */}
          <div className="text-center">
            <button 
              onClick={handleBookSession}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition duration-200"
            >
              Book a Session
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-white py-8" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            {/* Company Info - Centered */}
            <div className="text-center mb-8">
              <div className="mb-4 flex justify-center">
                <img 
                  src="/logo.png" 
                  alt="Pasdaan Logo"
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 px-4">
                Connecting students with qualified tutors for personalized learning experiences.
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-300 hover:text-sky-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links and Support - Horizontal */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Quick Links */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">How It Works</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Find Tutors</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Become a Tutor</a></li>
                </ul>
              </div>

              {/* Support */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Safety</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            {/* Contact - Centered */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">+923061797003</span>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">info@pasdaan.com</span>
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">Islamabad, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <img 
                  src="/logo.png" 
                  alt="Pasdaan Logo"
                  className="h-16 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6">
                Connecting students with qualified tutors for personalized learning experiences.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-300 hover:text-pink-500 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-300 hover:text-sky-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Tutors</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Become a Tutor</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">+923061797003</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">info@pasdaan.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-gray-300">Islamabad, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default TutorAvailability;
