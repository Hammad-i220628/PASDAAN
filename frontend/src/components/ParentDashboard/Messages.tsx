import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Phone, 
  MoreVertical, 
  Paperclip, 
  Send,
  ArrowLeft
} from 'lucide-react';

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
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isFromUser: boolean;
  sender: string;
}

interface Conversation {
  contactId: string;
  messages: Message[];
}

// Sample data - Parent's conversations with tutors
const contacts: Contact[] = [
  {
    id: '1',
    name: 'Fatima Khan',
    initials: 'FK',
    lastMessage: 'Ali did great in today\'s session!',
    timeAgo: '2 min ago',
    isOnline: true,
    unreadCount: 1,
    role: 'tutor',
    subject: 'Mathematics'
  },
  {
    id: '2',
    name: 'Ali Hassan',
    initials: 'AH',
    lastMessage: 'Please review the homework problems...',
    timeAgo: '1h ago',
    isOnline: false,
    role: 'tutor',
    subject: 'Physics'
  },
  {
    id: '3',
    name: 'Zainab Iqbal',
    initials: 'ZI',
    lastMessage: 'Hi, I will be sharing the session notes...',
    timeAgo: '1h ago',
    isOnline: true,
    role: 'tutor',
    subject: 'English'
  },
  {
    id: '4',
    name: 'Dr. Usman Ahmad',
    initials: 'UA',
    lastMessage: 'Fatima is making excellent progress',
    timeAgo: '2h ago',
    isOnline: false,
    role: 'tutor',
    subject: 'Chemistry'
  }
];

const conversations: { [key: string]: Conversation } = {
  '1': {
    contactId: '1',
    messages: [
      {
        id: '1',
        content: 'Hello! How did Ali\'s session go today?',
        timestamp: '2:00 PM',
        isFromUser: true,
        sender: 'Ahmed Malik'
      },
      {
        id: '2',
        content: 'Hi Ahmed! Ali did wonderful today. He\'s really grasping the calculus concepts well.',
        timestamp: '2:05 PM',
        isFromUser: false,
        sender: 'Fatima Khan'
      },
      {
        id: '3',
        content: 'We worked on derivatives and he solved most problems independently.',
        timestamp: '2:06 PM',
        isFromUser: false,
        sender: 'Fatima Khan'
      },
      {
        id: '4',
        content: 'That\'s excellent news! Thank you for your dedication.',
        timestamp: '2:10 PM',
        isFromUser: true,
        sender: 'Ahmed Malik'
      },
      {
        id: '5',
        content: 'Ali did great in today\'s session!',
        timestamp: '4:30 PM',
        isFromUser: false,
        sender: 'Fatima Khan'
      }
    ]
  },
  '2': {
    contactId: '2',
    messages: [
      {
        id: '1',
        content: 'Hi! I\'ve assigned some physics problems for Fatima to practice.',
        timestamp: '1:00 PM',
        isFromUser: false,
        sender: 'Ali Hassan'
      },
      {
        id: '2',
        content: 'Please review the homework problems I sent via email.',
        timestamp: '1:05 PM',
        isFromUser: false,
        sender: 'Ali Hassan'
      },
      {
        id: '3',
        content: 'Thank you! I\'ll make sure she reviews them before the next session.',
        timestamp: '1:15 PM',
        isFromUser: true,
        sender: 'Ahmed Malik'
      }
    ]
  },
  '3': {
    contactId: '3',
    messages: [
      {
        id: '1',
        content: 'Hi, I will be sharing the session notes and reading materials for Ali.',
        timestamp: '12:00 PM',
        isFromUser: false,
        sender: 'Zainab Iqbal'
      },
      {
        id: '2',
        content: 'Perfect! He\'s been asking for extra reading materials.',
        timestamp: '12:05 PM',
        isFromUser: true,
        sender: 'Ahmed Malik'
      }
    ]
  },
  '4': {
    contactId: '4',
    messages: [
      {
        id: '1',
        content: 'Fatima is making excellent progress in chemistry.',
        timestamp: '10:00 AM',
        isFromUser: false,
        sender: 'Dr. Usman Ahmad'
      },
      {
        id: '2',
        content: 'Thank you Dr. Usman! We really appreciate your teaching methods.',
        timestamp: '10:30 AM',
        isFromUser: true,
        sender: 'Ahmed Malik'
      }
    ]
  }
};

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [conversationData, setConversationData] = useState<{ [key: string]: Conversation }>(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        sender: 'Ahmed Malik'
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
          {contact.isOnline && (
            <span className="text-xs text-green-600">Online</span>
          )}
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
          : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
      }`}>
        <p className="text-sm break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${message.isFromUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp}
        </p>
      </div>
      {message.isFromUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold ml-2 sm:ml-3 flex-shrink-0">
          AM
        </div>
      )}
    </div>
  );

  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, Ahmed!</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Ahmed Malik</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">Parent Dashboard</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm h-full max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-280px)] flex">
        {/* Contacts Sidebar */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${
          isMobileView ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Messages</h2>
            
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
                    <p className="text-sm text-blue-600">{selectedContact.subject} Tutor</p>
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
    </main>
  );
};

export default Messages;
