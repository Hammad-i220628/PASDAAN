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

// Sample data
const contacts: Contact[] = [
  {
    id: '1',
    name: 'Sara Ahmed',
    initials: 'SA',
    lastMessage: 'When is our next session scheduled?',
    timeAgo: '2h ago',
    isOnline: true,
    unreadCount: 1
  },
  {
    id: '2',
    name: 'Ali Khan',
    initials: 'AK',
    lastMessage: 'Thank you for the help!',
    timeAgo: '1h ago',
    isOnline: false
  },
  {
    id: '3',
    name: 'Zainab Khan',
    initials: 'ZK',
    lastMessage: "I've completed the...",
    timeAgo: '1h ago',
    isOnline: false
  },
  {
    id: '4',
    name: 'Hassan Ahmed',
    initials: 'HA',
    lastMessage: 'Can we reschedule tom...',
    timeAgo: '1h ago',
    isOnline: false
  }
];

const conversations: { [key: string]: Conversation } = {
  '1': {
    contactId: '1',
    messages: [
      {
        id: '1',
        content: 'Hi! When is our next session scheduled?',
        timestamp: '2:00 PM',
        isFromUser: false,
        sender: 'Sara Ahmed'
      },
      {
        id: '2',
        content: 'Perfect! I\'ll prepare the calculus problems we discussed.',
        timestamp: '2:02 PM',
        isFromUser: false,
        sender: 'Sara Ahmed'
      },
      {
        id: '3',
        content: 'Hello Sara! Our next session is tomorrow at 4 PM',
        timestamp: '2:24 PM',
        isFromUser: true,
        sender: 'JS'
      },
      {
        id: '4',
        content: 'Sounds good! Let me know if you need any help before then.',
        timestamp: '2:33 PM',
        isFromUser: true,
        sender: 'JS'
      }
    ]
  },
  '2': {
    contactId: '2',
    messages: [
      {
        id: '1',
        content: 'Thank you for the help!',
        timestamp: '1:00 PM',
        isFromUser: false,
        sender: 'Ali Khan'
      }
    ]
  }
};

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // Start with no contact selected
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [conversationData, setConversationData] = useState<{ [key: string]: Conversation }>(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        sender: 'JS'
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
        <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
        {contact.isOnline && (
          <p className="text-xs text-green-600 mt-1">Online</p>
        )}
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
          SA
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
          JS
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm h-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-200px)] flex">
        {/* Contacts Sidebar */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${
          isMobileView ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Messages</h1>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
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
                    {selectedContact.isOnline && (
                      <p className="text-sm text-green-600">Online</p>
                    )}
                  </div>
                </div>
                {/* Removed call and hamburger menu options */}
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
                <p className="text-gray-600">Choose a contact from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
