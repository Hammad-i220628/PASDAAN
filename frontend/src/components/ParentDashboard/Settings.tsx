import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Plus, Trash2, Lock, Shield, Bell, Globe, Eye, EyeOff } from 'lucide-react';

// Types
interface ParentProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  emergencyContact: string;
  relationship: string;
}

interface ChildProfile {
  id: string;
  name: string;
  age: string;
  grade: string;
  school: string;
  subjects: string;
  profilePicture?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  sessionReminders: boolean;
  progressUpdates: boolean;
  tutorMessages: boolean;
  paymentAlerts: boolean;
  lowBalanceWarning: boolean;
  weeklyReports: boolean;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: string;
}

interface ParentalControlSettings {
  allowDirectTutorContact: boolean;
  requireApprovalForBookings: boolean;
  contentFilterLevel: string;
  sessionRecording: boolean;
  allowVideoSessions: boolean;
  allowPrivateMessaging: boolean;
  maxSessionDuration: string;
  allowedSessionTimes: {
    start: string;
    end: string;
  };
}

interface PreferenceSettings {
  language: string;
  timezone: string;
  currency: string;
  autoPayment: boolean;
  reminderTime: string;
  dashboardView: string;
  reportFrequency: string;
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

// Parent Profile Tab Component
const ParentProfileTab = ({ 
  profileData, 
  setProfileData 
}: { 
  profileData: ParentProfileData; 
  setProfileData: (data: ParentProfileData) => void;
}) => {
  const handleInputChange = (field: keyof ParentProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleProfilePictureUpload = (file: File) => {
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Contact*
          </label>
          <input
            type="tel"
            value={profileData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Emergency contact number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relationship to Children*
          </label>
          <select
            value={profileData.relationship}
            onChange={(e) => handleInputChange('relationship', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select relationship</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
            <option value="grandparent">Grandparent</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Home Address
        </label>
        <textarea
          rows={3}
          value={profileData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Complete home address"
        />
      </div>
    </div>
  );
};

// Children Profiles Tab Component
const ChildrenProfilesTab = ({ 
  children, 
  setChildren 
}: { 
  children: ChildProfile[]; 
  setChildren: (children: ChildProfile[]) => void;
}) => {
  const addChild = () => {
    const newChild: ChildProfile = {
      id: Date.now().toString(),
      name: '',
      age: '',
      grade: '',
      school: '',
      subjects: '',
      profilePicture: undefined
    };
    setChildren([...children, newChild]);
  };

  const updateChild = (id: string, field: keyof ChildProfile, value: string) => {
    setChildren(children.map(child => 
      child.id === id ? { ...child, [field]: value } : child
    ));
  };

  const removeChild = (id: string) => {
    setChildren(children.filter(child => child.id !== id));
  };

  const handleChildPictureUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateChild(id, 'profilePicture', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Children Profiles</h3>
        <button
          onClick={addChild}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Child
        </button>
      </div>

      <div className="space-y-6">
        {children.map((child) => (
          <div key={child.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">Child Profile</h4>
              <button
                onClick={() => removeChild(child.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child's Name*
                </label>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => updateChild(child.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age*
                </label>
                <input
                  type="number"
                  value={child.age}
                  onChange={(e) => updateChild(child.id, 'age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade/Class*
                </label>
                <input
                  type="text"
                  value={child.grade}
                  onChange={(e) => updateChild(child.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Grade 8, Class 10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School*
                </label>
                <input
                  type="text"
                  value={child.school}
                  onChange={(e) => updateChild(child.id, 'school', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="School name"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects of Interest
              </label>
              <input
                type="text"
                value={child.subjects}
                onChange={(e) => updateChild(child.id, 'subjects', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Mathematics, Physics, English"
              />
            </div>
          </div>
        ))}

        {children.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No children profiles added yet.</p>
            <p className="text-sm">Click "Add Child" to create a profile.</p>
          </div>
        )}
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
              <label className="text-sm font-medium text-gray-700">Session Reminders</label>
              <p className="text-sm text-gray-500">Get reminders about upcoming sessions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sessionReminders}
                onChange={() => handleToggle('sessionReminders')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Progress Updates</label>
              <p className="text-sm text-gray-500">Notifications about your children's progress</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.progressUpdates}
                onChange={() => handleToggle('progressUpdates')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Tutor Messages</label>
              <p className="text-sm text-gray-500">Notifications when tutors send messages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.tutorMessages}
                onChange={() => handleToggle('tutorMessages')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Payment Alerts</label>
              <p className="text-sm text-gray-500">Notifications about payments and transactions</p>
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
              <label className="text-sm font-medium text-gray-700">Low Balance Warning</label>
              <p className="text-sm text-gray-500">Alert when account balance is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.lowBalanceWarning}
                onChange={() => handleToggle('lowBalanceWarning')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Weekly Reports</label>
              <p className="text-sm text-gray-500">Weekly progress and activity reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weeklyReports}
                onChange={() => handleToggle('weeklyReports')}
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between max-w-md">
            <div>
              <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
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

          <div className="flex items-center justify-between max-w-md">
            <div>
              <label className="text-sm font-medium text-gray-700">Login Alerts</label>
              <p className="text-sm text-gray-500">Get notified of new login attempts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.loginAlerts}
                onChange={(e) => handleInputChange('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout
            </label>
            <select
              value={security.sessionTimeout}
              onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Parental Controls Tab Component
const ParentalControlsTab = ({ 
  controls, 
  setControls 
}: { 
  controls: ParentalControlSettings; 
  setControls: (settings: ParentalControlSettings) => void;
}) => {
  const handleToggle = (field: keyof ParentalControlSettings) => {
    if (field === 'allowedSessionTimes') return; // Skip object fields
    setControls({ 
      ...controls, 
      [field]: !controls[field] 
    });
  };

  const handleInputChange = (field: keyof ParentalControlSettings, value: string) => {
    setControls({ ...controls, [field]: value });
  };

  const handleTimeChange = (timeType: 'start' | 'end', value: string) => {
    setControls({
      ...controls,
      allowedSessionTimes: {
        ...controls.allowedSessionTimes,
        [timeType]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Controls</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Allow Direct Tutor Contact</label>
              <p className="text-sm text-gray-500">Let children contact tutors directly</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={controls.allowDirectTutorContact}
                onChange={() => handleToggle('allowDirectTutorContact')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Allow Private Messaging</label>
              <p className="text-sm text-gray-500">Allow private messages between children and tutors</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={controls.allowPrivateMessaging}
                onChange={() => handleToggle('allowPrivateMessaging')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Controls</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Require Approval for Bookings</label>
              <p className="text-sm text-gray-500">All bookings need parent approval</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={controls.requireApprovalForBookings}
                onChange={() => handleToggle('requireApprovalForBookings')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Allow Video Sessions</label>
              <p className="text-sm text-gray-500">Enable video calling for sessions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={controls.allowVideoSessions}
                onChange={() => handleToggle('allowVideoSessions')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Session Recording</label>
              <p className="text-sm text-gray-500">Record sessions for review</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={controls.sessionRecording}
                onChange={() => handleToggle('sessionRecording')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Session Duration
              </label>
              <select
                value={controls.maxSessionDuration}
                onChange={(e) => handleInputChange('maxSessionDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
                <option value="unlimited">Unlimited</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Filter Level
              </label>
              <select
                value={controls.contentFilterLevel}
                onChange={(e) => handleInputChange('contentFilterLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="strict">Strict</option>
                <option value="moderate">Moderate</option>
                <option value="basic">Basic</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Allowed Session Times
            </label>
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                <input
                  type="time"
                  value={controls.allowedSessionTimes.start}
                  onChange={(e) => handleTimeChange('start', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <span className="text-gray-500 mt-5">to</span>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Time</label>
                <input
                  type="time"
                  value={controls.allowedSessionTimes.end}
                  onChange={(e) => handleTimeChange('end', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
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
            Reminder Time (before sessions)
          </label>
          <select
            value={preferences.reminderTime}
            onChange={(e) => handleInputChange('reminderTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dashboard View
          </label>
          <select
            value={preferences.dashboardView}
            onChange={(e) => handleInputChange('dashboardView', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed</option>
            <option value="compact">Compact</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Report Frequency
          </label>
          <select
            value={preferences.reportFrequency}
            onChange={(e) => handleInputChange('reportFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Auto Payment</label>
            <p className="text-sm text-gray-500">Automatically pay for confirmed sessions</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.autoPayment}
              onChange={(e) => handleInputChange('autoPayment', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeTab, setActiveTab] = useState('Parent Profile');
  const [isSaving, setIsSaving] = useState(false);
  
  // Parent profile state
  const [profileData, setProfileData] = useState<ParentProfileData>({
    firstName: 'Ahmed',
    lastName: 'Malik',
    email: 'ahmed.malik@example.com',
    phone: '+92 300 1234567',
    address: '123 Main Street, Gulshan-e-Iqbal, Karachi',
    emergencyContact: '+92 321 7654321',
    relationship: 'father'
  });
  
  // Children profiles state
  const [children, setChildren] = useState<ChildProfile[]>([
    {
      id: '1',
      name: 'Ali Malik',
      age: '13',
      grade: 'Grade 8',
      school: 'City School North Campus',
      subjects: 'Mathematics, Physics, English'
    },
    {
      id: '2',
      name: 'Fatima Malik',
      age: '16',
      grade: 'Grade 10',
      school: 'Beaconhouse School',
      subjects: 'Biology, Chemistry, English'
    }
  ]);
  
  // Notification state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    sessionReminders: true,
    progressUpdates: true,
    tutorMessages: true,
    paymentAlerts: true,
    lowBalanceWarning: true,
    weeklyReports: true
  });
  
  // Security state
  const [security, setSecurity] = useState<SecuritySettings>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '60'
  });
  
  // Parental controls state
  const [parentalControls, setParentalControls] = useState<ParentalControlSettings>({
    allowDirectTutorContact: false,
    requireApprovalForBookings: true,
    contentFilterLevel: 'moderate',
    sessionRecording: true,
    allowVideoSessions: true,
    allowPrivateMessaging: false,
    maxSessionDuration: '90',
    allowedSessionTimes: {
      start: '08:00',
      end: '20:00'
    }
  });
  
  // Preferences state
  const [preferences, setPreferences] = useState<PreferenceSettings>({
    language: 'en',
    timezone: 'Asia/Karachi',
    currency: 'PKR',
    autoPayment: false,
    reminderTime: '15',
    dashboardView: 'overview',
    reportFrequency: 'weekly'
  });

  const tabs = ['Parent Profile', 'Children Profiles', 'Notifications', 'Security', 'Parental Controls', 'Preferences'];

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
      case 'Parent Profile':
        return <ParentProfileTab profileData={profileData} setProfileData={setProfileData} />;
      case 'Children Profiles':
        return <ChildrenProfilesTab children={children} setChildren={setChildren} />;
      case 'Notifications':
        return <NotificationsTab notifications={notifications} setNotifications={setNotifications} />;
      case 'Security':
        return <SecurityTab security={security} setSecurity={setSecurity} />;
      case 'Parental Controls':
        return <ParentalControlsTab controls={parentalControls} setControls={setParentalControls} />;
      case 'Preferences':
        return <PreferencesTab preferences={preferences} setPreferences={setPreferences} />;
      default:
        return <ParentProfileTab profileData={profileData} setProfileData={setProfileData} />;
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
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-2 truncate">Parent Account Settings</h1>
            <p className="text-sm sm:text-base text-gray-600 break-words">Manage your account, children profiles, and parental controls</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 sm:mb-8 -mx-3 sm:-mx-4 lg:mx-0 overflow-hidden">
            {/* Mobile view - wrap tabs in multiple lines */}
            <div className="block sm:hidden px-3">
              {/* First line - first 4 tabs */}
              <div className="flex overflow-x-auto scrollbar-hide mb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {tabs.slice(0, 4).map((tab) => (
                  <TabButton
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </TabButton>
                ))}
              </div>
              {/* Second line - remaining tabs */}
              <div className="flex overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {tabs.slice(4).map((tab) => (
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
            
            {/* Desktop view - single line */}
            <div className="hidden sm:flex overflow-x-auto scrollbar-hide px-0 sm:px-4 lg:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
