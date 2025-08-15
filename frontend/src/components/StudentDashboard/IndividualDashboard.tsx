import React from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  Users,
  MessageSquare,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Star,
  CheckCircle,
  ArrowLeft,
  Home,
  User
} from 'lucide-react';

interface IndividualStudentDashboardProps {
  student: {
    id: number;
    name: string;
    grade: string;
    school: string;
    avatar: string;
    status: string;
    subjects: Array<{
      name: string;
      progress: number;
      grade: string;
    }>;
  };
  onBack: () => void;
}

const IndividualStudentDashboard = ({ student, onBack }: IndividualStudentDashboardProps) => {
  // Sample data for the individual student dashboard
  const myProgress = [
    { subject: 'Mathematics', test: 'Algebra Test', date: '12 Mar 2025', score: '92%', progress: 92 },
    { subject: 'Physics', test: 'Mechanics Quiz', date: '10 Mar 2025', score: '78%', progress: 78 },
    { subject: 'Chemistry', test: 'Periodic Table', date: '08 Mar 2025', score: '88%', progress: 88 },
    { subject: 'English', test: 'Grammar Test', date: '06 Mar 2025', score: '56%', progress: 56 },
    { subject: 'Biology', test: 'Cell Structure', date: '01 Mar 2025', score: '85%', progress: 85 }
  ];

  const upcomingSessions = [
    { subject: 'Mathematics - Calculus', tutor: 'Farhan Ahmad', time: '4:00 PM - 5:00 PM', date: 'Today', status: 'Join' },
    { subject: 'Physics - Electromagnetism', tutor: 'Aisha Khan', time: '6:00 PM - 7:00 PM', date: 'Tomorrow', status: 'Reschedule' },
    { subject: 'English - Essay Writing', tutor: 'Imran Siddiqui', time: '5:00 PM - 6:00 PM', date: 'Tomorrow', status: 'Reschedule' }
  ];

  const homework = [
    { subject: 'Mathematics', task: 'Complete exercises 5-7, Chapter 4', due: 'Due Tomorrow', status: 'pending' },
    { subject: 'Physics', task: 'Lab report on Motion Experiments', due: 'Due in 3 days', status: 'pending' },
    { subject: 'English', task: 'Essay on "Environmental Challenges"', due: 'Due in 5 days', status: 'pending' }
  ];

  const tutors = [
    { name: 'Farhan Ali', subject: 'Mathematics', rating: 4.9, status: 'active' },
    { name: 'Aisha Khan', subject: 'Physics', rating: 4.8, status: 'active' },
    { name: 'Imran Siddiqui', subject: 'English', rating: 4.6, status: 'active' }
  ];

  const progressOverview = [
    { subject: 'Mathematics', progress: 85 },
    { subject: 'Physics', progress: 72 },
    { subject: 'Chemistry', progress: 78 },
    { subject: 'English', progress: 65 },
    { subject: 'Urdu', progress: 82 },
    { subject: 'Islamiat', progress: 90 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header with Student Welcome */}
      <div className="bg-blue-900 text-white px-6 py-4">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded-lg transition-colors mr-4">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Welcome back, {student.name}!</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-60 bg-white shadow-sm flex flex-col h-screen border-r border-gray-200 overflow-hidden">
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
              <a
                href="#"
                className="flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium bg-blue-900 text-white"
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Student Dashboard</span>
              </a>
              <a href="#" className="flex items-center px-3 py-3 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                <BookOpen className="w-5 h-5 mr-3" />
                <span>My Courses</span>
              </a>
              <a href="#" className="flex items-center px-3 py-3 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                <User className="w-5 h-5 mr-3" />
                <span>Home Work</span>
              </a>
              <a href="#" className="flex items-center px-3 py-3 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Schedule</span>
              </a>
              <a href="#" className="flex items-center px-3 py-3 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                <Clock className="w-5 h-5 mr-3" />
                <span>Results</span>
              </a>
              <a href="#" className="flex items-center px-3 py-3 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                <MessageSquare className="w-5 h-5 mr-3" />
                <span>Messages</span>
              </a>
            </nav>

            {/* Bottom Items */}
            <div className="px-4 py-2">
              <div className="space-y-2">
                <a href="#" className="flex items-center px-3 py-3 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  <span>Help & Support</span>
                </a>
                <button className="w-full flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium text-blue-900 hover:bg-blue-50 text-left">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            
            {/* Bottom padding for better scroll experience */}
            <div className="h-6"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* My Progress */}
                <div className="bg-white">
                  <div className="border-b border-gray-300 pb-3 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">My Progress</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Subject</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Test</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Date</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Score</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myProgress.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 text-sm font-medium text-gray-900">{item.subject}</td>
                            <td className="py-3 text-sm text-gray-700">{item.test}</td>
                            <td className="py-3 text-sm text-gray-700">{item.date}</td>
                            <td className="py-3 text-sm font-bold" style={{
                              color: item.progress >= 80 ? '#10b981' : 
                                     item.progress >= 70 ? '#f59e0b' : '#ef4444'
                            }}>
                              {item.score}
                            </td>
                            <td className="py-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full"
                                  style={{ 
                                    width: `${item.progress}%`,
                                    backgroundColor: item.progress >= 80 ? '#10b981' : 
                                                   item.progress >= 70 ? '#f59e0b' : '#ef4444'
                                  }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-white">
                  <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
                    <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</a>
                  </div>
                  <div className="space-y-4">
                    {upcomingSessions.map((session, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900 mb-1">{session.subject}</h3>
                          <p className="text-sm text-gray-600 mb-1">{session.tutor}</p>
                          <p className="text-sm text-gray-500">{session.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-2">{session.date}</p>
                          <button className={`px-4 py-1 rounded text-sm font-medium ${
                            session.status === 'Join' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-teal-600 text-white'
                          }`}>
                            {session.status}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ready to Learn Section */}
                <div>
                  <div className="border-b border-gray-300 pb-3 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Ready to Learn, {student.name}!</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Your Homework */}
                    <div className="bg-white border rounded-lg">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Your Homework</h3>
                          <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          {homework.map((item, index) => (
                            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                              <h4 className="font-semibold text-sm text-gray-900">{item.subject}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.task}</p>
                              <p className={`text-sm font-medium mt-1 ${
                                item.due.includes('Tomorrow') ? 'text-red-500' : 'text-orange-500'
                              }`}>
                                {item.due}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <a href="#" className="text-teal-600 text-sm font-medium hover:text-teal-800">View All Homework</a>
                        </div>
                      </div>
                    </div>

                    {/* Your Tutors */}
                    <div className="bg-white border rounded-lg">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Your Tutors</h3>
                          <MessageSquare className="w-5 h-5 text-teal-600" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          {tutors.map((tutor, index) => (
                            <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                  {tutor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900">{tutor.name}</h4>
                                  <p className="text-xs text-gray-600">{tutor.subject}</p>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-3 h-3 ${
                                        i < Math.floor(tutor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`} />
                                    ))}
                                    <span className="text-xs text-gray-600 ml-1">({tutor.rating})</span>
                                  </div>
                                </div>
                              </div>
                              <button className="bg-teal-600 text-white px-3 py-1 rounded text-xs font-medium">
                                Message
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <a href="#" className="text-teal-600 text-sm font-medium hover:text-teal-800">Find New Tutors</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Current Tutor */}
                <div className="bg-white border rounded-lg">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Current Tutor</h3>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
                      <img src="/api/placeholder/64/64" alt="Farhan Ahmad" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-base text-gray-900">Farhan Ahmad</h4>
                    <p className="text-sm text-gray-600">Mathematics Specialist</p>
                    <div className="flex items-center justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} />
                      ))}
                      <span className="text-sm font-semibold ml-1 text-gray-700">4.9</span>
                    </div>
                    <button className="w-full bg-blue-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors mt-3">
                      Contact Tutor
                    </button>
                  </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white border rounded-lg">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Progress Overview</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {progressOverview.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900">{item.subject}</span>
                            <span className="text-sm font-semibold text-gray-900">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-900"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualStudentDashboard;
