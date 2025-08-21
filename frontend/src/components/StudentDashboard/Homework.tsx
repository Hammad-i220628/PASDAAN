import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  Download,
  Eye,
  Star,
  Filter,
  Search,
  ChevronRight,
  Menu,
  X,
  PlusCircle,
  Edit3,
  Trash2
} from 'lucide-react';
import StudentSidebar from './StudentSidebar';

interface Homework {
  id: string;
  title: string;
  subject: string;
  tutor: string;
  description: string;
  dueDate: string;
  dueTime: string;
  assignedDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  grade?: number;
  maxGrade?: number;
  feedback?: string;
  attachments?: string[];
  submissionFile?: string;
  estimatedTime?: string;
}

const sampleHomework: Homework[] = [
  {
    id: 'hw-001',
    title: 'Algebra Problem Set - Chapter 5',
    subject: 'Mathematics',
    tutor: 'Farhan Ali',
    description: 'Complete exercises 1-15 from Chapter 5: Quadratic Equations. Show all working steps and include graphs where applicable.',
    dueDate: '2025-08-22',
    dueTime: '11:59 PM',
    assignedDate: '2025-08-18',
    status: 'pending',
    priority: 'high',
    estimatedTime: '2 hours',
    attachments: ['algebra_chapter5.pdf', 'sample_solutions.pdf']
  },
  {
    id: 'hw-002',
    title: 'Physics Lab Report - Motion Experiments',
    subject: 'Physics',
    tutor: 'Aisha Khan',
    description: 'Write a comprehensive lab report on the motion experiments conducted last week. Include data analysis, graphs, and conclusions.',
    dueDate: '2025-08-24',
    dueTime: '6:00 PM',
    assignedDate: '2025-08-17',
    status: 'submitted',
    priority: 'medium',
    estimatedTime: '3 hours',
    submissionFile: 'physics_lab_report.pdf',
    attachments: ['lab_instructions.pdf', 'data_template.xlsx']
  },
  {
    id: 'hw-003',
    title: 'Essay: Environmental Challenges',
    subject: 'English',
    tutor: 'Imran Siddiqui',
    description: 'Write a 1500-word essay on current environmental challenges and their solutions. Include at least 5 credible sources.',
    dueDate: '2025-08-26',
    dueTime: '11:59 PM',
    assignedDate: '2025-08-19',
    status: 'pending',
    priority: 'medium',
    estimatedTime: '4 hours',
    attachments: ['essay_guidelines.pdf', 'citation_format.pdf']
  },
  {
    id: 'hw-004',
    title: 'Chemistry: Periodic Table Quiz Prep',
    subject: 'Chemistry',
    tutor: 'Dr. Sarah Ahmed',
    description: 'Study the periodic table trends and complete the practice problems. Quiz will be held next session.',
    dueDate: '2025-08-20',
    dueTime: '9:00 AM',
    assignedDate: '2025-08-15',
    status: 'overdue',
    priority: 'high',
    estimatedTime: '1.5 hours',
    attachments: ['periodic_trends.pdf']
  },
  {
    id: 'hw-005',
    title: 'History Research Project',
    subject: 'History',
    tutor: 'Ahmad Hassan',
    description: 'Research and present on the Mughal Empire\'s impact on South Asian culture. Create a presentation with visuals.',
    dueDate: '2025-08-15',
    dueTime: '2:00 PM',
    assignedDate: '2025-08-08',
    status: 'graded',
    priority: 'low',
    grade: 88,
    maxGrade: 100,
    feedback: 'Excellent research and presentation. Well-structured arguments and good use of primary sources.',
    submissionFile: 'mughal_empire_presentation.pptx',
    estimatedTime: '5 hours'
  }
];

const subjects = ['All', 'Mathematics', 'Physics', 'English', 'Chemistry', 'History'];
const statusFilters = ['All', 'Pending', 'Submitted', 'Graded', 'Overdue'];

const Homework: React.FC = () => {
  const [query, setQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Sample student data to get student info
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

  // Smooth scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    if (!studentId) {
      navigate('/parent-dashboard');
    }
  }, [studentId, navigate]);

  const filteredHomework = useMemo(() => {
    let filtered = sampleHomework;
    
    // Filter by subject
    if (subjectFilter !== 'All') {
      filtered = filtered.filter(hw => hw.subject === subjectFilter);
    }
    
    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(hw => hw.status === statusFilter.toLowerCase());
    }
    
    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(hw =>
        hw.title.toLowerCase().includes(q) ||
        hw.subject.toLowerCase().includes(q) ||
        hw.tutor.toLowerCase().includes(q) ||
        hw.description.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  }, [query, subjectFilter, statusFilter]);

  const handleBackToParent = () => {
    navigate('/parent-dashboard?section=student-dashboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <Upload className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!currentStudent) {
    React.useEffect(() => {
      navigate('/parent-dashboard');
    }, [navigate]);
    return null;
  }

  // Calculate stats
  const stats = {
    total: sampleHomework.length,
    pending: sampleHomework.filter(hw => hw.status === 'pending').length,
    submitted: sampleHomework.filter(hw => hw.status === 'submitted').length,
    graded: sampleHomework.filter(hw => hw.status === 'graded').length,
    overdue: sampleHomework.filter(hw => hw.status === 'overdue').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header with Student Welcome - Fixed */}
      <div className="bg-blue-900 text-white px-4 md:px-6 py-4 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={handleBackToParent} className="p-2 hover:bg-blue-800 rounded-lg transition-colors mr-2 md:mr-4">
              <ChevronRight className="w-5 h-5 rotate-180" />
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

      {/* Add top padding to account for fixed header */}
      <div className="pt-16">
        <div className="flex min-h-screen">
          <StudentSidebar
            studentId={studentId}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {/* Main Content */}
          <div className="flex-1 bg-white w-full lg:pl-60">
            <div className="p-4 sm:p-6">
            {/* Page header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Homework</h1>
              <p className="text-gray-600 mt-2">Track your assignments and submissions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
                <div className="text-xs text-gray-600">Submitted</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.graded}</div>
                <div className="text-xs text-gray-600">Graded</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
                <div className="text-xs text-gray-600">Overdue</div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search homework assignments..."
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Subject Filter */}
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusFilters.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Homework List */}
            <div className="space-y-4">
              {filteredHomework.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">No homework assignments found</p>
                  <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                filteredHomework.map((homework) => {
                  const daysUntilDue = getDaysUntilDue(homework.dueDate);
                  return (
                    <div key={homework.id} className="bg-white border rounded-lg shadow-sm p-4 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        {/* Left Side - Main Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${getStatusColor(homework.status)}`}>
                              {getStatusIcon(homework.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{homework.title}</h3>
                                <span className={`text-xs ${getPriorityColor(homework.priority)}`}>
                                  ●
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <span>{homework.subject}</span>
                                <span>•</span>
                                <span>{homework.tutor}</span>
                                {homework.estimatedTime && (
                                  <>
                                    <span>•</span>
                                    <span>{homework.estimatedTime}</span>
                                  </>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 mb-3">{homework.description}</p>
                              
                              {/* Attachments */}
                              {homework.attachments && homework.attachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {homework.attachments.map((attachment, index) => (
                                    <a
                                      key={index}
                                      href="#"
                                      className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                                    >
                                      <FileText className="w-3 h-3 mr-1" />
                                      {attachment}
                                    </a>
                                  ))}
                                </div>
                              )}

                              {/* Grade/Feedback */}
                              {homework.status === 'graded' && homework.grade && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-4 h-4 text-green-600" />
                                    <span className="font-semibold text-green-800">
                                      Grade: {homework.grade}/{homework.maxGrade}
                                    </span>
                                  </div>
                                  {homework.feedback && (
                                    <p className="text-sm text-green-700">{homework.feedback}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Due Date & Actions */}
                        <div className="lg:text-right">
                          <div className="mb-3">
                            <div className="text-sm text-gray-600">Due Date</div>
                            <div className="font-semibold text-gray-900">
                              {formatDate(homework.dueDate)}
                            </div>
                            <div className="text-sm text-gray-600">{homework.dueTime}</div>
                            {homework.status === 'pending' && (
                              <div className={`text-xs mt-1 ${
                                daysUntilDue < 0 ? 'text-red-600' :
                                daysUntilDue === 0 ? 'text-orange-600' :
                                daysUntilDue <= 2 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                                 daysUntilDue === 0 ? 'Due today' :
                                 `${daysUntilDue} days left`}
                              </div>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            {homework.status === 'pending' && (
                              <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                                Submit Work
                              </button>
                            )}
                            {homework.submissionFile && (
                              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors inline-flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                View Submission
                              </button>
                            )}
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
