import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  Home,
  User,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface StudentSidebarProps {
  studentId?: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ 
  studentId, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const location = useLocation();

  const menuItems = [
    {
      href: studentId ? `/student-dashboard/${studentId}` : '/student-dashboard',
      icon: Home,
      label: 'Student Dashboard',
      isActive: (studentId && location.pathname === `/student-dashboard/${studentId}`) || 
               (location.pathname === '/student-dashboard' && !studentId)
    },
    {
      href: studentId ? `/student-dashboard/${studentId}/courses` : '#',
      icon: BookOpen,
      label: 'My Courses',
      isActive: location.pathname === `/student-dashboard/${studentId}/courses`
    },
    {
      href: studentId ? `/student-dashboard/${studentId}/homework` : '#',
      icon: User,
      label: 'Home Work',
      isActive: location.pathname === `/student-dashboard/${studentId}/homework`
    },
    {
      href: studentId ? `/student-dashboard/${studentId}/schedule` : '#',
      icon: Calendar,
      label: 'Schedule',
      isActive: location.pathname === `/student-dashboard/${studentId}/schedule`
    },
    {
      href: '#',
      icon: Clock,
      label: 'Results',
      isActive: false
    },
    {
      href: studentId ? `/student-dashboard/${studentId}/messages` : '#',
      icon: MessageSquare,
      label: 'Messages',
      isActive: location.pathname === `/student-dashboard/${studentId}/messages`
    }
  ];

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
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-60 bg-white shadow-sm flex flex-col h-screen border-r border-gray-200 z-40 overflow-hidden
        lg:flex top-16 lg:top-16 left-0
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
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                  item.isActive 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-900 hover:bg-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Items */}
          <div className="px-4 py-2">
            <div className="space-y-2">
              <a 
                href={studentId ? `/student-dashboard/${studentId}/help-support` : '#'} 
                className={`flex items-center px-3 py-3 rounded-lg transition-colors text-sm font-medium ${
                  location.pathname === `/student-dashboard/${studentId}/help-support`
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-900 hover:bg-blue-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                <span>Help & Support</span>
              </a>
            </div>
          </div>
          
          {/* Bottom padding for better scroll experience */}
          <div className="h-6"></div>
        </div>
      </div>
    </>
  );
};

export default StudentSidebar;
