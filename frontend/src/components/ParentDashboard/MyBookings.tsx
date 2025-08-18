import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Star,
  Eye,
  X,
  CheckCircle,
  XCircle
} from 'lucide-react';
import BookASession from '../FindTutor/BookASession';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookSession, setShowBookSession] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock data for bookings with Ali and Fatima
  const upcomingBookings = [
    {
      id: 1,
      tutorName: 'Fatima Khan',
      tutorInitials: 'FK',
      subject: 'Mathematics - Calculus',
      studentName: 'Ali',
      date: 'Today, 4:00 PM',
      duration: '1 hour',
      sessionType: 'Online',
      price: 'Rs. 1,500',
      status: 'upcoming',
      dateTime: 'Today, 4:00 PM'
    },
    {
      id: 2,
      tutorName: 'Ali Hassan',
      tutorInitials: 'AH',
      subject: 'Physics - Mechanics',
      studentName: 'Fatima',
      date: 'Tomorrow, 5:30 PM',
      duration: '1.5 hours',
      sessionType: 'In Person',
      price: 'Rs. 1,800',
      status: 'upcoming',
      dateTime: 'Tomorrow, 5:30 PM'
    },
    {
      id: 3,
      tutorName: 'Zainab Iqbal',
      tutorInitials: 'ZI',
      subject: 'English - Essay Writing',
      studentName: 'Ali',
      date: 'Wed, 3:00 PM',
      duration: '1 hour',
      sessionType: 'Online',
      price: 'Rs. 1,200',
      status: 'upcoming',
      dateTime: 'Wed, 3:00 PM'
    }
  ];

  const pastBookings = [
    {
      id: 4,
      tutorName: 'Fatima Khan',
      tutorInitials: 'FK',
      subject: 'Mathematics - Algebra',
      studentName: 'Ali',
      date: 'Dec 15, 2024',
      duration: '1 hour',
      sessionType: 'Online',
      price: 'Rs. 1,500',
      status: 'completed',
      dateTime: 'Dec 15, 2024 - 4:00 PM'
    },
    {
      id: 5,
      tutorName: 'Ali Hassan',
      tutorInitials: 'AH',
      subject: 'Physics - Thermodynamics',
      studentName: 'Fatima',
      date: 'Dec 12, 2024',
      duration: '1.5 hours',
      sessionType: 'In Person',
      price: 'Rs. 1,800',
      status: 'completed',
      dateTime: 'Dec 12, 2024 - 5:30 PM'
    },
    {
      id: 6,
      tutorName: 'Zainab Iqbal',
      tutorInitials: 'ZI',
      subject: 'Biology - Cell Structure',
      studentName: 'Fatima',
      date: 'Dec 10, 2024',
      duration: '1 hour',
      sessionType: 'Online',
      price: 'Rs. 1,200',
      status: 'completed',
      dateTime: 'Dec 10, 2024 - 2:00 PM'
    }
  ];

  const cancelledBookings = [
    {
      id: 7,
      tutorName: 'Ali Hassan',
      tutorInitials: 'AH',
      subject: 'Physics - Optics',
      studentName: 'Ali',
      date: 'Dec 8, 2024',
      duration: '1 hour',
      sessionType: 'Online',
      price: 'Rs. 1,600',
      status: 'cancelled',
      dateTime: 'Dec 8, 2024 - 6:00 PM',
      cancelReason: 'Tutor unavailable'
    }
  ];

  const getBookingsForTab = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingBookings;
      case 'past':
        return pastBookings;
      case 'cancelled':
        return cancelledBookings;
      default:
        return upcomingBookings;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Upcoming</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Completed</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  const handleJoinSession = (booking: any) => {
    setSelectedBooking(booking);
    setShowBookSession(true);
  };

  const handleBackToBookings = () => {
    setShowBookSession(false);
    setSelectedBooking(null);
  };

  const getActionButton = (booking: any) => {
    switch (booking.status) {
      case 'upcoming':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => handleJoinSession(booking)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Join Session
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
              Cancel
            </button>
          </div>
        );
      case 'completed':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              View Details
            </button>
            <button 
              onClick={() => handleJoinSession(booking)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Book Again
            </button>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              View Details
            </button>
            <button 
              onClick={() => handleJoinSession(booking)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Book Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // If BookASession is selected, show it instead
  if (showBookSession) {
    return (
      <BookASession 
        onBack={handleBackToBookings}
        bookingData={{
          tutorName: selectedBooking?.tutorName,
          tutorInitials: selectedBooking?.tutorInitials,
          subject: selectedBooking?.subject,
          studentName: selectedBooking?.studentName
        }}
      />
    );
  }

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, Ahmed!</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Ahmed Malik</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">Parent Dashboard</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'past'
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Sessions
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cancelled'
                ? 'bg-blue-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {getBookingsForTab().map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left section - Tutor and Session Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  {/* Tutor Avatar */}
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {booking.tutorInitials}
                  </div>
                  
                  {/* Session Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{booking.tutorName}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-blue-900 font-semibold mb-1">{booking.subject}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{booking.studentName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Type and Price */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                      <strong>Session Type:</strong> {booking.sessionType}
                    </span>
                    <span className="text-gray-600">
                      <strong>Price:</strong> {booking.price}
                    </span>
                  </div>
                </div>

                {/* Cancel reason for cancelled bookings */}
                {booking.status === 'cancelled' && booking.cancelReason && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-700">
                        <strong>Reason:</strong> {booking.cancelReason}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right section - Action Buttons */}
              <div className="lg:flex-shrink-0">
                {getActionButton(booking)}
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {getBookingsForTab().length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} sessions
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming sessions scheduled."
                : activeTab === 'past'
                ? "No past sessions to display."
                : "No cancelled sessions to display."
              }
            </p>
            {activeTab === 'upcoming' && (
              <button 
                onClick={() => {
                  const dummyBooking = {
                    tutorName: 'Find a Tutor',
                    subject: '',
                    studentName: '',
                    tutorInitials: 'T'
                  };
                  handleJoinSession(dummyBooking);
                }}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Book a Session
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
