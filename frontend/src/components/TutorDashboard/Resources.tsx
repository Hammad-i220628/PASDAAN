import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// Types
interface Resource {
  id: string;
  title: string;
  subject: string;
  category: string;
  type: 'PDF' | 'Video' | 'PPT' | 'Quiz';
  uploadDate: string;
  size?: string;
  duration?: string;
  questions?: number;
  description?: string;
  isPremium?: boolean;
  publisher: string;
  level: string;
}

// Sample data
const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Calculus Formulas Cheat Sheet',
    subject: 'Mathematics',
    category: 'Calculus',
    type: 'PDF',
    uploadDate: 'Mar 15, 2025',
    size: '2.4 MB',
    publisher: 'Pasdaan',
    level: 'A-Level',
    description: 'Comprehensive formulas and concepts for calculus'
  },
  {
    id: '2',
    title: 'Understanding Newton\'s Laws',
    subject: 'Physics',
    category: 'Mechanics',
    type: 'Video',
    uploadDate: 'Mar 10, 2025',
    duration: '15:42',
    publisher: 'Pasdaan',
    level: 'O-Level',
    description: 'Visual explanation of Newton\'s three laws of motion'
  },
  {
    id: '3',
    title: 'Organic Chemistry Reactions',
    subject: 'Chemistry',
    category: 'Organic',
    type: 'PPT',
    uploadDate: 'Mar 5, 2025',
    size: '4.8 MB',
    publisher: 'Pasdaan',
    level: 'A-Level',
    description: 'Complete guide to organic chemistry reactions'
  },
  {
    id: '4',
    title: 'Algebra Practice Problems',
    subject: 'Mathematics',
    category: 'Algebra',
    type: 'Quiz',
    uploadDate: 'Feb 28, 2025',
    questions: 20,
    publisher: 'Pasdaan',
    level: 'O-Level',
    description: 'Practice problems with step-by-step solutions'
  },
  {
    id: '5',
    title: 'Complete O-Level Mathematics Guide',
    subject: 'Mathematics',
    category: 'O-Level',
    type: 'PDF',
    uploadDate: 'Feb 20, 2025',
    size: '15.2 MB',
    publisher: 'Pasdaan',
    level: 'O-Level',
    description: 'Comprehensive mathematics guide for O-Level students'
  },
  {
    id: '6',
    title: 'Effective Teaching Strategies',
    subject: 'Professional Development',
    category: 'Teaching',
    type: 'Video',
    uploadDate: 'Feb 15, 2025',
    duration: '45:18',
    publisher: 'Pasdaan',
    level: 'Professional',
    description: 'Modern teaching methodologies and best practices'
  },
  {
    id: '7',
    title: 'A-Level Physics Practice Tests',
    subject: 'Physics',
    category: 'A-Level',
    type: 'PDF',
    uploadDate: 'Feb 10, 2025',
    size: '8.7 MB',
    publisher: 'Pasdaan',
    level: 'A-Level',
    description: 'Comprehensive practice tests for A-Level Physics'
  },
  {
    id: '8',
    title: 'Chemistry Lab Experiments',
    subject: 'Chemistry',
    category: 'Practical',
    type: 'PPT',
    uploadDate: 'Feb 5, 2025',
    size: '12.5 MB',
    publisher: 'Pasdaan',
    level: 'A-Level',
    description: 'Laboratory experiments with safety guidelines',
    isPremium: true
  }
];

// Tab component
const TabButton = ({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) => (
  <button
    onClick={onClick}
    className={`px-0 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap border-b-2 mr-4 sm:mr-6 md:mr-8 ${
      active
        ? 'text-blue-900 border-blue-900'
        : 'text-gray-500 border-transparent hover:text-blue-900'
    }`}
  >
    {children}
  </button>
);

// Resource Type Icon - Not needed for this design

// Resource Type Badge
const getTypeBadge = (type: string, isPremium?: boolean) => {
  const baseClasses = "absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded";
  
  if (isPremium) {
    return <span className={`${baseClasses} bg-yellow-400 text-yellow-900`}>Premium</span>;
  }
  
  switch (type) {
    case 'PDF':
      return <span className={`${baseClasses} bg-gray-600 text-white`}>PDF</span>;
    case 'Video':
      return <span className={`${baseClasses} bg-blue-600 text-white`}>Video</span>;
    case 'PPT':
      return <span className={`${baseClasses} bg-orange-600 text-white`}>PPT</span>;
    case 'Quiz':
      return <span className={`${baseClasses} bg-green-600 text-white`}>Quiz</span>;
    default:
      return <span className={`${baseClasses} bg-gray-600 text-white`}>{type}</span>;
  }
};

// Resource Card Component
const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-100 shadow-sm">
      <div className="relative">
        {/* Resource Preview Area */}
        <div className="h-36 sm:h-40 md:h-44 bg-gray-200 relative">
          {getTypeBadge(resource.type, resource.isPremium)}
        </div>
        
        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-blue-900 mb-2 line-clamp-2 leading-tight">
            {resource.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-3 truncate">
            {resource.subject} - {resource.category}
          </p>
          
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="flex flex-col text-xs sm:text-sm text-gray-500 mb-4 space-y-1">
            <span className="truncate">Uploaded: {resource.uploadDate}</span>
            <span className="truncate">
              {resource.size || resource.duration || `${resource.questions} Questions`}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            <button className="flex-1 text-xs sm:text-sm text-green-600 hover:text-green-700 transition-colors font-medium px-3 py-2 rounded-md hover:bg-green-50 border border-green-200">
              View
            </button>
            
            <button className="flex-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 border border-gray-200">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filters Component
interface ResourceFiltersProps {
  subjectFilter: string;
  typeFilter: string;
  searchQuery: string;
  setSubjectFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
}

const ResourceFilters = ({ 
  subjectFilter, 
  typeFilter, 
  searchQuery, 
  setSubjectFilter, 
  setTypeFilter, 
  setSearchQuery 
}: ResourceFiltersProps) => {
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [subjectMaxHeight, setSubjectMaxHeight] = useState(0);
  const [typeMaxHeight, setTypeMaxHeight] = useState(0);
  
  const subjectDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const subjectContentRef = useRef<HTMLDivElement>(null);
  const typeContentRef = useRef<HTMLDivElement>(null);
  
  const subjects = ['All subjects', 'Mathematics', 'Physics', 'Chemistry', 'Professional Development'];
  const types = ['All Types', 'PDF', 'Video', 'PPT', 'Quiz'];

  // Calculate max heights for dropdown animations
  useEffect(() => {
    if (showSubjectDropdown && subjectContentRef.current) {
      const contentHeight = subjectContentRef.current.scrollHeight;
      setSubjectMaxHeight(Math.min(contentHeight, 240));
    } else {
      setSubjectMaxHeight(0);
    }
  }, [showSubjectDropdown, subjects]);

  useEffect(() => {
    if (showTypeDropdown && typeContentRef.current) {
      const contentHeight = typeContentRef.current.scrollHeight;
      setTypeMaxHeight(Math.min(contentHeight, 240));
    } else {
      setTypeMaxHeight(0);
    }
  }, [showTypeDropdown, types]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
        setShowSubjectDropdown(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
    };

    if (showSubjectDropdown || showTypeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSubjectDropdown, showTypeDropdown]);

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
        
        /* Ensure no horizontal overflow */
        * {
          box-sizing: border-box;
        }
        
        .resources-container {
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        .resources-container * {
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Hide scrollbars completely */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Subject Filter */}
        <div className="relative w-full sm:w-auto" ref={subjectDropdownRef}>
          <button
            onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            className="w-full sm:w-auto flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors min-w-0 sm:min-w-[140px]"
          >
            <span className={`truncate ${subjectFilter === 'All subjects' ? 'text-gray-500' : 'text-gray-900'}`}>
              {subjectFilter}
            </span>
            <ChevronDown className={`w-4 h-4 ml-2 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
              showSubjectDropdown ? 'rotate-180' : 'rotate-0'
            }`} />
          </button>
          
          {/* Subject Dropdown */}
          <div
            className="absolute z-50 mt-1 w-full sm:w-56 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-out left-0"
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
              {subjects.map((subject, index) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSubjectFilter(subject);
                    setShowSubjectDropdown(false);
                  }}
                  className={`w-full px-3 py-2.5 sm:py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 ${
                    subjectFilter === subject
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700'
                  }`}
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animation: showSubjectDropdown ? 'slideInOption 0.4s ease-out forwards' : 'none'
                  }}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Type Filter */}
        <div className="relative w-full sm:w-auto" ref={typeDropdownRef}>
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="w-full sm:w-auto flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors min-w-0 sm:min-w-[120px]"
          >
            <span className={`truncate ${typeFilter === 'All Types' ? 'text-gray-500' : 'text-gray-900'}`}>
              {typeFilter}
            </span>
            <ChevronDown className={`w-4 h-4 ml-2 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
              showTypeDropdown ? 'rotate-180' : 'rotate-0'
            }`} />
          </button>
          
          {/* Type Dropdown */}
          <div
            className="absolute z-50 mt-1 w-full sm:w-48 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-500 ease-out left-0"
            style={{
              maxHeight: `${typeMaxHeight}px`,
              opacity: showTypeDropdown ? 1 : 0,
              visibility: showTypeDropdown ? 'visible' : 'hidden',
              transform: showTypeDropdown ? 'translateY(0)' : 'translateY(-10px)',
            }}
          >
            <div
              ref={typeContentRef}
              className="overflow-y-auto scrollbar-hide"
              style={{ maxHeight: '240px' }}
            >
              {types.map((type, index) => (
                <button
                  key={type}
                  onClick={() => {
                    setTypeFilter(type);
                    setShowTypeDropdown(false);
                  }}
                  className={`w-full px-3 py-2.5 sm:py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 ${
                    typeFilter === type
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700'
                  }`}
                  style={{
                    animationDelay: `${index * 30}ms`,
                    animation: showTypeDropdown ? 'slideInOption 0.4s ease-out forwards' : 'none'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>
    </>
  );
};

// Pagination Component
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
            currentPage === index + 1
              ? 'bg-blue-900 text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

// Main Resources Component
const Resources = () => {
  const [activeTab, setActiveTab] = useState('My Resources');
  const [subjectFilter, setSubjectFilter] = useState('All subjects');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs = ['My Resources', 'Shared With Students', 'Pasdaan Library', 'Upload New'];

  // Filter resources based on selected filters and search query
  const filteredResources = sampleResources.filter((resource) => {
    // Subject filter
    if (subjectFilter !== 'All subjects' && resource.subject !== subjectFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'All Types' && resource.type !== typeFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(searchLower) ||
        resource.subject.toLowerCase().includes(searchLower) ||
        resource.category.toLowerCase().includes(searchLower) ||
        resource.description?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return (
    <div className="resources-container w-full bg-gray-50 min-h-screen overflow-hidden">
      <div className="w-full min-w-0 px-4 sm:px-6 py-4 sm:py-6" style={{ maxWidth: '100vw' }}>
        {/* Header */}
        <div className="mb-6 sm:mb-8 w-full min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6 sm:mb-8 truncate">
            Educational Resources
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4 sm:mb-6 -mx-4 sm:-mx-6">
            <div className="flex overflow-x-auto scrollbar-hide px-4 sm:px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {tabs.map((tab) => (
                <TabButton
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </TabButton>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="w-full min-w-0">
            <ResourceFilters 
              subjectFilter={subjectFilter}
              typeFilter={typeFilter}
              searchQuery={searchQuery}
              setSubjectFilter={setSubjectFilter}
              setTypeFilter={setTypeFilter}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="w-full min-w-0">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms to see more resources.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default Resources;
