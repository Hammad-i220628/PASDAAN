import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Filter, 
  Eye, 
  MessageCircle,
  Clock,
  User,
  ChevronDown
} from 'lucide-react';

interface Session {
  id: string;
  time: string;
  tutorName: string;
  subject: string;
  date: string;
  duration: string;
  location: string;
  status: 'ongoing' | 'in-progress' | 'cancelled' | 'completed' | 'scheduled' | 'pending-payment' | 'free-trial';
  paymentStatus: 'paid' | 'pending' | 'not-required';
  studentName?: string;
}

const Sessions = () => {
  const [dateRange, setDateRange] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Sessions');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [studentFilter, setStudentFilter] = useState('All Students');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [statusMaxHeight, setStatusMaxHeight] = useState(0);
  const [subjectMaxHeight, setSubjectMaxHeight] = useState(0);
  const [studentMaxHeight, setStudentMaxHeight] = useState(0);
  const [datePickerMaxHeight, setDatePickerMaxHeight] = useState(0);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);
  const studentDropdownRef = useRef<HTMLDivElement>(null);
  const statusContentRef = useRef<HTMLDivElement>(null);
  const subjectContentRef = useRef<HTMLDivElement>(null);
  const studentContentRef = useRef<HTMLDivElement>(null);
  const datePickerContentRef = useRef<HTMLDivElement>(null);

  // Sample session data based on the image
  const sessions: Session[] = [
    {
      id: '1',
      time: '4:00 PM',
      tutorName: 'Sara Ahmed',
      subject: 'Mathematics - Calculus',
      date: 'Today',
      duration: '1 hour',
      location: 'Online',
      status: 'ongoing',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      time: '3:30 PM',
      tutorName: 'Zainab Khan',
      subject: 'Chemistry - Organic Chemistry',
      date: 'Today',
      duration: '2 hours',
      location: 'Online',
      status: 'in-progress',
      paymentStatus: 'paid'
    },
    {
      id: '3',
      time: '2:00 PM',
      tutorName: 'Ali Khan',
      subject: 'Physics - Mechanics',
      date: 'Yesterday',
      duration: '1.5 hours',
      location: 'In Person',
      status: 'cancelled',
      paymentStatus: 'pending'
    },
    {
      id: '4',
      time: '11:00 AM',
      tutorName: 'Hassan Ahmed',
      subject: 'English - Literature',
      date: 'Yesterday',
      duration: '1 hour',
      location: 'Online',
      status: 'cancelled',
      paymentStatus: 'not-required'
    },
    {
      id: '5',
      time: '10:30 AM',
      tutorName: 'Fatima Zahra',
      subject: 'Biology - Cell Biology',
      date: 'Tomorrow',
      duration: '1 hour',
      location: 'Online',
      status: 'pending-payment',
      paymentStatus: 'pending'
    },
    {
      id: '6',
      time: '3:00 PM',
      tutorName: 'Omar Malik',
      subject: 'Computer Science - Programming',
      date: 'Tomorrow',
      duration: '2 hours',
      location: 'Online',
      status: 'scheduled',
      paymentStatus: 'paid'
    },
    {
      id: '7',
      time: '5:00 PM',
      tutorName: 'Ayesha Khan',
      subject: 'Mathematics - Algebra',
      date: 'Tomorrow',
      duration: '30 minutes',
      location: 'Online',
      status: 'free-trial',
      paymentStatus: 'not-required'
    }
  ];

  // Helper function to format date
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Handle date selection from calendar
  const handleDateSelect = (selectedDate: string) => {
    setDateRange(selectedDate);
    setShowDatePicker(false);
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange('');
    setShowDatePicker(false);
  };

  // Dropdown options
  const statusOptions = [
    'All Sessions',
    'Ongoing',
    'In Progress',
    'Cancelled',
    'Completed',
    'Scheduled',
    'Pending Payment',
    'Free Trial'
  ];

  const subjectOptions = [
    'All Subjects',
    'Mathematics',
    'Chemistry',
    'Physics',
    'English',
    'Biology',
    'Computer Science'
  ];

  const studentOptions = [
    'All Students',
    'Sara Ahmed',
    'Zainab Khan',
    'Ali Khan',
    'Hassan Ahmed',
    'Fatima Zahra',
    'Omar Malik',
    'Ayesha Khan'
  ];

  // Calculate max heights for dropdown animations
  useEffect(() => {
    if (showDatePicker && datePickerContentRef.current) {
      const contentHeight = datePickerContentRef.current.scrollHeight;
      setDatePickerMaxHeight(Math.min(contentHeight, 300));
    } else {
      setDatePickerMaxHeight(0);
    }
  }, [showDatePicker]);

  useEffect(() => {
    if (showStatusDropdown && statusContentRef.current) {
      const contentHeight = statusContentRef.current.scrollHeight;
      setStatusMaxHeight(Math.min(contentHeight, 240));
    } else {
      setStatusMaxHeight(0);
    }
  }, [showStatusDropdown, statusOptions]);

  useEffect(() => {
    if (showSubjectDropdown && subjectContentRef.current) {
      const contentHeight = subjectContentRef.current.scrollHeight;
      setSubjectMaxHeight(Math.min(contentHeight, 240));
    } else {
      setSubjectMaxHeight(0);
    }
  }, [showSubjectDropdown, subjectOptions]);

  useEffect(() => {
    if (showStudentDropdown && studentContentRef.current) {
      const contentHeight = studentContentRef.current.scrollHeight;
      setStudentMaxHeight(Math.min(contentHeight, 240));
    } else {
      setStudentMaxHeight(0);
    }
  }, [showStudentDropdown, studentOptions]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
        setShowSubjectDropdown(false);
      }
      if (studentDropdownRef.current && !studentDropdownRef.current.contains(event.target as Node)) {
        setShowStudentDropdown(false);
      }
    };

    if (showDatePicker || showStatusDropdown || showSubjectDropdown || showStudentDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker, showStatusDropdown, showSubjectDropdown, showStudentDropdown]);

  // Filter sessions based on selected filters
  const filteredSessions = sessions.filter((session) => {
    // Date filter
    if (dateRange && dateRange !== 'mm/dd/yyyy') {
      // Simple date matching - you can implement more sophisticated date range logic
      const searchDate = dateRange.toLowerCase();
      const sessionDate = session.date.toLowerCase();
      if (!sessionDate.includes(searchDate) && searchDate !== sessionDate) {
        return false;
      }
    }

    // Status filter
    if (statusFilter !== 'All Sessions') {
      const filterStatus = statusFilter.toLowerCase().replace(' ', '-');
      if (session.status !== filterStatus) {
        return false;
      }
    }

    // Subject filter
    if (subjectFilter !== 'All Subjects') {
      if (!session.subject.toLowerCase().includes(subjectFilter.toLowerCase())) {
        return false;
      }
    }

    // Student filter (tutor name in this case)
    if (studentFilter !== 'All Students') {
      if (!session.tutorName.toLowerCase().includes(studentFilter.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  const getStatusBadge = (status: Session['status']) => {
    const statusConfig = {
      'ongoing': {
        label: 'Ongoing',
        className: 'bg-green-100 text-green-800'
      },
      'in-progress': {
        label: 'In Progress',
        className: 'bg-blue-100 text-blue-900'
      },
      'cancelled': {
        label: 'Cancelled',
        className: 'bg-red-100 text-red-800'
      },
      'completed': {
        label: 'Completed',
        className: 'bg-gray-100 text-gray-800'
      },
      'scheduled': {
        label: 'Scheduled',
        className: 'bg-purple-100 text-purple-800'
      },
      'pending-payment': {
        label: 'Pending Payment',
        className: 'bg-yellow-100 text-yellow-800'
      },
      'free-trial': {
        label: 'Free Trial',
        className: 'bg-teal-100 text-teal-800'
      }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getActionButtons = (session: Session) => {
    const baseButtons = [
      <button
        key="view"
        className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
      >
        View Details
      </button>
    ];

    switch (session.status) {
      case 'ongoing':
        return [
          <button
            key="start"
            className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Start Session
          </button>,
          <button
            key="reschedule"
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Reschedule
          </button>
        ];
        
      case 'in-progress':
        return [
          <button
            key="join"
            className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Join Session
          </button>,
          ...baseButtons
        ];
        
      case 'cancelled':
        return [
          <button
            key="reschedule"
            className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Reschedule
          </button>,
          ...baseButtons
        ];
        
      case 'pending-payment':
        return [
          <button
            key="complete"
            className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Complete Payment
          </button>,
          <button
            key="cancel"
            className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Cancel Booking
          </button>
        ];
        
      case 'scheduled':
        return [
          <button
            key="confirm"
            className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Confirm New Time
          </button>,
          ...baseButtons
        ];
        
      case 'free-trial':
        return [
          <button
            key="start"
            className="bg-teal-600 hover:bg-teal-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none whitespace-nowrap"
          >
            Start Trial
          </button>,
          ...baseButtons
        ];
        
      default:
        return baseButtons;
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInOption {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      
      <div className="flex-1 bg-gray-50 overflow-hidden">
        <div className="bg-white h-full">
          {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Sessions</h1>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Date Range */}
            <div className="relative" ref={datePickerRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 text-sm pr-10"
                  placeholder="e.g., Today, Tomorrow, Yesterday"
                />
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              
              {/* Date Picker Dropdown */}
              <div
                className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: `${datePickerMaxHeight}px`,
                  opacity: showDatePicker ? 1 : 0,
                  visibility: showDatePicker ? 'visible' : 'hidden',
                  transform: showDatePicker ? 'translateY(0)' : 'translateY(-10px)',
                }}
              >
                <div
                  ref={datePickerContentRef}
                  className="overflow-y-auto scrollbar-hide"
                  style={{ maxHeight: '300px' }}
                >
                  <div className="p-2 border-b border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Quick Select</p>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => handleDateSelect('Today')}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        style={{
                          animationDelay: '0ms',
                          animation: showDatePicker ? 'slideInOption 0.4s ease-out forwards' : 'none'
                        }}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDateSelect('Tomorrow')}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        style={{
                          animationDelay: '30ms',
                          animation: showDatePicker ? 'slideInOption 0.4s ease-out forwards' : 'none'
                        }}
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDateSelect('Yesterday')}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        style={{
                          animationDelay: '60ms',
                          animation: showDatePicker ? 'slideInOption 0.4s ease-out forwards' : 'none'
                        }}
                      >
                        Yesterday
                      </button>
                    </div>
                  </div>
                  <div className="p-2" style={{
                    animationDelay: '90ms',
                    animation: showDatePicker ? 'slideInOption 0.4s ease-out forwards' : 'none'
                  }}>
                    <p className="text-xs font-medium text-gray-500 mb-2">Custom Date</p>
                    <input
                      type="date"
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const formattedDate = formatDate(selectedDate);
                        handleDateSelect(formattedDate);
                      }}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="p-2 border-t border-gray-200" style={{
                    animationDelay: '120ms',
                    animation: showDatePicker ? 'slideInOption 0.4s ease-out forwards' : 'none'
                  }}>
                    <button
                      type="button"
                      onClick={clearDateFilter}
                      className="w-full px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative" ref={statusDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 text-sm bg-white text-left flex items-center justify-between"
                >
                  <span className={statusFilter === 'All Sessions' ? 'text-gray-500' : 'text-gray-900'}>
                    {statusFilter}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showStatusDropdown ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
                
                {/* Status Dropdown */}
                <div
                  className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: `${statusMaxHeight}px`,
                    opacity: showStatusDropdown ? 1 : 0,
                    visibility: showStatusDropdown ? 'visible' : 'hidden',
                    transform: showStatusDropdown ? 'translateY(0)' : 'translateY(-10px)',
                  }}
                >
                  <div
                    ref={statusContentRef}
                    className="overflow-y-auto scrollbar-hide"
                    style={{ maxHeight: '240px' }}
                  >
                    {statusOptions.map((option, index) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setStatusFilter(option);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 ${
                          statusFilter === option
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700'
                        }`}
                        style={{
                          animationDelay: `${index * 30}ms`,
                          animation: showStatusDropdown ? 'slideInOption 0.4s ease-out forwards' : 'none'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Filter */}
            <div className="relative" ref={subjectDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 text-sm bg-white text-left flex items-center justify-between"
                >
                  <span className={subjectFilter === 'All Subjects' ? 'text-gray-500' : 'text-gray-900'}>
                    {subjectFilter}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showSubjectDropdown ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
                
                {/* Subject Dropdown */}
                <div
                  className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: `${subjectMaxHeight}px`,
                    opacity: showSubjectDropdown ? 1 : 0,
                    visibility: showSubjectDropdown ? 'visible' : 'hidden',
                    transform: showSubjectDropdown ? 'translateY(0)' : 'translateY(-10px)',
                  }}
                >
                  <div
                    ref={subjectContentRef}
                    className="overflow-y-auto scrollbar-hide"
                    style={{ maxHeight: '240px' }}
                  >
                    {subjectOptions.map((option, index) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSubjectFilter(option);
                          setShowSubjectDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 ${
                          subjectFilter === option
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700'
                        }`}
                        style={{
                          animationDelay: `${index * 30}ms`,
                          animation: showSubjectDropdown ? 'slideInOption 0.4s ease-out forwards' : 'none'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Student Filter */}
            <div className="relative" ref={studentDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 text-sm bg-white text-left flex items-center justify-between"
                >
                  <span className={studentFilter === 'All Students' ? 'text-gray-500' : 'text-gray-900'}>
                    {studentFilter}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    showStudentDropdown ? 'rotate-180' : 'rotate-0'
                  }`} />
                </button>
                
                {/* Student Dropdown */}
                <div
                  className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: `${studentMaxHeight}px`,
                    opacity: showStudentDropdown ? 1 : 0,
                    visibility: showStudentDropdown ? 'visible' : 'hidden',
                    transform: showStudentDropdown ? 'translateY(0)' : 'translateY(-10px)',
                  }}
                >
                  <div
                    ref={studentContentRef}
                    className="overflow-y-auto scrollbar-hide"
                    style={{ maxHeight: '240px' }}
                  >
                    {studentOptions.map((option, index) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setStudentFilter(option);
                          setShowStudentDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 ${
                          studentFilter === option
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700'
                        }`}
                        style={{
                          animationDelay: `${index * 30}ms`,
                          animation: showStudentDropdown ? 'slideInOption 0.4s ease-out forwards' : 'none'
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {filteredSessions.map((session) => (
                <div key={session.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-4 sm:p-6">
                    {/* Header Row with Time, Name, Subject and Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                        <div className="bg-blue-900 text-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium min-w-[70px] sm:min-w-[80px] text-center flex-shrink-0">
                          {session.time}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                            {session.tutorName}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {session.subject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-start sm:justify-end">
                        {getStatusBadge(session.status)}
                      </div>
                    </div>

                    {/* Session Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-500 font-medium sm:font-normal">Date:</span>
                        <p className="text-gray-900 font-medium">{session.date}</p>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-500 font-medium sm:font-normal">Duration:</span>
                        <p className="text-gray-900 font-medium">{session.duration}</p>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-500 font-medium sm:font-normal">Location:</span>
                        <p className="text-gray-900 font-medium">{session.location}</p>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-500 font-medium sm:font-normal">Payment Status:</span>
                        <p className="text-gray-900 font-medium capitalize">
                          {session.paymentStatus.replace('-', ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:justify-end">
                      {getActionButtons(session)}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty State (if no sessions) */}
              {filteredSessions.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more sessions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sessions;
