import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

// Types
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  education: string;
  experience: string;
  subjects: string;
  address: string;
  profilePicture?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  bookingReminders: boolean;
  paymentAlerts: boolean;
  studentMessages: boolean;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorAuth: boolean;
}

interface AvailabilitySettings {
  monday: { available: boolean; startTime: string; endTime: string };
  tuesday: { available: boolean; startTime: string; endTime: string };
  wednesday: { available: boolean; startTime: string; endTime: string };
  thursday: { available: boolean; startTime: string; endTime: string };
  friday: { available: boolean; startTime: string; endTime: string };
  saturday: { available: boolean; startTime: string; endTime: string };
  sunday: { available: boolean; startTime: string; endTime: string };
}

interface PreferenceSettings {
  language: string;
  timezone: string;
  currency: string;
  sessionDuration: string;
  autoAcceptBookings: boolean;
  profileVisibility: string;
}

// Tab Component
const TabButton = ({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) => (
  <button
    onClick={onClick}
    className={`px-2 sm:px-3 py-2 sm:py-3 text-xs font-medium transition-colors whitespace-nowrap border-b-2 flex-shrink-0 ${
      active
        ? 'text-blue-600 border-blue-600'
        : 'text-gray-500 border-transparent hover:text-blue-600'
    }`}
  >
    {children}
  </button>
);

// Profile Picture Component
const ProfilePictureUpload = ({ 
  profilePicture, 
  onUpload, 
  onRemove 
}: { 
  profilePicture?: string; 
  onUpload: (file: File) => void;
  onRemove: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 text-gray-400" />
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Upload New Picture
        </button>
        {profilePicture && (
          <button
            onClick={onRemove}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700"
          >
            Remove Picture
          </button>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ 
  profileData, 
  setProfileData 
}: { 
  profileData: ProfileData; 
  setProfileData: (data: ProfileData) => void;
}) => {
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleProfilePictureUpload = (file: File) => {
    // In a real app, you would upload to a server and get back a URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileData({ ...profileData, profilePicture: e.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = () => {
    setProfileData({ ...profileData, profilePicture: undefined });
  };

  return (
    <div className="space-y-6">
      <ProfilePictureUpload 
        profilePicture={profileData.profilePicture}
        onUpload={handleProfilePictureUpload}
        onRemove={handleRemoveProfilePicture}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name*
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name*
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address*
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number*
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio/About Me
        </label>
        <textarea
          rows={4}
          value={profileData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell students about yourself, your teaching style, and experience..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education*
          </label>
          <input
            type="text"
            value={profileData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., MSc Physics, University of Karachi"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience*
          </label>
          <input
            type="number"
            value={profileData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 5"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects Taught*
        </label>
        <input
          type="text"
          value={profileData.subjects}
          onChange={(e) => handleInputChange('subjects', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Mathematics, Physics"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          rows={2}
          value={profileData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your address (optional)"
        />
      </div>
    </div>
  );
};

// Notifications Tab Component
const NotificationsTab = ({ 
  notifications, 
  setNotifications 
}: { 
  notifications: NotificationSettings; 
  setNotifications: (settings: NotificationSettings) => void;
}) => {
  const handleToggle = (field: keyof NotificationSettings) => {
    setNotifications({ 
      ...notifications, 
      [field]: !notifications[field] 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
              <p className="text-sm text-gray-500">Receive notifications via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <p className="text-sm text-gray-500">Receive push notifications in browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Booking Reminders</label>
              <p className="text-sm text-gray-500">Get reminders about upcoming sessions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.bookingReminders}
                onChange={() => handleToggle('bookingReminders')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Payment Alerts</label>
              <p className="text-sm text-gray-500">Notifications about payments and earnings</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.paymentAlerts}
                onChange={() => handleToggle('paymentAlerts')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Student Messages</label>
              <p className="text-sm text-gray-500">Notifications when students send messages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.studentMessages}
                onChange={() => handleToggle('studentMessages')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Tab Component
const SecurityTab = ({ 
  security, 
  setSecurity 
}: { 
  security: SecuritySettings; 
  setSecurity: (settings: SecuritySettings) => void;
}) => {
  const handleInputChange = (field: keyof SecuritySettings, value: string | boolean) => {
    setSecurity({ ...security, [field]: value });
  };

  const handlePasswordChange = () => {
    // Implement password change logic
    console.log('Password change requested');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={security.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={security.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={security.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Change Password
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between max-w-md">
          <div>
            <label className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</label>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={security.twoFactorAuth}
              onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

// Availability Tab Component
const AvailabilityTab = ({ 
  availability, 
  setAvailability 
}: { 
  availability: AvailabilitySettings; 
  setAvailability: (settings: AvailabilitySettings) => void;
}) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayToggle = (day: keyof AvailabilitySettings) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], available: !availability[day].available }
    });
  };

  const handleTimeChange = (day: keyof AvailabilitySettings, timeType: 'startTime' | 'endTime', value: string) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], [timeType]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Weekly Availability</h3>
        
        <div className="space-y-3 sm:space-y-4">
          {days.map((day, index) => (
            <div key={day} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={availability[day as keyof AvailabilitySettings].available}
                    onChange={() => handleDayToggle(day as keyof AvailabilitySettings)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="font-medium text-gray-900 text-sm sm:text-base">{dayLabels[index]}</span>
              </div>
              
              {availability[day as keyof AvailabilitySettings].available && (
                <div className="flex items-center space-x-2 justify-start sm:justify-end ml-14 sm:ml-0">
                  <input
                    type="time"
                    value={availability[day as keyof AvailabilitySettings].startTime}
                    onChange={(e) => handleTimeChange(day as keyof AvailabilitySettings, 'startTime', e.target.value)}
                    className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-20 sm:w-auto"
                  />
                  <span className="text-gray-500 text-xs sm:text-sm">to</span>
                  <input
                    type="time"
                    value={availability[day as keyof AvailabilitySettings].endTime}
                    onChange={(e) => handleTimeChange(day as keyof AvailabilitySettings, 'endTime', e.target.value)}
                    className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-20 sm:w-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Preferences Tab Component
const PreferencesTab = ({ 
  preferences, 
  setPreferences 
}: { 
  preferences: PreferenceSettings; 
  setPreferences: (settings: PreferenceSettings) => void;
}) => {
  const handleInputChange = (field: keyof PreferenceSettings, value: string | boolean) => {
    setPreferences({ ...preferences, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={preferences.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={preferences.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Asia/Karachi">Asia/Karachi</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={preferences.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="PKR">PKR - Pakistani Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Session Duration
          </label>
          <select
            value={preferences.sessionDuration}
            onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Auto-accept Bookings</label>
            <p className="text-sm text-gray-500">Automatically accept booking requests</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.autoAcceptBookings}
              onChange={(e) => handleInputChange('autoAcceptBookings', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Visibility
          </label>
          <select
            value={preferences.profileVisibility}
            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="public">Public - Visible to all students</option>
            <option value="private">Private - Only invited students</option>
            <option value="featured">Featured - Highlighted in searches</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Muhammad',
    lastName: 'Ahmed',
    email: 'muhammad.ahmed@example.com',
    phone: '+92 300 1234567',
    bio: 'Experienced mathematics and physics tutor with over 5 years of teaching experience. Specializing in O Level and A Level curriculum. Passionate about making complex concepts easy to understand through practical examples and personalized teaching methods.',
    education: 'MSc Physics, University of Karachi',
    experience: '5',
    subjects: 'Mathematics, Physics',
    address: '123 Main Street, Gulshan-e-Iqbal, Karachi'
  });
  
  // Notification state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingReminders: true,
    paymentAlerts: true,
    studentMessages: true
  });
  
  // Security state
  const [security, setSecurity] = useState<SecuritySettings>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false
  });
  
  // Availability state
  const [availability, setAvailability] = useState<AvailabilitySettings>({
    monday: { available: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
    thursday: { available: true, startTime: '09:00', endTime: '17:00' },
    friday: { available: true, startTime: '09:00', endTime: '17:00' },
    saturday: { available: false, startTime: '09:00', endTime: '17:00' },
    sunday: { available: false, startTime: '09:00', endTime: '17:00' }
  });
  
  // Preferences state
  const [preferences, setPreferences] = useState<PreferenceSettings>({
    language: 'en',
    timezone: 'Asia/Karachi',
    currency: 'PKR',
    sessionDuration: '60',
    autoAcceptBookings: false,
    profileVisibility: 'public'
  });

  const tabs = ['Profile', 'Notifications', 'Security', 'Availability', 'Preferences'];

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    // Reset to original values or show confirmation
    if (confirm('Are you sure you want to discard your changes?')) {
      // Reset states to original values
      window.location.reload();
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileTab profileData={profileData} setProfileData={setProfileData} />;
      case 'Notifications':
        return <NotificationsTab notifications={notifications} setNotifications={setNotifications} />;
      case 'Security':
        return <SecurityTab security={security} setSecurity={setSecurity} />;
      case 'Availability':
        return <AvailabilityTab availability={availability} setAvailability={setAvailability} />;
      case 'Preferences':
        return <PreferencesTab preferences={preferences} setPreferences={setPreferences} />;
      default:
        return <ProfileTab profileData={profileData} setProfileData={setProfileData} />;
    }
  };

  return (
    <>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Ensure no horizontal overflow on mobile */
        .settings-container {
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        .settings-container * {
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Ensure form elements don't overflow */
        .settings-form-container {
          width: 100%;
          min-width: 0;
        }
        
        .settings-form-container input,
        .settings-form-container textarea,
        .settings-form-container select {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
      `}</style>
      
      <div className="settings-container w-full bg-gray-50 min-h-screen overflow-x-hidden" style={{ maxWidth: '100vw' }}>
        <div className="w-full min-w-0 max-w-none lg:max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6" style={{ maxWidth: '100vw' }}>
          {/* Header */}
          <div className="mb-6 sm:mb-8 w-full min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-2 truncate">Account Settings</h1>
            <p className="text-sm sm:text-base text-gray-600 break-words">Manage your account settings and preferences</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 sm:mb-8 -mx-3 sm:-mx-4 lg:mx-0 overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide px-3 sm:px-4 lg:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {tabs.map((tab) => (
                <TabButton
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </TabButton>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="settings-form-container bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 w-full min-w-0 overflow-hidden">
            <div className="w-full min-w-0">
              {renderActiveTab()}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6 sm:mt-8 pt-6 border-t border-gray-200 w-full">
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors order-2 sm:order-1 min-w-0"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 order-1 sm:order-2 min-w-0"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
