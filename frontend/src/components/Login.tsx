import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('Parent');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin login credentials
    if (formData.email === 'muaz@gmail.com' && formData.password === '03061797003') {
      console.log('Admin login successful');
      navigate('/admin-dashboard');
      return;
    }
    
    // Check for tutor login credentials
    if (formData.email === 'tutor@gmail.com' && formData.password === 'tutor') {
      console.log('Tutor login successful');
      navigate('/teacher-dashboard');
      return;
    }
    
    // Check for parent login credentials
    if (formData.email === 'parent@gmail.com' && formData.password === 'parent') {
      console.log('Parent login successful');
      navigate('/parent-dashboard');
      return;
    }
    
    console.log('Login form submitted:', { accountType, ...formData });
    // Add other login logic here
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

      {/* Right section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Pasdaan</h2>
            <p className="text-gray-600">Log in your account to find verified tutors in your area</p>
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

          {/* Login Form */}
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
              />
              <div className="text-right mt-2">
                <a 
                  href="/forgot-password" 
                  className="text-sm text-green-600 hover:text-green-500 transition-colors"
                >
                  Forgot Password
                </a>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or Log In with</span>
              </div>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              className="flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600">
            Create an account?{' '}
            <a href="/signup" className="font-medium text-green-600 hover:text-green-500 transition-colors">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
