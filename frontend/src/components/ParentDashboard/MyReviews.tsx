import React, { useState } from 'react';
import { 
  Star,
  User,
  Edit,
  Trash2,
  Plus,
  Calendar
} from 'lucide-react';
import AddReviewModal from './AddReviewModal';

const MyReviews = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([

    {
      id: 1,
      tutorName: 'Fatima Khan',
      tutorInitials: 'FK',
      subjects: ['Mathematics', 'Calculus'],
      rating: 5,
      date: 'March 15, 2024',
      review: 'Excellent tutor! Fatima explained complex calculus concepts in a way that was easy to understand. My son\'s grades have improved significantly since starting sessions with her. Highly recommend!',
      status: 'published'
    },
    {
      id: 2,
      tutorName: 'Ali Hassan',
      tutorInitials: 'AH',
      subjects: ['Physics', 'Mechanics'],
      rating: 4,
      date: 'March 10, 2024',
      review: 'Ali is a very knowledgeable physics tutor. He explains concepts clearly and provides helpful practice problems. The only reason for 4 stars instead of 5 is that sometimes he runs a bit over time. Overall, my daughter is very happy with his teaching.',
      status: 'published'
    },
    {
      id: 3,
      tutorName: 'Zainab Iqbal',
      tutorInitials: 'ZI',
      subjects: ['English', 'Essay Writing'],
      rating: 5,
      date: 'March 5, 2024',
      review: 'Zainab is an outstanding English tutor. She has helped my daughter improve her essay writing skills tremendously. She provides detailed feedback and is always encouraging. We\'re very pleased with her teaching methods.',
      status: 'published'
    },
    {
      id: 4,
      tutorName: 'Ahmed Ali',
      tutorInitials: 'AA',
      subjects: ['Chemistry', 'Organic Chemistry'],
      rating: 4,
      date: 'March 1, 2024',
      review: 'Good chemistry tutor with solid knowledge. My son has shown improvement in his understanding of organic chemistry concepts.',
      status: 'draft'
    }
  ]);

  const getFilteredReviews = () => {
    switch (activeTab) {
      case 'all':
        return reviews;
      case 'published':
        return reviews.filter(review => review.status === 'published');
      case 'drafts':
        return reviews.filter(review => review.status === 'draft');
      default:
        return reviews;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handlePublish = (reviewId: number) => {
    console.log('Publishing review:', reviewId);
    // Handle publish logic
  };

  const handleEdit = (reviewId: number) => {
    console.log('Editing review:', reviewId);
    // Handle edit logic
  };

  const handleDelete = (reviewId: number) => {
    console.log('Deleting review:', reviewId);
    // Handle delete logic
  };

  const handleAddReview = (reviewData: any) => {
    const newReview = {
      id: reviews.length + 1,
      tutorName: reviewData.tutorName,
      tutorInitials: reviewData.tutorName.split(' ').map(n => n[0]).join(''),
      subjects: [reviewData.subject],
      rating: reviewData.rating,
      date: reviewData.date,
      review: reviewData.review,
      status: reviewData.sharePublicly ? 'published' : 'draft'
    };
    
    setReviews([newReview, ...reviews]);
    console.log('New review added:', newReview);
  };

  const openAddReviewModal = () => {
    setIsAddReviewModalOpen(true);
  };

  const closeAddReviewModal = () => {
    setIsAddReviewModalOpen(false);
  };

  const filteredReviews = getFilteredReviews();

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          </div>
          <button 
            onClick={openAddReviewModal}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center sm:justify-start gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Review
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'published'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drafts'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              {/* Tutor Avatar */}
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-lg flex-shrink-0">
                <User className="w-6 h-6" />
              </div>

              <div className="flex-1">
                {/* Tutor Info and Date */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{review.tutorName}</h3>
                    <p className="text-sm text-gray-500">
                      {review.subjects.join(' • ')}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {review.review}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {review.status === 'draft' ? (
                    <button
                      onClick={() => handlePublish(review.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Publish
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      Published
                    </span>
                  )}
                  
                  <button
                    onClick={() => handleEdit(review.id)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'all' ? '' : activeTab} reviews
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'drafts'
                ? "You don't have any draft reviews."
                : activeTab === 'published'
                ? "You haven't published any reviews yet."
                : "You haven't written any reviews yet."
              }
            </p>
            <button 
              onClick={openAddReviewModal}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Write Your First Review
            </button>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      <AddReviewModal 
        isOpen={isAddReviewModalOpen}
        onClose={closeAddReviewModal}
        onSubmit={handleAddReview}
      />
    </main>
  );
};

export default MyReviews;
