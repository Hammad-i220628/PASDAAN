import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Eye,
  Edit,
} from 'lucide-react';
import IndividualStudentDashboard from './IndividualDashboard';

interface StudentDashboardProps {
  onStudentSelect?: (student: any) => void;
}

const StudentDashboard = ({ onStudentSelect }: StudentDashboardProps) => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Sample data for the students
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

  const handleOpenDashboard = (student: any) => {
    if (onStudentSelect) {
      onStudentSelect(student);
    } else {
      setSelectedStudent(student);
    }
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
  };

  // If a student is selected and no parent callback, show their individual dashboard
  if (selectedStudent && !onStudentSelect) {
    return (
      <IndividualStudentDashboard 
        student={selectedStudent} 
        onBack={handleBackToList}
      />
    );
  }

  // Otherwise show the student list
  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50 overflow-hidden">
      {/* Page Title */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Wanna see your Dashboard</p>
      </div>

      {/* Student Profiles Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Student Profiles
          </h2>
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

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => handleOpenDashboard(student)}
                  className="w-full bg-blue-900 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-800 transition-colors"
                >
                  Open Dashboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default StudentDashboard;
