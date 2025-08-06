import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the verification code to the email
    console.log('Sending verification code to:', email);
    setIsCodeSent(true);
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the code with your backend
    console.log('Verifying code:', verificationCode);
    // After successful verification, redirect to reset password page
    navigate('/reset-password', { state: { email, verified: true } });
  };

  const handleResendCode = () => {
    // Logic to resend verification code
    console.log('Resending verification code to:', email);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Gradient background */}
        <div 
          className="w-full flex flex-col justify-center items-start px-16 text-white relative"
          style={{
            background: 'linear-gradient(135deg, #52a373 0%, #3b82a6 50%, #1e40af 100%)'
          }}
        >
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Find the Perfect Tutor for Your Child
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Pasdaan connects you with verified, experienced tutors in your area for personalized learning experiences.
            </p>
            
            {/* Feature list */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span className="text-lg">Verified & background-checked tutors</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span className="text-lg">Advanced search by subject, location & price</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span className="text-lg">Secure in-platform messaging</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <span className="text-lg">Transparent pricing & secure payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-8 py-12">
        <div className="w-full max-w-md">
          {!isCodeSent ? (
            // Step 1: Enter Email
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-600">Enter your email address to receive a verification code</p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Send Verification Code
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <a href="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                    Back to Login
                  </a>
                </p>
              </div>
            </>
          ) : (
            // Step 2: Verify Email
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email Address</h2>
                <p className="text-gray-600">Secure Your Account – Verify Your Email Now!</p>
              </div>

              <form onSubmit={handleVerifyEmail} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit verification code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    We sent a verification code to <span className="font-medium text-gray-700">{email}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 border border-gray-300"
                  >
                    Resend Code
                  </button>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Verify Email
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Wrong email address?{' '}
                  <button 
                    onClick={() => setIsCodeSent(false)}
                    className="font-medium text-green-600 hover:text-green-500 transition-colors"
                  >
                    Change Email
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
