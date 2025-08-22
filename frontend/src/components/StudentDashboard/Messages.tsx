import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Paperclip, 
  Send,
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  ChevronRight,
  Menu
} from 'lucide-react';
import StudentSidebar from './StudentSidebar';

// Types for messages and contacts
interface Contact {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  timeAgo: string;
  isOnline: boolean;
  unreadCount?: number;
  role: 'tutor';
  subject?: string;
  rating: number;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isFromUser: boolean;
  sender: string;
  type?: 'text' | 'homework' | 'announcement';
}

interface Conversation {
  contactId: string;
  messages: Message[];
}

// Sample data - Student's conversations with tutors
const contacts: Contact[] = [
  {
    id: '1',
    name: 'Farhan Ahmad',
    initials: 'FA',
    lastMessage: 'Great work on today\'s calculus problems!',
    timeAgo: '5 min ago',
    isOnline: true,
    unreadCount: 2,
    role: 'tutor',
    subject: 'Mathematics',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Aisha Khan',
    initials: 'AK',
    lastMessage: 'Don\'t forget to review the physics formulas...',
    timeAgo: '1h ago',
    isOnline: true,
    role: 'tutor',
    subject: 'Physics',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Imran Siddiqui',
    initials: 'IS',
    lastMessage: 'I\'ve attached the essay guidelines',
    timeAgo: '2h ago',
    isOnline: false,
    role: 'tutor',
    subject: 'English',
    rating: 4.6
  },
  {
    id: '4',
    name: 'Dr. Sarah Ahmed',
    initials: 'SA',
    lastMessage: 'Your chemistry lab report was excellent!',
    timeAgo: '3h ago',
    isOnline: false,
    unreadCount: 1,
    role: 'tutor',
    subject: 'Chemistry',
    rating: 4.7
  }
];

const conversations: { [key: string]: Conversation } = {
  '1': {
    contactId: '1',
    messages: [
      {
        id: '1',
        content: 'Hi Mr. Farhan! I need help with the derivative problems from today\'s class.',
        timestamp: '2:00 PM',
        isFromUser: true,
        sender: 'Ali'
      },
      {
        id: '2',
        content: 'Of course! Which specific problems are you struggling with?',
        timestamp: '2:05 PM',
        isFromUser: false,
        sender: 'Farhan Ahmad'
      },
      {
        id: '3',
        content: 'Problems 15-17 from Chapter 4. I\'m confused about the chain rule.',
        timestamp: '2:07 PM',
        isFromUser: true,
        sender: 'Ali'
      },
      {
        id: '4',
        content: 'No problem! Remember: if you have f(g(x)), the derivative is f\'(g(x)) × g\'(x). Let\'s work through problem 15 together.',
        timestamp: '2:10 PM',
        isFromUser: false,
        sender: 'Farhan Ahmad'
      },
      {
        id: '5',
        content: 'Great work on today\'s calculus problems!',
        timestamp: '4:30 PM',
        isFromUser: false,
        sender: 'Farhan Ahmad',
        type: 'announcement'
      },
      {
        id: '6',
        content: 'Complete exercises 18-25 for homework. Due tomorrow before our session.',
        timestamp: '4:32 PM',
        isFromUser: false,
        sender: 'Farhan Ahmad',
        type: 'homework'
      }
    ]
  },
  '2': {
    contactId: '2',
    messages: [
      {
        id: '1',
        content: 'Hi Miss Aisha! When is our next physics session?',
        timestamp: '1:00 PM',
        isFromUser: true,
        sender: 'Ali'
      },
      {
        id: '2',
        content: 'Hello Ali! Our next session is tomorrow at 6:00 PM. We\'ll be covering electromagnetism.',
        timestamp: '1:05 PM',
        isFromUser: false,
        sender: 'Aisha Khan'
      },
      {
        id: '3',
        content: 'Don\'t forget to review the physics formulas I shared last week.',
        timestamp: '1:10 PM',
        isFromUser: false,
        sender: 'Aisha Khan'
      },
      {
        id: '4',
        content: 'Sure! I\'ll review them tonight. Thank you!',
        timestamp: '1:15 PM',
        isFromUser: true,
        sender: 'Ali'
      }
    ]
  },
  '3': {
    contactId: '3',
    messages: [
      {
        id: '1',
        content: 'Mr. Imran, I finished the essay draft you assigned.',
        timestamp: '12:00 PM',
        isFromUser: true,
        sender: 'Ali'
      },
      {
        id: '2',
        content: 'Excellent! Please email it to me, and I\'ll review it before our next session.',
        timestamp: '12:05 PM',
        isFromUser: false,
        sender: 'Imran Siddiqui'
      },
      {
        id: '3',
        content: 'I\'ve attached the essay guidelines for your next assignment.',
        timestamp: '12:10 PM',
        isFromUser: false,
        sender: 'Imran Siddiqui',
        type: 'homework'
      }
    ]
  },
  '4': {
    contactId: '4',
    messages: [
      {
        id: '1',
        content: 'Dr. Sarah, I submitted my chemistry lab report.',
        timestamp: '10:00 AM',
        isFromUser: true,
        sender: 'Ali'
      },
      {
        id: '2',
        content: 'Your chemistry lab report was excellent! Well done on the analysis section.',
        timestamp: '10:30 AM',
        isFromUser: false,
        sender: 'Dr. Sarah Ahmed'
      },
      {
        id: '3',
        content: 'Thank you so much! Chemistry is becoming my favorite subject.',
        timestamp: '10:35 AM',
        isFromUser: true,
        sender: 'Ali'
      }
    ]
  }
};

const Messages: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [conversationData, setConversationData] = useState<{ [key: string]: Conversation }>(conversations);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current conversation
  const currentConversation = selectedContact 
    ? conversationData[selectedContact.id] || { contactId: selectedContact.id, messages: [] }
    : null;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  // Auto-scroll to bottom when contact changes
  useEffect(() => {
    scrollToBottom();
  }, [selectedContact]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const currentTime = new Date();
      const timeString = currentTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });

      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        timestamp: timeString,
        isFromUser: true,
        sender: currentStudent?.name || 'Ali'
      };

      // Update the conversation data
      setConversationData(prev => {
        const updatedConversation = {
          ...prev,
          [selectedContact.id]: {
            contactId: selectedContact.id,
            messages: [...(prev[selectedContact.id]?.messages || []), newMsg]
          }
        };
        return updatedConversation;
      });

      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ContactItem = ({ contact }: { contact: Contact }) => (
    <div
      onClick={() => {
        setSelectedContact(contact);
        setIsMobileView(true);
      }}
      className={`flex items-center p-3 sm:p-4 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 ${
        selectedContact?.id === contact.id ? 'bg-blue-50 border-l-4 border-l-blue-900' : ''
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold">
          {contact.initials}
        </div>
        {contact.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500">{contact.timeAgo}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-blue-600 font-medium">{contact.subject} Tutor</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-yellow-600">★ {contact.rating}</span>
            {contact.isOnline && (
              <span className="text-xs text-green-600">Online</span>
            )}
          </div>
        </div>
      </div>
      {contact.unreadCount && (
        <div className="ml-2 bg-blue-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {contact.unreadCount}
        </div>
      )}
    </div>
  );

  const MessageBubble = ({ message }: { message: Message }) => (
    <div className={`flex mb-3 sm:mb-4 px-2 sm:px-0 ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isFromUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs sm:text-sm font-semibold mr-2 sm:mr-3 flex-shrink-0">
          {selectedContact?.initials}
        </div>
      )}
      <div className={`max-w-[280px] sm:max-w-xs lg:max-w-md xl:max-w-lg px-3 sm:px-4 py-2 rounded-lg ${
        message.isFromUser 
          ? 'bg-blue-900 text-white ml-auto' 
          : message.type === 'homework'
          ? 'bg-orange-50 border-2 border-orange-200 text-gray-900 shadow-sm'
          : message.type === 'announcement'
          ? 'bg-green-50 border-2 border-green-200 text-gray-900 shadow-sm'
          : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
      }`}>
        {/* Message type indicator */}
        {message.type === 'homework' && (
          <div className="flex items-center mb-1">
            <BookOpen className="w-3 h-3 text-orange-600 mr-1" />
            <span className="text-xs font-medium text-orange-600">Homework Assignment</span>
          </div>
        )}
        {message.type === 'announcement' && (
          <div className="flex items-center mb-1">
            <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
            <span className="text-xs font-medium text-green-600">Announcement</span>
          </div>
        )}
        
        <p className="text-sm break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${
          message.isFromUser ? 'text-blue-100' : 
          message.type ? 'text-gray-600' : 'text-gray-500'
        }`}>
          {message.timestamp}
        </p>
      </div>
      {message.isFromUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold ml-2 sm:ml-3 flex-shrink-0">
          {currentStudent?.name?.charAt(0) || 'A'}
        </div>
      )}
    </div>
  );

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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-600 mt-2">Chat with your tutors</p>
              </div>

      <div className="bg-white rounded-lg shadow-sm flex" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Contacts Sidebar */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${
          isMobileView ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${
          isMobileView && selectedContact ? 'flex' : 'hidden md:flex'
        }`}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsMobileView(false)}
                    className="md:hidden mr-3 p-1 hover:bg-gray-100 rounded"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-semibold">
                      {selectedContact.initials}
                    </div>
                    {selectedContact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h2>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-blue-600">{selectedContact.subject} Tutor</p>
                      <span className="text-gray-400">•</span>
                      <p className="text-sm text-yellow-600">★ {selectedContact.rating}</p>
                    </div>
                    {selectedContact.isOnline && (
                      <p className="text-sm text-green-600">Online</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {currentConversation?.messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {/* Invisible div for auto-scroll */}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm pr-12"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-600">Choose a tutor from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
