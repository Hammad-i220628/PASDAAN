import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Users, 
  BookOpen, 
  MessageSquare, 
  CreditCard, 
  Settings as SettingsIcon, 
  HelpCircle, 
  LogOut, 
  Calendar,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Menu,
  X,
  Home,
  User,
  DollarSign
} from 'lucide-react';
import StudentDashboard from '../StudentDashboard/Dashboard';
import IndividualStudentDashboard from '../StudentDashboard/IndividualDashboard';
import MyBookings from './MyBookings';
import Messages from './Messages';
import MyReviews from './MyReviews';
import Settings from './Settings';
import HelpSupport from './HelpSupport';

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
    { icon: Home, label: 'Parent Dashboard', page: 'parent-dashboard' },
    { icon: Users, label: 'Find Tutors', page: 'find-tutors' },
    { icon: User, label: 'Student Dashboard', page: 'student-dashboard' },
    { icon: BookOpen, label: 'My Bookings', page: 'bookings' },
    { icon: MessageSquare, label: 'Messages', page: 'messages' },
    { icon: Star, label: 'Add Review', page: 'add-review' },
    { icon: SettingsIcon, label: 'Settings', page: 'settings' },
  ];

  const handleMenuClick = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    
    // Navigate to specific pages
    if (page === 'find-tutors') {
      navigate('/find-tutor?source=parent-dashboard');
    }
  };

  const bottomItems = [
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
        fixed lg:fixed lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        w-60 bg-white shadow-sm flex flex-col h-screen border-r border-gray-200 z-50 overflow-hidden
        lg:flex top-0 left-0
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

          {/* Bottom Items */}
          <div className="px-4 py-2">
            <div className="space-y-2">
              {bottomItems.map((item, index) => (
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
  parentName: string;
  onMenuClick: () => void;
}

const DashboardHeader = ({ parentName, onMenuClick }: DashboardHeaderProps) => {
  return (
    <div className="bg-blue-900 text-white px-4 md:px-8 py-4 md:py-6 mx-4 md:mx-6 mt-4 md:mt-6 rounded-lg">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden mr-3 p-1 hover:bg-blue-800 rounded transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-sm sm:text-lg md:text-xl font-bold">
          Welcome back, Ahmed!
        </h1>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('parent-dashboard');
  const [selectedIndividualStudent, setSelectedIndividualStudent] = useState<any>(null);
  const parentName = "Ahmed Malik"; // This would come from auth state
  const navigate = useNavigate();

  // Check URL parameters to set initial page
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section) {
      setCurrentPage(section);
      // Clean up URL by removing the query parameter
      navigate('/parent-dashboard', { replace: true });
    }
  }, [navigate]);

  // Sample data
  const studentProfiles = [
    {
      id: 1,
      name: 'Ali',
      grade: 'Grade 8 • Age 13',
      school: 'City School North Campus',
      avatar: 'A',
      status: 'Paid',
      subjects: [
        { name: 'Mathematics', progress: 92, grade: 'A+' },
        { name: 'Physics', progress: 88, grade: 'A-' },
        { name: 'English', progress: 95, grade: 'A' }
      ]
    },
    {
      id: 2,
      name: 'Fatima',
      grade: 'Grade 10 • Age 16',
      school: 'Beaconhouse School',
      avatar: 'F',
      status: 'UnPaid',
      subjects: [
        { name: 'Biology', progress: 94, grade: 'A' },
        { name: 'Chemistry', progress: 100, grade: 'A+' },
        { name: 'English', progress: 68, grade: 'B' }
      ]
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      subject: 'Mathematics',
      tutor: 'Fatima Khan',
      time: '4:00 PM - 5:00 PM',
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Physics',
      tutor: 'Ali Hassan',
      time: '6:30 PM - 7:00 PM',
      status: 'upcoming'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'test',
      title: 'Mathematics Test Completed',
      description: 'Algebra Unit 2 - Result: 85%',
      time: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    {
      id: 2,
      type: 'session',
      title: 'New Session Scheduled',
      description: 'Physics • Chemistry • Tomorrow',
      time: '3 hours ago',
      icon: Calendar,
      iconColor: 'text-blue-500'
    }
  ];

  const paymentHistory = [
    { subject: 'Mathematics - Calculus', tutor: 'Fatima Khan', date: 'Dec 5, 2024', amount: 'Rs. 1,500' },
    { subject: 'Physics - Mechanics', tutor: 'Ali Hassan', date: 'Dec 3, 2024', amount: 'Rs. 1,600' },
    { subject: 'Chemistry - Biology', tutor: 'Fatima Khan', date: 'Dec 20, 2024', amount: 'Rs. 1,200' }
  ];

  const savedTutors = [
    { name: 'Fatima Khan', rating: 4.9, subjects: ['Math', 'Physics'] },
    { name: 'Ali Hassan', rating: 4.8, subjects: ['Physics', 'Chemistry'] },
    { name: 'Zainab Iqbal', rating: 4.9, subjects: ['Biology', 'Chemistry'] },
    { name: 'Usman Ahmad', rating: 4.7, subjects: ['English', 'Urdu'] },
    { name: 'Usman Ahmad', rating: 4.8, subjects: ['Math', 'Statistics'] },
    { name: 'Usman Ahmad', rating: 4.6, subjects: ['Computer Science'] }
  ];

  const recentMessages = [
    { name: 'Fatima Khan', message: 'Great progress in today\'s session!', time: '2 min ago' },
    { name: 'Ali Hassan', message: 'Please review the homework problems...', time: '1 hour ago' },
    { name: 'Zainab Iqbal', message: 'Hi, I will be sharing the session...', time: 'Yesterday' }
  ];

  // If individual student is selected, render as completely separate page
  if (selectedIndividualStudent) {
    return (
      <IndividualStudentDashboard 
        student={selectedIndividualStudent} 
        onBack={() => setSelectedIndividualStudent(null)}
      />
    );
  }

  // Dashboard Content Component
  const DashboardContent = () => {
    // Render Student Dashboard if selected
    if (currentPage === 'student-dashboard') {
      return <StudentDashboard onStudentSelect={setSelectedIndividualStudent} />
    }
    
    // Render My Bookings if selected
    if (currentPage === 'bookings') {
      return <MyBookings />
    }
    
    // Render Messages if selected
    if (currentPage === 'messages') {
      return <Messages />
    }
    
    // Render My Reviews if selected
    if (currentPage === 'add-review') {
      return <MyReviews />
    }
    
    // Render Settings if selected
    if (currentPage === 'settings') {
      return <Settings />
    }
    
    // Render Help & Support if selected
    if (currentPage === 'help') {
      return <HelpSupport />
    }
  
    // Otherwise render Parent Dashboard
    return (
      <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50 overflow-hidden">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your children's academic progress and activities</p>
        </div>

        {/* Student Profiles Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Student Profiles
            </h2>
            <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center justify-center sm:justify-start w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-1" />
              Add Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {studentProfiles.map((student) => (
              <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-3">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl ${
                      student.id === 1 ? 'bg-blue-900' : 'bg-blue-900'
                    }`}>
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{student.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{student.grade}</p>
                      <p className="text-sm text-gray-500">{student.school}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Paid' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>

                {/* Subject Tags */}
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {student.subjects.slice(0, 3).map((subject, index) => (
                    <span 
                      key={index} 
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        index === 0 ? 'bg-blue-100 text-blue-700' :
                        index === 1 ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {subject.name}
                    </span>
                  ))}
                </div>

                {/* Subject Progress */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {student.subjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-800">{subject.name}</span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-900">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300 bg-blue-900"
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setSelectedIndividualStudent(student)}
                    className="flex-1 bg-blue-900 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-800 transition-colors"
                  >
                    View Progress
                  </button>
                  <button className="flex-1 bg-white border border-blue-900 text-blue-900 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Upcoming Sessions */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Sessions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Today - Mathematics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4">
                <span className="inline-block px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Today
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4">Mathematics</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">FK</span>
                    <span className="text-gray-600 text-sm sm:text-base">Fatima Khan</span>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">4:00 PM - 5:00 PM</span>
                </div>
                <button className="w-full bg-blue-900 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-800 transition-colors">
                  Join Session
                </button>
              </div>
            </div>

            {/* Tomorrow - Physics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4">
                <span className="inline-block px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Tomorrow
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4">Physics</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">AH</span>
                    <span className="text-gray-600 text-sm sm:text-base">Ali Hassan</span>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">5:30 PM - 7:00 PM</span>
                </div>
                <button className="w-full bg-white border border-blue-900 text-blue-900 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activities
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Mathematics Test Completed */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Mathematics Test Completed</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Ali • Score: 92% • 2 hours ago</p>
                </div>
              </div>

              {/* New Session Scheduled */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">New Session Scheduled</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Fatima • Chemistry • Tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Payment History */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
              <button className="text-blue-900 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              {paymentHistory.map((payment, index) => (
                <div key={index} className={`p-3 sm:p-4 ${
                  index !== paymentHistory.length - 1 ? 'border-b border-gray-100' : ''
                }`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-0 sm:mb-1">{payment.subject}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{payment.tutor}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-gray-400 mb-0 sm:mb-1">{payment.date}</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{payment.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Tutors */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Saved Tutors</h2>
              <button className="text-blue-900 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {savedTutors.map((tutor, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full mx-auto mb-2 sm:mb-3"></div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 sm:mb-2 truncate px-1">{tutor.name}</h3>
                    <p className="text-xs text-gray-500 mb-1 sm:mb-2 truncate px-1">{tutor.subjects.join(', ')}</p>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                            i < Math.floor(tutor.rating) ? 'text-orange-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{tutor.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <button className="text-blue-900 hover:text-blue-800 text-sm font-medium">View All</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {recentMessages.map((message, index) => (
                <div key={index} className={`p-3 sm:p-4 flex items-center space-x-2 sm:space-x-3 ${
                  index !== recentMessages.length - 1 ? 'border-b border-gray-100' : ''
                }`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">  {/* min-width ensures proper text truncation */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{message.name}</h3>
                      <span className="text-xs text-gray-400">{message.time}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0 sm:mt-1 truncate">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex-1 flex flex-col lg:ml-60 w-full">
        <DashboardHeader 
          parentName={parentName} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
