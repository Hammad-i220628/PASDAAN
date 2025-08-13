import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  User, 
  DollarSign, 
  Star, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Schedule from './Schedule';
import Sessions from './Sessions';
import Messages from './Messages';
import Profile from './Profile';
import Earnings from './Earnings';
import Reviews from './Reviews';
import Resources from './Resources';

// Sidebar Component
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, currentPage, setCurrentPage }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Tutor Dashboard', page: 'dashboard' },
    { icon: Calendar, label: 'Schedule', page: 'schedule' },
    { icon: Users, label: 'Sessions', page: 'sessions' },
    { icon: MessageSquare, label: 'Messages', page: 'messages' },
  ];

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const accountItems = [
    { icon: User, label: 'Profile', page: 'profile' },
    { icon: DollarSign, label: 'Earnings', page: 'earnings' },
    { icon: Star, label: 'Reviews', page: 'reviews' },
    { icon: BookOpen, label: 'Resources', page: 'resources' },
    { icon: Settings, label: 'Settings', page: 'settings' },
    { icon: HelpCircle, label: 'Help & Support', page: 'help' },
  ];

  const handleLogout = () => {
    // Clear any auth tokens/session data here if needed
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add a smooth delay before navigation for better UX
    setTimeout(() => {
      navigate('/login');
    }, 800); // 800ms delay for smooth transition
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        w-60 bg-white shadow-sm flex flex-col h-screen border-r border-gray-200 z-50 overflow-hidden
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4 flex-shrink-0">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Logo */}
        <div className="p-6 pb-4 flex-shrink-0 flex justify-center">
          <img 
            src="/logo.png" 
            alt="PASDAAN" 
            className="h-8 w-auto"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden overflow-x-hidden scrollbar-hide">
          {/* Menu Items */}
          <nav className="px-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === item.page 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-900 hover:bg-blue-50'
                }`}
                onClick={() => handleMenuClick(item.page)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Account Section */}
          <div className="px-4 py-6 mt-6">
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-4 px-3">
              ACCOUNT
            </p>
            <div className="space-y-2">
              {accountItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                    currentPage === item.page
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-900 hover:bg-blue-50'
                  }`}
                  onClick={() => handleMenuClick(item.page)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium text-blue-900 hover:bg-blue-50 text-left"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          {/* Bottom padding for better scroll experience */}
          <div className="h-6"></div>
        </div>
      </div>
    </>
  );
};

// Dashboard Header Component
interface DashboardHeaderProps {
  tutorName: string;
  onMenuClick: () => void;
}

const DashboardHeader = ({ tutorName, onMenuClick }: DashboardHeaderProps) => {
  return (
    <div className="bg-blue-900 text-white px-4 md:px-8 py-4 md:py-6 mx-4 md:mx-6 mt-4 md:mt-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          {/* Mobile menu button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden mr-3 p-1 hover:bg-blue-800 rounded transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-sm sm:text-lg md:text-xl font-medium md:font-semibold truncate">
            Welcome back, [Tutor Name]!
          </h1>
        </div>
        <div className="bg-white text-blue-900 px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full ml-2">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-6 sm:w-8 md:w-12 h-1.5 md:h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs md:text-sm font-medium hidden sm:inline">Online</span>
          </div>
        </div>
      </div>
      <p className="text-blue-100 mt-2 text-xs md:text-sm lg:ml-8">
        You have 3 upcoming sessions and 2 new booking requests today.
      </p>
    </div>
  );
};

// Quick Stats Component
const QuickStats = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <p className="text-3xl font-bold text-gray-900">24</p>
          </div>
          <p className="text-sm text-gray-500">Total Sessions</p>
        </div>
        
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <p className="text-3xl font-bold text-gray-900">14</p>
          </div>
          <p className="text-sm text-gray-500">Students</p>
        </div>
        
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <p className="text-3xl font-bold text-gray-900">4.8</p>
          </div>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
        
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <p className="text-3xl font-bold text-gray-900">92%</p>
          </div>
          <p className="text-sm text-gray-500">Response Rate</p>
        </div>
      </div>
    </div>
  );
};

// Upcoming Sessions Component
const UpcomingSessions = () => {
  const sessions = [
    {
      subject: 'Mathematics - Calculus',
      student: 'Ahmed K. • O-Levels',
      time: 'Today, 4:00 PM'
    },
    {
      subject: 'Physics - Mechanics',
      student: 'Fatima S. • A-Levels',
      time: 'Tomorrow, 5:30 PM'
    },
    {
      subject: '',
      student: 'Zain M. • Secondary',
      time: 'Wed, 3:00 PM'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>
      <div className="space-y-0">
        {sessions.map((session, index) => (
          <div key={index} className="py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {session.subject && (
                  <h3 className="font-medium text-gray-900 mb-1">{session.subject}</h3>
                )}
                <p className="text-sm text-gray-500">{session.student}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Booking Requests Component
const BookingRequests = () => {
  const requests = [
    {
      name: 'Sara A.',
      subject: 'Mathematics',
      time: 'Friday, 6:00 PM'
    },
    {
      name: 'Hamza K.',
      subject: 'Physics',
      time: 'Saturday, 2:00 PM'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Booking Requests</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {requests.map((request, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{request.name}</h3>
              <p className="text-sm text-gray-600">{request.subject} • {request.time}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                Accept
              </button>
              <button className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Weekly Schedule Component
const WeeklySchedule = () => {
  const weekDays = [
    { day: 'Mon', date: '11', sessions: 1, status: 'available' },
    { day: 'Tue', date: '12', sessions: 1, status: 'booked' },
    { day: 'Wed', date: '13', sessions: 1, status: 'booked' },
    { day: 'Thu', date: '14', sessions: 0, status: 'available' },
    { day: 'Fri', date: '15', sessions: 0, status: 'available' },
    { day: 'Sat', date: '16', sessions: 2, status: 'booked' },
    { day: 'Sun', date: '17', sessions: 0, status: 'available' }
  ];

  const getStatusColor = (status: string, sessions: number) => {
    if (sessions > 0 && status === 'booked') {
      return 'bg-green-200 text-green-800';
    }
    return 'bg-white text-gray-700 border border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Weekly Schedule</h2>
        <a href="#" className="text-xs md:text-sm text-green-600 hover:text-green-800">
          Edit Availability
        </a>
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-3">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3">{day.day}</div>
            <div className={`w-10 h-14 md:w-16 md:h-20 rounded-lg flex flex-col items-center justify-center text-xs md:text-sm font-medium ${getStatusColor(day.status, day.sessions)}`}>
              <div className="text-sm md:text-xl font-bold mb-1 md:mb-2">{day.date}</div>
              <div className="text-xs text-gray-500 px-1 text-center leading-tight">
                {day.sessions === 0 ? '0' : `${day.sessions}`}
                <div className="hidden md:block">
                  {day.sessions === 0 ? 'sessions' : `session${day.sessions > 1 ? 's' : ''}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Earnings Overview Component
const EarningsOverview = () => {
  const monthlyData = [
    { month: 'Jan', amount: 12500, display: 'Rs12,500' },
    { month: 'Feb', amount: 18000, display: 'Rs18,000' },
    { month: 'Mar', amount: 15500, display: 'Rs15,500' },
    { month: 'Apr', amount: 21000, display: 'Rs21,000' },
    { month: 'May', amount: 24000, display: 'Rs24,000' },
    { month: 'Jun', amount: 19500, display: 'Rs19,500' }
  ];

  const maxAmount = Math.max(...monthlyData.map(item => item.amount));

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">Earnings Overview</h2>
        <a href="#" className="text-xs md:text-sm text-green-600 hover:text-green-800">
          View Details
        </a>
      </div>
      
      <div className="mb-4 md:mb-6">
        <div className="flex items-end justify-between gap-1 md:gap-3 h-32 md:h-40">
          {monthlyData.map((data, index) => {
            const heightPercentage = (data.amount / maxAmount) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center mb-2">
                  <span className="text-xs font-medium text-gray-900 mb-1 hidden md:block">
                    {data.display}
                  </span>
                  <span className="text-xs font-medium text-gray-900 mb-1 block md:hidden">
                    {data.amount/1000}k
                  </span>
                  <div 
                    className="w-full bg-green-300 rounded-sm transition-all duration-300"
                    style={{ height: `${heightPercentage * 0.8}px` }}
                  >
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-6 border-t border-gray-200">
        <div className="text-center md:text-left">
          <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Rs110,500</p>
          <p className="text-xs md:text-sm text-gray-500">Total (Last 6 Months)</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Rs19,500</p>
          <p className="text-xs md:text-sm text-gray-500">This Month</p>
        </div>
      </div>
    </div>
  );
};

// Recent Reviews Component
const RecentReviews = () => {
  const reviews = [
    {
      name: 'Ayesha Malik',
      rating: 5,
      comment: 'An excellent tutor! Very patient and explains complex topics in a way that\'s easy to understand. My daughter\'s grades have improved significantly.',
      timeAgo: '2 days ago'
    },
    {
      name: 'Bilal Khan',
      rating: 4,
      comment: 'Very knowledgeable and professional. Always on time and well-prepared for the sessions. Highly recommended for A-Level Physics.',
      timeAgo: '1 week ago'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{review.name}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-400">{review.timeAgo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  return (
    <main className="flex-1 p-4 md:p-6 bg-gray-50">
      {/* Mobile: Single column, Tablet: 1-2 columns, Desktop: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <QuickStats />
        <UpcomingSessions />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <BookingRequests />
        <WeeklySchedule />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <EarningsOverview />
        <RecentReviews />
      </div>
    </main>
  );
};

// Placeholder components for other pages

// Main Teacher Dashboard Component
const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const tutorName = "Tutor Name"; // This would come from auth state

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'schedule':
        return <Schedule />;
      case 'sessions':
        return <Sessions />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      case 'earnings':
        return <Earnings />;
      case 'reviews':
        return <Reviews />;
      case 'resources':
        return <Resources />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex-1 flex flex-col lg:ml-0">
        <DashboardHeader 
          tutorName={tutorName} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default Dashboard;
