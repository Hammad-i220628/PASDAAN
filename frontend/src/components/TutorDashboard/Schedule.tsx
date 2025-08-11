import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Settings } from 'lucide-react';

// Types
interface Session {
  id: string;
  time: string;
  student: string;
  subject: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

interface WeeklyAvailability {
  [key: string]: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Month');
  const [weeklyAvailability, setWeeklyAvailability] = useState<WeeklyAvailability>({
    Monday: { enabled: true, startTime: '4:00 PM', endTime: '7:00 PM' },
    Tuesday: { enabled: true, startTime: '3:00 PM', endTime: '8:00 PM' },
    Wednesday: { enabled: true, startTime: '4:00 PM', endTime: '7:00 PM' },
    Thursday: { enabled: true, startTime: '3:00 PM', endTime: '8:00 PM' },
    Friday: { enabled: true, startTime: '2:00 PM', endTime: '8:00 PM' },
    Saturday: { enabled: true, startTime: '10:00 AM', endTime: '5:00 PM' },
    Sunday: { enabled: false, startTime: '10:00 AM', endTime: '5:00 PM' },
  });

  // Sample session data
  const sessions: { [key: number]: Session[] } = {
    11: [
      { id: '1', time: '4:00 PM', student: 'Ahmed K.', subject: 'Mathematics', color: 'orange' }
    ],
    20: [
      { id: '2', time: '3:30 PM', student: 'Fatima S.', subject: 'Physics', color: 'blue' }
    ],
    22: [
      { id: '3', time: '3:00 PM', student: 'Zain M.', subject: 'Secondary', color: 'green' }
    ],
    25: [
      { id: '4', time: '6:00 PM', student: 'Sara A.', subject: 'Mathematics', color: 'orange' }
    ],
    26: [
      { id: '5', time: '2:30 PM', student: 'Hamza K.', subject: 'Physics', color: 'purple' }
    ]
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  const getSessionColor = (color: Session['color']) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[color];
  };

  const toggleDayAvailability = (day: string) => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const updateTimeSlot = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const monthData = getMonthData();

  return (
    <div className="flex-1 bg-gray-50 p-3 sm:p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Schedule Management</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export Schedule</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Set Availability</span>
              <span className="sm:hidden">Availability</span>
            </button>
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
              {day.isCurrentMonth && sessions[day.date] && (
                <div className="space-y-0.5 sm:space-y-1">
                  {sessions[day.date].map((session) => (
                    <div
                      key={session.id}
                      className={`text-[10px] sm:text-xs p-1 sm:p-2 rounded border ${getSessionColor(session.color)}`}
                    >
                      <div className="font-medium">{session.time}</div>
                      <div className="truncate hidden sm:block">{session.student} - {session.subject}</div>
                      <div className="truncate sm:hidden">{session.student.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Availability */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Weekly Availability</h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
              <span className="hidden sm:inline">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </button>
            <button className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
              <span className="hidden sm:inline">Save Availability Settings</span>
              <span className="sm:hidden">Save Settings</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 sm:gap-4">
          {Object.entries(weeklyAvailability).map(([day, availability]) => (
            <div key={day} className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">{day}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={availability.enabled}
                    onChange={() => toggleDayAvailability(day)}
                  />
                  <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              {availability.enabled && (
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <input
                      type="text"
                      value={availability.startTime}
                      onChange={(e) => updateTimeSlot(day, 'startTime', e.target.value)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-center text-xs text-gray-500">to</div>
                  <div>
                    <input
                      type="text"
                      value={availability.endTime}
                      onChange={(e) => updateTimeSlot(day, 'endTime', e.target.value)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full text-blue-600 text-xs sm:text-sm hover:text-blue-800">
                    + Add Time Slot
                  </button>
                </div>
              )}
              
              {!availability.enabled && (
                <div className="text-center py-3 sm:py-4">
                  <div className="text-xs sm:text-sm text-gray-400">Day Off</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
