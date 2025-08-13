import React, { useState } from 'react';
import { Star, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface Review {
  id: string;
  studentName: string;
  studentSubject: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

// Sample data
const sampleReviews: Review[] = [
  {
    id: '1',
    studentName: 'Ayesha Ahmed',
    studentSubject: 'Mathematics - Calculus',
    rating: 5,
    comment: 'An excellent tutor! Very patient and explains complex topics in a way that\'s easy to understand. My daughter\'s grades have improved significantly since starting sessions. Highly recommended for anyone struggling with calculus.',
    date: 'March 10, 2023',
  },
  {
    id: '2',
    studentName: 'Bilal Khan',
    studentSubject: 'Physics - Mechanics',
    rating: 5,
    comment: 'Very knowledgeable and professional. Always on time and well-prepared for the sessions. Highly recommended for A-Level Physics.',
    date: 'March 15, 2023',
  },
  {
    id: '3',
    studentName: 'Zain Malik',
    studentSubject: 'Mathematics - Algebra',
    rating: 4,
    comment: 'Great tutor who makes algebra understandable. My son was struggling but now he\'s much more confident. The only reason for 4 stars instead of 5 is sometimes the sessions can run a bit over time.',
    date: 'March 10, 2023',
    response: 'Thank you for your feedback, Zain! I\'m glad your son is finding the sessions helpful. I appreciate your comment about the timing - I\'ll be more mindful of this in our future sessions to ensure we finish on time. Looking forward to continuing to work with you both!'
  },
  {
    id: '4',
    studentName: 'Fatima Siddiqui',
    studentSubject: 'Chemistry - Organic Chemistry',
    rating: 5,
    comment: 'Excellent teaching style! Makes organic chemistry seem simple with clear explanations and helpful diagrams. Always available to answer questions between sessions too. Highly recommend!',
    date: 'March 8, 2023',
  },
  {
    id: '5',
    studentName: 'Hassan Ali',
    studentSubject: 'Physics - Electromagnetism',
    rating: 5,
    comment: 'One of the best tutors I\'ve had! Explains electromagnetism concepts clearly and makes difficult topics easy to understand. Very patient and encouraging. My grades have improved from a C to an A since starting lessons.',
    date: 'February 28, 2023',
  }
];

// Rating Summary Component
const RatingSummary = () => {
  const overallRating = 4.8;
  const totalReviews = 42;

  const ratingCategories = [
    { name: 'Teaching Quality', rating: 4.9 },
    { name: 'Subject Knowledge', rating: 5.0 },
    { name: 'Communication', rating: 4.7 },
    { name: 'Punctuality', rating: 4.6 },
    { name: 'Value for Money', rating: 4.6 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 overflow-hidden">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-900 mb-4 sm:mb-6 break-words">Rating Summary</h2>
      
      <div className="flex flex-col lg:flex-row lg:items-start space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Overall Rating */}
        <div className="text-center lg:flex-shrink-0 min-w-0 px-2 sm:px-0">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3">{overallRating}</div>
          <div className="flex items-center justify-center mb-2 sm:mb-3 gap-0.5 sm:gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${index < Math.floor(overallRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-sm sm:text-base text-gray-600 break-words">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Categories */}
        <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
          {ratingCategories.map((category) => (
            <div key={category.name} className="flex items-center w-full min-w-0 px-1 sm:px-0">
              <div className="flex items-center flex-1 min-w-0">
                <span className="text-sm sm:text-base font-medium text-gray-700 w-20 sm:w-24 lg:w-32 flex-shrink-0 truncate">{category.name}</span>
                <div className="flex-1 mx-2 sm:mx-3 lg:mx-4 min-w-0">
                  <div className="h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 transition-all duration-300"
                      style={{ width: `${(category.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-900 ml-2 w-8 sm:w-10 text-right flex-shrink-0">{category.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Filters Component
const ReviewFilters = ({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (filter: string) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const filters = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' }
  ];

  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const timeFilters = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
      <div className="flex flex-col gap-3">
        {/* Mobile: Stack filters vertically */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Subject Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-auto flex items-center justify-between sm:justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-sm sm:text-sm"
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>All Subjects</span>
              </div>
              <ChevronDown className="w-4 h-4 sm:ml-1" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    className="w-full text-left px-4 py-3 sm:py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      onFilterChange(filter.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="flex-1 sm:flex-initial">
            <select className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {ratings.map((rating) => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex-1 sm:flex-initial">
            <select className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {timeFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }: { review: Review }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState('');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 md:w-4 md:h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleResponse = () => {
    // Handle response submission
    console.log('Response submitted:', responseText);
    setResponseText('');
    setShowResponse(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 overflow-hidden">
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Avatar */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base flex-shrink-0">
          {getInitials(review.studentName)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg break-words">{review.studentName}</h3>
                <p className="text-sm sm:text-base text-gray-600 break-words mt-1">{review.studentSubject}</p>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{review.date}</p>
              </div>
            </div>
          </div>

          {/* Comment */}
          <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base break-words word-wrap">{review.comment}</p>

          {/* Response Section */}
          {review.response && (
            <div className="bg-blue-50 border-l-4 border-blue-900 p-3 sm:p-4 mb-4 rounded-r-lg overflow-hidden">
              <p className="text-sm font-medium text-blue-900 mb-2">Your Response:</p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words word-wrap">{review.response}</p>
            </div>
          )}

          {/* Response Form */}
          {showResponse && !review.response && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Write your response..."
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm sm:text-base break-words"
                rows={4}
              />
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowResponse(false)}
                  className="px-4 py-2.5 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 order-2 sm:order-1 whitespace-nowrap rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResponse}
                  className="px-4 py-2.5 sm:py-2 bg-blue-900 text-white text-sm sm:text-base rounded-lg hover:bg-blue-800 transition-colors order-1 sm:order-2 whitespace-nowrap"
                >
                  Send Response
                </button>
              </div>
            </div>
          )}

          {/* Response Button */}
          {!review.response && !showResponse && (
            <button
              onClick={() => setShowResponse(true)}
              className="text-sm text-blue-900 hover:text-blue-700 font-medium mt-2 px-2 py-1 hover:bg-blue-50 rounded transition-colors"
            >
              Respond
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Review Insights Component
const ReviewInsights = () => {
  const insights = [
    { label: '5-star Reviews', value: '92%', color: 'text-green-600' },
    { label: 'Response Rate', value: '98%', color: 'text-blue-600' },
    { label: 'Avg. Response Time', value: '24h', color: 'text-purple-600' },
    { label: 'Rating Improvement', value: '+15%', color: 'text-green-600' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 overflow-hidden">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 break-words">Review Insights</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {insights.map((insight) => (
          <div key={insight.label} className="text-center min-w-0 p-2 sm:p-3 rounded-lg bg-gray-50">
            <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${insight.color} mb-1 sm:mb-2 break-words`}>
              {insight.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight break-words px-1">{insight.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Rating Trend Component
const RatingTrend = () => {
  const monthlyData = [
    { month: 'Oct', rating: 4.5 },
    { month: 'Nov', rating: 4.6 },
    { month: 'Dec', rating: 4.7 },
    { month: 'Jan', rating: 4.8 },
    { month: 'Feb', rating: 4.9 },
    { month: 'Mar', rating: 4.8 }
  ];

  const maxRating = 5;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">Rating Trend</h3>
        <p className="text-sm text-gray-600 whitespace-nowrap">Last 6 Months</p>
      </div>
      
      <div className="h-32 sm:h-40 lg:h-48 flex items-end justify-between space-x-2 sm:space-x-3 lg:space-x-4 overflow-x-auto px-2 sm:px-0">
        {monthlyData.map((data, index) => {
          const heightPercentage = (data.rating / maxRating) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center min-w-[40px] sm:min-w-[50px]">
              <div className="w-full flex flex-col items-center mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 whitespace-nowrap">
                  {data.rating}
                </span>
                <div
                  className="w-full bg-green-400 rounded-sm transition-all duration-300 min-h-[6px] sm:min-h-[8px]"
                  style={{ height: `${Math.max(heightPercentage * 0.6, 6)}px` }}
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">{data.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 overflow-hidden">
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 overflow-x-auto px-2 sm:px-0">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 sm:p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium flex-shrink-0 min-w-[40px] sm:min-w-[44px] transition-colors ${
              currentPage === index + 1
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 sm:p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

// Main Reviews Component
const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Educational Resources Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 break-words">Student Reviews</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Manage and respond to student feedback</p>
        </div>

        {/* Rating Summary */}
        <RatingSummary />

        {/* Filters */}
        <ReviewFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Reviews List */}
        <div className="space-y-3 sm:space-y-4">
          {sampleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />

        {/* Insights and Trend */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <ReviewInsights />
          <RatingTrend />
        </div>
      </div>
    </main>
  );
};

export default Reviews;
