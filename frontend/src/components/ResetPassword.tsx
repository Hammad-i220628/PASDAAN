import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountType, setAccountType] = useState('Parent');
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Get email from navigation state
  useEffect(() => {
    const state = location.state as { email?: string; verified?: boolean } | null;
    if (state?.email && state?.verified) {
      setFormData(prev => ({ ...prev, email: state.email }));
    } else {
      // If user tries to access this page directly without verification, redirect to forgot-password
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password reset form submitted:', { accountType, ...formData });
    // Here you would typically send the new password to your backend
    // After successful reset, redirect to login page with success message
    alert('Password reset successful! Please login with your new password.');
    navigate('/login');
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

      {/* Right section - Reset Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Pasdaan</h2>
            <p className="text-gray-600">Create your account to find verified tutors in your area</p>
          </div>

          {/* Account type toggle */}
          <div className="mb-8">
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setAccountType('Parent')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  accountType === 'Parent'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Parent
              </button>
              <button
                type="button"
                onClick={() => setAccountType('Tutor')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  accountType === 'Tutor'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tutor
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-green-600">
                For {accountType}
              </span>
            </div>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Enter New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>

          {/* Back to login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <a href="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
