import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, BookOpen, AlertCircle, Video, User, Menu } from 'lucide-react';
import StudentSidebar from './StudentSidebar';

// Types
interface TutoringSession {
  id: string;
  time: string;
  tutor: string;
  subject: string;
  type: 'online' | 'homework-review' | 'exam-prep';
  color: 'blue' | 'green' | 'orange' | 'purple';
  status: 'scheduled' | 'completed' | 'missed';
}

interface HomeworkDeadline {
  id: string;
  title: string;
  subject: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const Schedule = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Month');

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

  // Sample session data for students
  const sessions: { [key: number]: TutoringSession[] } = {
    11: [
      { id: '1', time: '4:00 PM', tutor: 'Mr. Farhan', subject: 'Mathematics', type: 'online', color: 'blue', status: 'scheduled' }
    ],
    15: [
      { id: '2', time: '5:00 PM', tutor: 'Ms. Aisha', subject: 'Physics', type: 'exam-prep', color: 'purple', status: 'scheduled' }
    ],
    20: [
      { id: '3', time: '3:30 PM', tutor: 'Mr. Imran', subject: 'English', type: 'homework-review', color: 'green', status: 'scheduled' }
    ],
    22: [
      { id: '4', time: '4:30 PM', tutor: 'Dr. Sarah', subject: 'Chemistry', type: 'online', color: 'orange', status: 'scheduled' }
    ],
    25: [
      { id: '5', time: '6:00 PM', tutor: 'Mr. Farhan', subject: 'Mathematics', type: 'online', color: 'blue', status: 'scheduled' }
    ],
    26: [
      { id: '6', time: '2:30 PM', tutor: 'Ms. Aisha', subject: 'Physics', type: 'online', color: 'purple', status: 'scheduled' }
    ]
  };

  // Sample homework deadlines
  const homeworkDeadlines: { [key: number]: HomeworkDeadline[] } = {
    12: [
      { id: 'hw1', title: 'Math Problem Set 5', subject: 'Mathematics', dueTime: '11:59 PM', priority: 'high', completed: false }
    ],
    18: [
      { id: 'hw2', title: 'Physics Lab Report', subject: 'Physics', dueTime: '2:00 PM', priority: 'medium', completed: false }
    ],
    23: [
      { id: 'hw3', title: 'English Essay Draft', subject: 'English', dueTime: '5:00 PM', priority: 'high', completed: false }
    ]
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push({
        date: current.getDate(),
        isCurrentMonth: current.getMonth() === month,
        fullDate: new Date(current)
      });
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getSessionColor = (color: TutoringSession['color']) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[color];
  };

  const getHomeworkPriorityColor = (priority: HomeworkDeadline['priority']) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[priority];
  };

  const getSessionIcon = (type: TutoringSession['type']) => {
    const icons = {
      online: <Video className="w-3 h-3" />,
      'homework-review': <BookOpen className="w-3 h-3" />,
      'exam-prep': <AlertCircle className="w-3 h-3" />
    };
    return icons[type];
  };

  const monthData = getMonthData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header with Student Welcome - Fixed */}
      <div className="bg-blue-900 text-white px-4 md:px-6 py-4 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={handleBackToParent} className="p-2 hover:bg-blue-800 rounded-lg transition-colors mr-2 md:mr-4">
              <ChevronLeft className="w-5 h-5" />
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
          <main className="flex-1 lg:ml-60 bg-gray-50 p-3 sm:p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">My Schedule</h1>
                  <p className="text-sm text-gray-600 mt-1">View your upcoming tutoring sessions and homework deadlines</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Add to Calendar</span>
                    <span className="sm:hidden">Add Event</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center">
                  <Video className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                    <p className="text-sm text-gray-600">Sessions This Week</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-orange-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-sm text-gray-600">Homework Due</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Hours This Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-4 sm:mb-6">
              {/* Calendar Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 text-center">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-0.5 sm:space-x-1 bg-gray-100 rounded-lg p-0.5 sm:p-1">
                  {['Day', 'Week', 'Month'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as 'Day' | 'Week' | 'Month')}
                      className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                        viewMode === mode
                          ? 'bg-blue-900 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-2"></div>
                  <span>Tutoring Sessions</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-3 h-3 bg-red-100 border border-red-200 rounded mr-2"></div>
                  <span>Homework Due</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {/* Day Headers */}
                {weekDays.map((day) => (
                  <div key={day} className="bg-gray-50 p-1.5 sm:p-3 text-center">
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{day.substring(0, 3)}</span>
                    </div>
                  </div>
                ))}

                {/* Calendar Days */}
                {monthData.map((day, index) => (
                  <div
                    key={index}
                    className={`bg-white p-1 sm:p-2 min-h-[80px] sm:min-h-[120px] relative ${
                      !day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium mb-1">{day.date}</div>
                    
                    {/* Sessions */}
                    {day.isCurrentMonth && sessions[day.date] && (
                      <div className="space-y-0.5 sm:space-y-1">
                        {sessions[day.date].map((session) => (
                          <div
                            key={session.id}
                            className={`text-[10px] sm:text-xs p-1 sm:p-2 rounded border ${getSessionColor(session.color)} flex items-start gap-1`}
                          >
                            {getSessionIcon(session.type)}
                            <div className="min-w-0 flex-1">
                              <div className="font-medium">{session.time}</div>
                              <div className="truncate hidden sm:block">{session.tutor} - {session.subject}</div>
                              <div className="truncate sm:hidden">{session.tutor.split(' ')[1] || session.tutor}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Homework Deadlines */}
                    {day.isCurrentMonth && homeworkDeadlines[day.date] && (
                      <div className="space-y-0.5 sm:space-y-1 mt-1">
                        {homeworkDeadlines[day.date].map((homework) => (
                          <div
                            key={homework.id}
                            className={`text-[10px] sm:text-xs p-1 sm:p-2 rounded border ${getHomeworkPriorityColor(homework.priority)} flex items-start gap-1`}
                          >
                            <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium truncate">{homework.title}</div>
                              <div className="text-[9px] sm:text-[10px] opacity-80">Due {homework.dueTime}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-sm font-medium text-gray-900">4:00</div>
                    <div className="text-xs text-gray-500">PM</div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-900">Mathematics Session</span>
                    </div>
                    <div className="text-sm text-gray-600">with Mr. Farhan Ahmad</div>
                    <div className="text-xs text-blue-600 mt-1">Online Session • 60 minutes</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-900 text-white text-xs rounded hover:bg-blue-800">
                    Join
                  </button>
                </div>

                <div className="flex items-start p-3 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-sm font-medium text-gray-900">11:59</div>
                    <div className="text-xs text-gray-500">PM</div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-gray-900">Math Problem Set 5</span>
                    </div>
                    <div className="text-sm text-gray-600">Mathematics Homework Due</div>
                    <div className="text-xs text-red-600 mt-1">High Priority</div>
                  </div>
                  <button className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                    Submit
                  </button>
                </div>
              </div>

              <div className="mt-4 text-center">
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  View Full Schedule →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
