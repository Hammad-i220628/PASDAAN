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
  Settings as SettingsIcon, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  Shield,
  Eye,
  BarChart3,
  Activity
} from 'lucide-react';

// Import existing dashboard components
import TutorDashboard from '../TutorDashboard/Dashboard';
import ParentDashboard from '../ParentDashboard/Dashboard';
import StudentDashboard from '../StudentDashboard/Dashboard';

// Sidebar Component
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, currentView, setCurrentView }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Shield, label: 'Admin Overview', page: 'overview' },
    { icon: BarChart3, label: 'All Dashboards', page: 'all-dashboards' },
  ];

  const handleMenuClick = (page: string) => {
    setCurrentView(page);
    setIsMobileMenuOpen(false);
  };

  const accountItems = [
    { icon: SettingsIcon, label: 'Admin Settings', page: 'settings' },
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
        fixed lg:fixed lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        w-60 bg-white shadow-sm flex flex-col h-screen border-r border-gray-200 z-50 overflow-hidden
        top-0 left-0
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

        {/* Admin Badge */}
        <div className="px-6 pb-4 flex justify-center">
          <div className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
            ADMIN PANEL
          </div>
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
                  currentView === item.page 
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
              ADMIN ACCOUNT
            </p>
            <div className="space-y-2">
              {accountItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                    currentView === item.page
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
  adminName: string;
  onMenuClick: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const DashboardHeader = ({ adminName, onMenuClick, currentView, setCurrentView }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // If we're in a dashboard view, go back to admin overview
    if (currentView === 'tutor-view' || currentView === 'parent-view' || currentView === 'student-view') {
      setCurrentView('overview');
    } else {
      // Otherwise go back to login
      navigate('/login');
    }
  };

  const getBackButtonText = () => {
    if (currentView === 'tutor-view' || currentView === 'parent-view' || currentView === 'student-view') {
      return { full: 'Back to Admin', short: 'Admin' };
    }
    return { full: 'Back to Login', short: 'Back' };
  };

  const backButtonText = getBackButtonText();

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 md:px-8 py-6 md:py-8 mx-4 md:mx-6 mt-4 md:mt-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden mr-3 p-2 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Shield className="w-7 h-7 mr-4 text-blue-200" />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            Admin Control Center
          </h1>
        </div>
        {/* Back button */}
        <button 
          onClick={handleBackClick}
          className="flex items-center text-blue-100 hover:text-white p-2 hover:bg-blue-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">{backButtonText.full}</span>
          <span className="sm:hidden">{backButtonText.short}</span>
        </button>
      </div>
      <p className="text-blue-100 mt-3 text-sm md:text-base lg:ml-11">
        Welcome back, <span className="font-semibold">{adminName}</span>! You have full access to all user dashboards and system analytics.
      </p>
    </div>
  );
};

// Admin Overview Component
const AdminOverview = () => {
  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, change: '+12%' },
    { label: 'Active Tutors', value: '89', icon: User, change: '+5%' },
    { label: 'Total Sessions', value: '3,456', icon: Calendar, change: '+18%' },
    { label: 'Revenue', value: 'Rs 45,670', icon: DollarSign, change: '+22%' },
  ];

  return (
    <main className="flex-1 p-4 md:p-6 bg-transparent">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">System Overview</h2>
        <p className="text-gray-600 text-lg">Monitor all platform activities and performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2 font-medium">{stat.change} from last month</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <stat.icon className="w-7 h-7 text-blue-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-blue-600" />
          Recent System Activities
        </h3>
        <div className="space-y-5">
          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New tutor registration: Fatima Khan (Physics, Mathematics)</p>
              <span className="text-xs text-gray-500 mt-1">2 min ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Session completed: Ali Hassan - Mathematics tutoring</p>
              <span className="text-xs text-gray-500 mt-1">15 min ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Payment processed: Rs 1,500 - Parent dashboard</p>
              <span className="text-xs text-gray-500 mt-1">1 hour ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New review submitted: 5 stars for Chemistry tutoring</p>
              <span className="text-xs text-gray-500 mt-1">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// All Dashboards View Component - Shows all 3 dashboards side by side
const AllDashboardsView = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  return (
    <main className="flex-1 p-4 md:p-6 bg-transparent">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">All Connected Dashboards</h2>
        <p className="text-gray-600 text-lg">Live view of all user dashboards - Tutors, Parents, and Students</p>
      </div>

      {/* All Dashboards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Tutor Dashboard Preview */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200">
          <div className="bg-blue-900 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <User className="w-5 h-5 mr-2" />
                Tutor Dashboard
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="p-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-xs text-gray-500">Sessions</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            </div>
            
            {/* Logged In Tutors */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Currently Online</h4>
              {[
                { name: 'Fatima Khan' },
                { name: 'Ali Hassan' },
                { name: 'Zainab Iqbal' },
              ].map((tutor, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-50 rounded text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <div className="font-semibold">{tutor.name}</div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentView('tutor-view')}
              className="w-full mt-4 bg-blue-900 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              View Full Dashboard
            </button>
          </div>
        </div>

        {/* Parent Dashboard Preview */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200">
          <div className="bg-blue-900 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Parent Dashboard
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="p-4">
            {/* Logged In Parents */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Currently Online</h4>
              <div className="space-y-2">
                {[
                  { name: 'Ahmed Khan' },
                  { name: 'Sarah Ali' },
                  { name: 'Tariq Hussain' },
                ].map((parent, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <div className="font-semibold">{parent.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Today's Sessions */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Today's Sessions</h4>
              {[
                { subject: 'Mathematics', tutor: 'Fatima Khan', time: '4:00 PM' },
                { subject: 'Physics', tutor: 'Ali Hassan', time: '6:30 PM' },
              ].map((session, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                  <div>
                    <div className="font-semibold">{session.subject}</div>
                    <div className="text-gray-600">{session.tutor}</div>
                  </div>
                  <div className="text-blue-600 font-semibold">{session.time}</div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentView('parent-view')}
              className="w-full mt-4 bg-blue-900 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              View Full Dashboard
            </button>
          </div>
        </div>

        {/* Student Dashboard Preview */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200">
          <div className="bg-blue-900 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Student Dashboard
              </h3>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="p-4">
            {/* Logged In Students */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Currently Online</h4>
              <div className="space-y-2">
                {[
                  { name: 'Ali Khan' },
                  { name: 'Fatima Ahmed' },
                  { name: 'Hassan Ali' },
                ].map((student, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <div className="font-semibold">{student.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Activities</h4>
              {[
                { activity: 'Math Test Completed', score: '92%', time: '2h ago' },
                { activity: 'Physics Session', score: 'Attended', time: '1d ago' },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                  <div>
                    <div className="font-semibold">{activity.activity}</div>
                    <div className="text-gray-600">{activity.time}</div>
                  </div>
                  <div className="text-blue-600 font-semibold">{activity.score}</div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentView('student-view')}
              className="w-full mt-4 bg-blue-900 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              View Full Dashboard
            </button>
          </div>
        </div>

      </div>

      {/* Connection Status */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-blue-600" />
          Dashboard Connection Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Tutor dashboards: <strong className="text-blue-900">89 connected</strong></span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Parent dashboards: <strong className="text-blue-900">156 connected</strong></span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Student dashboards: <strong className="text-blue-900">234 connected</strong></span>
          </div>
        </div>
      </div>
    </main>
  );
};

// System Analytics Component
const SystemAnalytics = () => {
  return (
    <main className="flex-1 p-4 md:p-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Analytics</h2>
        <p className="text-gray-600">Detailed analytics and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">User Growth Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Statistics</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Session Stats Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Subjects</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Subjects Chart Placeholder</p>
          </div>
        </div>
      </div>
    </main>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('overview');
  const adminName = "Muaz"; // This would come from auth state

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <AdminOverview />;
      case 'all-dashboards':
        return <AllDashboardsView setCurrentView={setCurrentView} />;
      case 'tutor-view':
        return (
          <div className="w-full h-full overflow-hidden">
            <div className="bg-blue-900 text-white px-4 md:px-8 py-4 md:py-6 mx-4 md:mx-6 mt-4 mb-6 rounded-xl">
              <h1 className="text-sm sm:text-lg md:text-xl font-medium md:font-semibold truncate">
                Welcome back, [Tutor Name]!
              </h1>
              <p className="text-blue-100 mt-2 text-xs md:text-sm">
                You have 3 upcoming sessions and 2 new booking requests today.
              </p>
            </div>
            <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View All</a>
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
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View All</a>
                  </div>
                  <div className="space-y-0">
                    <div className="py-3 border-b border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Mathematics - Calculus</h3>
                          <p className="text-sm text-gray-500">Ahmed K. • O-Levels</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">Today, 4:00 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Physics - Mechanics</h3>
                          <p className="text-sm text-gray-500">Fatima S. • A-Levels</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">Tomorrow, 5:30 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Zain M. • Secondary</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">Wed, 3:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Booking Requests</h2>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View All</a>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Sara A.</h3>
                        <p className="text-sm text-gray-600">Mathematics • Friday, 6:00 PM</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">Accept</button>
                        <button className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors">Decline</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Hamza K.</h3>
                        <p className="text-sm text-gray-600">Physics • Saturday, 2:00 PM</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">Accept</button>
                        <button className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors">Decline</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-base md:text-lg font-semibold text-gray-900">Weekly Schedule</h2>
                    <a href="#" className="text-xs md:text-sm text-green-600 hover:text-green-800">Edit Availability</a>
                  </div>
                  <div className="grid grid-cols-7 gap-1 md:gap-3">
                    {[
                      { day: 'Mon', date: '11', sessions: 1, booked: true },
                      { day: 'Tue', date: '12', sessions: 1, booked: true },
                      { day: 'Wed', date: '13', sessions: 1, booked: true },
                      { day: 'Thu', date: '14', sessions: 0, booked: false },
                      { day: 'Fri', date: '15', sessions: 0, booked: false },
                      { day: 'Sat', date: '16', sessions: 2, booked: true },
                      { day: 'Sun', date: '17', sessions: 0, booked: false }
                    ].map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3">{day.day}</div>
                        <div className={`w-10 h-14 md:w-16 md:h-20 rounded-lg flex flex-col items-center justify-center text-xs md:text-sm font-medium ${
                          day.booked ? 'bg-green-200 text-green-800' : 'bg-white text-gray-700 border border-gray-200'
                        }`}>
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
              </div>
            </div>
          </div>
        );
      case 'parent-view':
        return (
          <div className="w-full h-full overflow-hidden">
            <div className="mt-6 overflow-y-auto h-full">
              <ParentDashboard />
            </div>
          </div>
        );
      case 'student-view':
        return (
          <div className="w-full h-full overflow-hidden">
            <div className="mt-6 overflow-y-auto h-full">
              <StudentDashboard />
            </div>
          </div>
        );
      case 'analytics':
        return <SystemAnalytics />;
      case 'settings':
        return (
          <main className="flex-1 p-4 md:p-6 bg-transparent">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Admin Settings</h2>
              <p className="text-gray-600 text-lg">Manage platform settings and configurations</p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* User Management */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  User Management
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Total Users</h4>
                      <p className="text-sm text-gray-600">1,247 active users</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Manage Users
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">User Verification</h4>
                      <p className="text-sm text-gray-600">Pending: 23 users</p>
                    </div>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                      Review
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Banned Users</h4>
                      <p className="text-sm text-gray-600">5 users suspended</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      View List
                    </button>
                  </div>
                </div>
              </div>

              {/* Platform Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <SettingsIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Platform Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Maintenance Mode</h4>
                      <p className="text-sm text-gray-600">Enable for system updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Registration</h4>
                      <p className="text-sm text-gray-600">Allow new user signups</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Auto-Approval</h4>
                      <p className="text-sm text-gray-600">Auto-approve tutor profiles</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-blue-600" />
                  Payment & Commission
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Commission (%)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        defaultValue="15" 
                        min="0" 
                        max="50" 
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">%</span>
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Session Rate (PKR)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        defaultValue="500" 
                        min="100" 
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">PKR</span>
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Total Revenue:</strong> Rs 45,670 this month
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Send system updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">SMS Alerts</h4>
                      <p className="text-sm text-gray-600">Critical system alerts via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="email" 
                        defaultValue="admin@pasdaan.com" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Security & Privacy
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Login Attempts</h4>
                      <p className="text-sm text-gray-600">Max failed attempts before lockout</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="3">3 attempts</option>
                      <option value="5" selected>5 attempts</option>
                      <option value="10">10 attempts</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Session Timeout</h4>
                      <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="30">30 minutes</option>
                      <option value="60" selected>1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* System Backup */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-blue-600" />
                  System Maintenance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Database Backup</h4>
                      <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Backup Now
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">System Logs</h4>
                      <p className="text-sm text-gray-600">View system activity logs</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Logs
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Clear Cache</h4>
                      <p className="text-sm text-gray-600">Clear system cache for performance</p>
                    </div>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Clear Cache
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                Reset to Defaults
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save All Settings
              </button>
            </div>
          </main>
        );
      case 'help':
        return (
          <main className="flex-1 p-4 md:p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Help & Support</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-600">Admin help and support documentation will be available here.</p>
            </div>
          </main>
        );
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="flex-1 flex flex-col lg:ml-60 min-h-screen">
        <DashboardHeader 
          adminName={adminName} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <div className="flex-1 overflow-auto">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
