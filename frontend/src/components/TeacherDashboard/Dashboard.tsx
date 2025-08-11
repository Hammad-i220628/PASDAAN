import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  User, 
  DollarSign, 
  Star, 
  Book, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

// Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tutor Dashboard', active: true },
    { icon: Calendar, label: 'Schedule', active: false },
    { icon: MessageSquare, label: 'Messages', active: false },
  ];

  const accountItems = [
    { icon: User, label: 'Profile', active: false },
    { icon: DollarSign, label: 'Earnings', active: false },
    { icon: Star, label: 'Reviews', active: false },
    { icon: Book, label: 'Resources', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: 'Help & Support', active: false },
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
    <div className="w-64 bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <img 
          src="/logo.png" 
          alt="PASDAAN" 
          className="h-8 w-auto"
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              item.active 
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Account Section */}
      <div className="px-4 py-4 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          ACCOUNT
        </p>
        <div className="space-y-2">
          {accountItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Items */}
      <div className="px-4 pb-6 space-y-2">
        {bottomItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

// Dashboard Header Component
interface DashboardHeaderProps {
  tutorName: string;
}

const DashboardHeader = ({ tutorName }: DashboardHeaderProps) => {
  return (
    <div className="bg-blue-900 text-white p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Welcome back, {tutorName}!</h1>
        </div>
        <div className="bg-white text-blue-900 px-4 py-2 rounded-full">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
      <p className="text-blue-100 mt-2">
        You have 3 upcoming sessions and 2 new booking requests today.
      </p>
    </div>
  );
};

// Quick Stats Component
const QuickStats = () => {
  const stats = [
    {
      title: 'Total Sessions',
      value: '24',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      link: 'View All'
    },
    {
      title: 'Students',
      value: '14',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      link: ''
    },
    {
      title: 'Rating',
      value: '4.8',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      link: ''
    },
    {
      title: 'Response Rate',
      value: '92%',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      link: ''
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg shadow-sm p-6`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            {stat.link && (
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
                {stat.link}
              </a>
            )}
          </div>
          <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
        </div>
      ))}
    </>
  );
};

// Upcoming Sessions Component
const UpcomingSessions = () => {
  const sessions = [
    {
      subject: 'Mathematics - Calculus',
      student: 'Ahmed K • O-Level',
      time: 'Today, 4:00 PM'
    },
    {
      subject: 'Physics - Mechanics',
      student: 'Fatima S • A-Level',
      time: 'Tomorrow, 5:30 PM'
    },
    {
      subject: 'Zoology',
      student: 'Zain M • Secondary',
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
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
            <h3 className="font-medium text-gray-900 mb-1">{session.subject}</h3>
            <p className="text-sm text-gray-600 mb-1">{session.student}</p>
            <p className="text-sm text-green-700 font-medium">{session.time}</p>
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
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">{request.name}</h3>
              <p className="text-sm text-gray-600">{request.subject} • {request.time}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                Accept
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors">
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
    { day: 'Tue', date: '12', sessions: 1, status: 'available' },
    { day: 'Wed', date: '13', sessions: 1, status: 'available' },
    { day: 'Thu', date: '14', sessions: 0, status: 'unavailable' },
    { day: 'Fri', date: '15', sessions: 2, status: 'busy' },
    { day: 'Sat', date: '16', sessions: 1, status: 'available' },
    { day: 'Sun', date: '17', sessions: 0, status: 'unavailable' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          Edit Availability
        </a>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">{day.day}</div>
            <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-medium ${getStatusColor(day.status)}`}>
              <div className="text-sm font-bold">{day.date}</div>
              {day.sessions > 0 && (
                <div className="text-xs">{day.sessions}</div>
              )}
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
    { month: 'Jan', amount: 12500 },
    { month: 'Feb', amount: 18000 },
    { month: 'Mar', amount: 15500 },
    { month: 'Apr', amount: 21000 },
    { month: 'May', amount: 24500 },
    { month: 'Jun', amount: 19500 }
  ];

  const maxAmount = Math.max(...monthlyData.map(item => item.amount));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Earnings Overview</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View Details
        </a>
      </div>
      
      <div className="grid grid-cols-6 gap-4 mb-6">
        {monthlyData.map((data, index) => {
          const heightPercentage = (data.amount / maxAmount) * 100;
          return (
            <div key={index} className="text-center">
              <div className="relative h-32 bg-gray-100 rounded-lg mb-2 flex items-end">
                <div 
                  className="w-full bg-green-400 rounded-lg transition-all duration-300 flex items-end justify-center"
                  style={{ height: `${heightPercentage}%` }}
                >
                  <span className="text-xs font-medium text-white mb-1">
                    ₨{(data.amount / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-500">{data.month}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total (Last 6 Months)</p>
          <p className="text-xl font-bold text-gray-900">₨110,500</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">This Month</p>
          <p className="text-xl font-bold text-gray-900">₨19,500</p>
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

// Main Teacher Dashboard Component
const Dashboard = () => {
  const tutorName = "Ahmed Khan"; // This would come from auth state

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader tutorName={tutorName} />
        <main className="flex-1 p-8 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QuickStats />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BookingRequests />
              <EarningsOverview />
            </div>
            <div className="space-y-8">
              <UpcomingSessions />
              <WeeklySchedule />
              <RecentReviews />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
