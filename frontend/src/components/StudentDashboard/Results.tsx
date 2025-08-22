import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Menu, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target, 
  BookOpen, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Star,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import StudentSidebar from './StudentSidebar';

// Types
interface SubjectGrade {
  subject: string;
  currentGrade: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  color: string;
  assignments: number;
  completed: number;
}

interface TestResult {
  id: string;
  subject: string;
  testName: string;
  date: string;
  score: number;
  maxScore: number;
  grade: string;
  tutor: string;
  feedback?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  category: 'academic' | 'improvement' | 'attendance' | 'homework';
}

const Results = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

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

  // Sample grades data
  const subjectGrades: SubjectGrade[] = [
    {
      subject: 'Mathematics',
      currentGrade: 'A-',
      percentage: 87,
      trend: 'up',
      trendValue: 5,
      color: 'bg-blue-500',
      assignments: 12,
      completed: 11
    },
    {
      subject: 'Physics',
      currentGrade: 'B+',
      percentage: 82,
      trend: 'up',
      trendValue: 3,
      color: 'bg-purple-500',
      assignments: 8,
      completed: 8
    },
    {
      subject: 'English',
      currentGrade: 'A',
      percentage: 92,
      trend: 'stable',
      trendValue: 0,
      color: 'bg-green-500',
      assignments: 10,
      completed: 9
    },
    {
      subject: 'Chemistry',
      currentGrade: 'B',
      percentage: 78,
      trend: 'down',
      trendValue: -2,
      color: 'bg-orange-500',
      assignments: 6,
      completed: 6
    }
  ];

  // Sample test results
  const testResults: TestResult[] = [
    {
      id: '1',
      subject: 'Mathematics',
      testName: 'Algebra Quiz 3',
      date: '2025-06-20',
      score: 45,
      maxScore: 50,
      grade: 'A-',
      tutor: 'Mr. Farhan Ahmad',
      feedback: 'Excellent work on problem-solving techniques. Focus on showing more detailed steps.'
    },
    {
      id: '2',
      subject: 'Physics',
      testName: 'Motion & Forces Test',
      date: '2025-06-18',
      score: 38,
      maxScore: 50,
      grade: 'B+',
      tutor: 'Ms. Aisha Khan',
      feedback: 'Good understanding of concepts. Practice more numerical problems.'
    },
    {
      id: '3',
      subject: 'English',
      testName: 'Essay Writing Assessment',
      date: '2025-06-15',
      score: 46,
      maxScore: 50,
      grade: 'A',
      tutor: 'Mr. Imran Siddiqui',
      feedback: 'Outstanding creativity and grammar. Continue developing your voice.'
    },
    {
      id: '4',
      subject: 'Chemistry',
      testName: 'Chemical Reactions Lab',
      date: '2025-06-12',
      score: 39,
      maxScore: 50,
      grade: 'B',
      tutor: 'Dr. Sarah Ahmed',
      feedback: 'Good lab technique. Work on balancing chemical equations.'
    }
  ];

  // Sample achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Perfect Attendance',
      description: 'Attended all sessions this month',
      icon: <CheckCircle className="w-6 h-6" />,
      date: '2025-06-01',
      category: 'attendance'
    },
    {
      id: '2',
      title: 'Math Improvement Star',
      description: 'Improved Math grade by 5 points',
      icon: <TrendingUp className="w-6 h-6" />,
      date: '2025-05-28',
      category: 'improvement'
    },
    {
      id: '3',
      title: 'Homework Champion',
      description: 'Submitted all homework on time',
      icon: <Star className="w-6 h-6" />,
      date: '2025-05-25',
      category: 'homework'
    },
    {
      id: '4',
      title: 'English Excellence',
      description: 'Achieved A grade in English',
      icon: <Award className="w-6 h-6" />,
      date: '2025-05-20',
      category: 'academic'
    }
  ];

  // Smooth scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    if (!studentId) {
      navigate('/student-dashboard');
    }
  }, [studentId, navigate]);

  const handleBackToParent = () => {
    navigate('/parent-dashboard?section=student-dashboard');
  };

  if (!currentStudent) {
    React.useEffect(() => {
      navigate('/parent-dashboard');
    }, [navigate]);
    return null;
  }

  const getOverallGPA = () => {
    const totalPoints = subjectGrades.reduce((sum, grade) => sum + grade.percentage, 0);
    return (totalPoints / subjectGrades.length).toFixed(1);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', value: number) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4 rounded-full bg-gray-400"></div>;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getAchievementColor = (category: Achievement['category']) => {
    const colors = {
      academic: 'bg-blue-50 text-blue-600 border-blue-200',
      improvement: 'bg-green-50 text-green-600 border-green-200',
      attendance: 'bg-purple-50 text-purple-600 border-purple-200',
      homework: 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[category];
  };

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
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="pt-16">
        <div className="flex min-h-screen">
          <StudentSidebar
            studentId={studentId}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <main className="flex-1 lg:ml-60 bg-gray-50 p-3 sm:p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Academic Results</h1>
                  <p className="text-sm text-gray-600 mt-1">Track your grades, test scores, and academic progress</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Download Report</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                  <button className="flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Filter Results</span>
                    <span className="sm:hidden">Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{getOverallGPA()}%</p>
                    <p className="text-sm text-gray-600">Overall Average</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-sm text-gray-600">Subjects</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-sm text-gray-600">Achievements</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">34</p>
                    <p className="text-sm text-gray-600">Assignments Done</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Subject Grades */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Subject Performance</h2>
                <div className="flex gap-2">
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="current">Current Term</option>
                    <option value="previous">Previous Term</option>
                    <option value="year">Full Year</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {subjectGrades.map((grade, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${grade.color} mr-3`}></div>
                        <h3 className="font-medium text-gray-900">{grade.subject}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(grade.trend, grade.trendValue)}
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(grade.percentage)}`}>
                          {grade.currentGrade}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{grade.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${grade.color}`}
                          style={{ width: `${grade.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{grade.completed}/{grade.assignments} assignments</span>
                      {grade.trend !== 'stable' && (
                        <span className={grade.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {grade.trend === 'up' ? '+' : ''}{grade.trendValue}% this month
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Test Results */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Recent Test Results</h2>
                <button className="text-blue-600 text-sm hover:text-blue-800">View All Tests →</button>
              </div>
              
              <div className="space-y-4">
                {testResults.map((test) => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">{test.testName}</h3>
                          <span className="text-sm text-gray-500">• {test.subject}</span>
                          <span className="text-sm text-gray-500">• {test.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">with {test.tutor}</p>
                        {test.feedback && (
                          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded italic">
                            "{test.feedback}"
                          </p>
                        )}
                      </div>
                      <div className="text-right flex sm:flex-col items-center sm:items-end gap-2">
                        <div className={`px-3 py-1 rounded font-medium text-sm ${getGradeColor((test.score / test.maxScore) * 100)}`}>
                          {test.grade}
                        </div>
                        <div className="text-sm text-gray-600">
                          {test.score}/{test.maxScore}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Recent Achievements</h2>
                <button className="text-blue-600 text-sm hover:text-blue-800">View All Achievements →</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`border rounded-lg p-4 ${getAchievementColor(achievement.category)}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {achievement.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Results;
