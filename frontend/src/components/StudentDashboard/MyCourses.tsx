import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  PlayCircle,
  Calendar,
  Clock,
  Star,
  Search,
  Filter,
  ChevronRight,
  Home,
  User,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import StudentSidebar from './StudentSidebar';

interface Course {
  id: string;
  title: string;
  subject: string;
  tutor: string;
  rating: number;
  lessons: number;
  completedLessons: number;
  nextSession?: string; // ISO or human-readable
  thumbnail?: string;
  color?: string; // Tailwind bg color utility
}

const sampleCourses: Course[] = [
  {
    id: 'math-101',
    title: 'Algebra Foundations',
    subject: 'Mathematics',
    tutor: 'Farhan Ali',
    rating: 4.9,
    lessons: 24,
    completedLessons: 18,
    nextSession: 'Today • 5:00 PM',
    thumbnail: '/home_image1.jpg',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'phy-201',
    title: 'Mechanics Essentials',
    subject: 'Physics',
    tutor: 'Aisha Khan',
    rating: 4.8,
    lessons: 18,
    completedLessons: 9,
    nextSession: 'Tomorrow • 6:30 PM',
    thumbnail: '/home_image2.png',
    color: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'eng-110',
    title: 'Essay Writing Mastery',
    subject: 'English',
    tutor: 'Imran Siddiqui',
    rating: 4.6,
    lessons: 12,
    completedLessons: 12,
    thumbnail: '/home_image3.png',
    color: 'from-emerald-600 to-teal-700'
  }
];

const tags = ['All', 'Mathematics', 'Physics', 'English'];

const MyCourses: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
    
    // Redirect to student dashboard if no studentId
    if (!studentId) {
      navigate('/student-dashboard');
    }
  }, [studentId, navigate]);

  const filtered = useMemo(() => {
    const byTag = activeTag === 'All' ? sampleCourses : sampleCourses.filter(c => c.subject === activeTag);
    const q = query.trim().toLowerCase();
    if (!q) return byTag;
    return byTag.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.tutor.toLowerCase().includes(q)
    );
  }, [query, activeTag]);

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
          <div className="flex-1 bg-white w-full lg:pl-60">
            <div className="p-4 sm:p-6">
            {/* Page header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600 mt-2">Continue learning from where you left off</p>
            </div>

      {/* Actions: search + filters */}
      <div className="bg-white border rounded-lg shadow-sm p-3 sm:p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, subject, or tutor"
              className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                activeTag === tag ? 'bg-blue-900 text-white border-blue-900' : 'text-gray-700 hover:bg-gray-50 border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Enrolled Courses */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" /> Enrolled Courses
          </h2>
          <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
            <p className="text-gray-700 font-medium">No courses match your search.</p>
            <p className="text-gray-500 text-sm mt-1">Try a different keyword or filter.</p>
            <div className="mt-4">
              <a href="/find-tutor" className="inline-flex items-center bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
                Browse Tutors
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(course => {
              const progress = Math.round((course.completedLessons / course.lessons) * 100);
              return (
                <div key={course.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                  {/* Thumbnail */}
                  <div className={`relative h-32 bg-gradient-to-r ${course.color ?? 'from-blue-700 to-blue-900'}`}>
                    {course.thumbnail && (
                      <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    <button className="absolute bottom-3 left-3 inline-flex items-center bg-white/95 text-blue-900 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white">
                      <PlayCircle className="w-4 h-4 mr-1.5" /> Resume
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.subject} • {course.tutor}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">({course.rating.toFixed(1)})</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{course.completedLessons}/{course.lessons} lessons</span>
                        <span className="font-semibold text-gray-800">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-900" style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    {/* Next session and actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{course.nextSession ?? 'No session scheduled'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a className="text-xs font-medium text-blue-700 hover:text-blue-900" href="#">View Details</a>
                        <a className="text-xs font-medium text-teal-700 hover:text-teal-900" href="#">Resources</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Learning streak / reminders */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg shadow-sm p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Keep up your learning streak</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">7</div>
              <div>
                <p className="text-sm text-gray-900 font-medium">7-day streak</p>
                <p className="text-xs text-gray-600">Great job! Complete a lesson today to keep it going.</p>
              </div>
            </div>
            <a href="#" className="inline-flex items-center bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">Start a Lesson</a>
          </div>
        </div>
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Reminders</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /> Join Algebra session at 5:00 PM</li>
            <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /> Submit English essay draft in 2 days</li>
          </ul>
        </div>
      </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
