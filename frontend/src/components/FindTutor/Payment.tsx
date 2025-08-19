import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface PaymentProps {
  sessionData?: {
    tutorName?: string;
    subject?: string;
    date?: string;
    timeSlot?: string;
    duration?: number;
    hourlyRate?: number;
  };
  onBack?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ sessionData, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state or use defaults
  const bookingData = location.state || sessionData || {
    tutorName: "Ahmed Khan",
    subject: "Mathematics", 
    date: "2025-3-11, 10:00pm",
    duration: 1,
    hourlyRate: 1500
  };
  
  // Check if this came from parent dashboard (via BookASession)
  const fromParentDashboard = bookingData.fromParentDashboard || onBack;

  const [paymentMethod, setPaymentMethod] = useState('EasyPaisa');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSecurePayment, setIsSecurePayment] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Calculate costs
  const sessionFee = bookingData.hourlyRate * bookingData.duration;
  const taxes = Math.round(sessionFee * 0.026); // 2.6% tax
  const discount = 0;
  const total = sessionFee + taxes - discount;

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePayNow = () => {
    // Handle payment processing here
    console.log('Processing payment...', {
      paymentMethod,
      total,
      cardNumber: paymentMethod === 'Credit Card' ? cardNumber : null,
      // Add other payment details as needed
    });
    
    // For now, just show an alert
    alert(`Payment of PKR ${total.toLocaleString()} processed successfully!`);
  };

  return (
    <>
      <style jsx>{`
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hover-smooth {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header exactly like home page */}
        <header className="bg-white shadow-sm border-b">
          {/* Top bar */}
          <div className="text-white py-2 text-sm" style={{ backgroundColor: '#003366' }}>
            <div className="w-full px-4">
              <div className="flex justify-center items-center">
                <button onClick={() => navigate('/find-tutor')} className="font-medium hover:underline cursor-pointer">Find Your Tutor Here →</button>
              </div>
            </div>
          </div>

          {/* Main header */}
          <div className="w-full px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="PASDAAN" 
                  className="h-10 sm:h-14 w-auto"
                />
                <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium ml-8 xl:ml-16">
                  <button onClick={() => navigate('/')} className="text-gray-700 transition-colors pb-1 hover:border-b-2 hover:border-green-500" style={{ ":hover": { color: '#003366' } }} onMouseEnter={(e) => e.target.style.color = '#003366'} onMouseLeave={(e) => e.target.style.color = ''}>Home</button>
                  <button onClick={() => navigate('/about-us')} className="text-gray-700 transition-colors pb-1 hover:border-b-2 hover:border-green-500" style={{ ":hover": { color: '#003366' } }} onMouseEnter={(e) => e.target.style.color = '#003366'} onMouseLeave={(e) => e.target.style.color = ''}>About Us</button>
                  <button onClick={() => navigate('/contact')} className="text-gray-700 transition-colors pb-1 hover:border-b-2 hover:border-green-500" style={{ ":hover": { color: '#003366' } }} onMouseEnter={(e) => e.target.style.color = '#003366'} onMouseLeave={(e) => e.target.style.color = ''}>Contact</button>
                </nav>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button onClick={() => navigate('/signup')} className="text-gray-700 border-2 border-transparent hover:border-green-500 text-xs sm:text-sm font-medium px-2 sm:px-4 py-2 rounded-md inline-block">
                  Sign Up
                </button>
                <button onClick={() => navigate('/login')} className="text-gray-700 border-2 border-transparent hover:border-green-500 text-xs sm:text-sm font-medium px-3 sm:px-6 py-2 rounded-md inline-block">
                  Login
                </button>
                {/* Hamburger Menu Button */}
                <button 
                  className="lg:hidden text-gray-700 hover:text-blue-900 focus:outline-none p-2"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Sidebar Menu */}
          <>
            {/* Mobile backdrop */}
            <div 
              className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-500 ${
                isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className={`
              fixed lg:hidden transition-transform duration-500 ease-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              w-60 bg-white shadow-sm flex flex-col h-screen border-l border-gray-200 z-50 overflow-hidden
              right-0 top-0
            `}>
                {/* Mobile close button */}
                <div className="flex justify-end p-4 flex-shrink-0">
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

                {/* Menu Content - appears right after logo */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 flex flex-col items-center">
                  {/* Menu Items */}
                  <nav className="flex flex-col items-center space-y-4 mb-8">
                    <button
                      onClick={() => {navigate('/'); setIsMobileMenuOpen(false);}}
                      className={`text-xl font-medium transition-all duration-500 transform px-4 py-3 rounded-lg hover:bg-blue-50 ${
                        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      } hover:scale-105 hover:text-green-600`}
                      style={{ 
                        color: '#003366',
                        transitionDelay: isMobileMenuOpen ? '0.2s' : '0s'
                      }}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => {navigate('/about-us'); setIsMobileMenuOpen(false);}}
                      className={`text-xl font-medium transition-all duration-500 transform px-4 py-3 rounded-lg hover:bg-blue-50 ${
                        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      } hover:scale-105 hover:text-green-600`}
                      style={{ 
                        color: '#003366',
                        transitionDelay: isMobileMenuOpen ? '0.3s' : '0s'
                      }}
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => {navigate('/contact'); setIsMobileMenuOpen(false);}}
                      className={`text-xl font-medium transition-all duration-500 transform px-4 py-3 rounded-lg hover:bg-blue-50 ${
                        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      } hover:scale-105 hover:text-green-600`}
                      style={{ 
                        color: '#003366',
                        transitionDelay: isMobileMenuOpen ? '0.4s' : '0s'
                      }}
                    >
                      Contact
                    </button>
                  </nav>

                  {/* Auth Links */}
                  <div className="flex flex-col items-center space-y-3 w-full px-4">
                    <button
                      onClick={() => {navigate('/signup'); setIsMobileMenuOpen(false);}}
                      className={`w-full max-w-xs py-4 px-6 rounded-xl text-lg font-medium text-white bg-green-500 hover:bg-green-600 text-center transition-all duration-500 transform ${
                        isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                      } hover:scale-105 shadow-lg`}
                      style={{ 
                        transitionDelay: isMobileMenuOpen ? '0.5s' : '0s'
                      }}
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => {navigate('/login'); setIsMobileMenuOpen(false);}}
                      className={`w-full max-w-xs py-4 px-6 rounded-xl text-lg font-medium border-2 border-green-500 hover:bg-green-50 text-center transition-all duration-500 transform ${
                        isMobileMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                      } hover:scale-105 shadow-lg`}
                      style={{ 
                        color: '#003366',
                        transitionDelay: isMobileMenuOpen ? '0.6s' : '0s'
                      }}
                    >
                      Login
                    </button>
                  </div>
                  
                  {/* Bottom padding for better scroll experience */}
                  <div className="h-8"></div>
                </div>
              </div>
            </>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button - Show when accessed from parent dashboard */}
          {fromParentDashboard && (
            <div className="mb-6">
              <button
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    // If no onBack callback, navigate back to previous page
                    window.history.back();
                  }
                }}
                className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Book Session</span>
              </button>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8 animate-fadeInUp">Payment</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Session Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Session Details Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeInUp">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Session Details
                </h2>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Tutor:</span>
                    <div className="text-gray-900 font-medium">{bookingData.tutorName}</div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Subject:</span>
                    <div className="text-gray-900 font-medium">{bookingData.subject}</div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Date & Time:</span>
                    <div className="text-gray-900 font-medium">{bookingData.date}</div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <div className="text-gray-900 font-medium">{bookingData.duration} Hour</div>
                  </div>
                </div>

                {/* Tutor Profile Section */}
                <div className="flex items-center mt-6 pt-4 border-t">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-semibold mr-4">
                    {bookingData.tutorName?.split(' ').map(n => n[0]).join('') || 'AK'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{bookingData.tutorName}</h3>
                    <p className="text-gray-500 text-sm">Mathematics & Physics</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <defs>
                            <linearGradient id="half-star">
                              <stop offset="70%" stopColor="currentColor" />
                              <stop offset="70%" stopColor="#D1D5DB" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="ml-2 text-gray-500 text-sm">(4.7)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                
                {/* Payment Options */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => handlePaymentMethodChange('Credit Card')}
                    className={`p-4 border-2 rounded-lg text-center smooth-transition ${
                      paymentMethod === 'Credit Card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Credit Card</span>
                  </button>
                  
                  <button
                    onClick={() => handlePaymentMethodChange('JazzCash')}
                    className={`p-4 border-2 rounded-lg text-center smooth-transition ${
                      paymentMethod === 'JazzCash'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">JC</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium">JazzCash</span>
                  </button>
                  
                  <button
                    onClick={() => handlePaymentMethodChange('EasyPaisa')}
                    className={`p-4 border-2 rounded-lg text-center smooth-transition ${
                      paymentMethod === 'EasyPaisa'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">EP</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium">EasyPaisa</span>
                  </button>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'Credit Card' && (
                  <div className="space-y-4 animate-fadeInUp">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234-5678-9012-3456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Card Holder Name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Secure Payment Checkbox */}
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="securePayment"
                    checked={isSecurePayment}
                    onChange={(e) => setIsSecurePayment(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="securePayment" className="ml-2 text-sm text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure Payment
                  </label>
                </div>
              </div>
            </div>

            {/* Right Section - Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Fee</span>
                    <span className="text-gray-900">PKR {sessionFee.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-gray-900">PKR {taxes}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-gray-900">PKR {discount}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayNow}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md mt-6 smooth-transition hover:scale-105"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
