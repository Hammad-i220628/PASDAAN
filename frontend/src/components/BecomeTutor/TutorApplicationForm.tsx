import React, { useState } from 'react';
import { Upload, ChevronDown, User, GraduationCap } from 'lucide-react';

const TutorApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    city: '',
    areaLocality: '',
    aboutYourself: '',
    profilePicture: null,
    languagesSpoken: [],
    
    // Qualifications
    education: '',
    degree: '',
    institution: '',
    graduationYear: '',
    experience: '',
    certifications: '',
    
    // Subjects & Expertise
    subjects: [],
    grades: [],
    specializations: '',
    
    // Availability
    availability: {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false },
    },
    preferredMode: '',
    hourlyRate: '',
    
    // Verification
    cnicNumber: '',
    verificationDocuments: null,
  });

  const steps = [
    { number: 1, title: 'Personal Information', active: currentStep === 1, completed: currentStep > 1 },
    { number: 2, title: 'Qualifications', active: currentStep === 2, completed: currentStep > 2 },
    { number: 3, title: 'Subjects & Expertise', active: currentStep === 3, completed: currentStep > 3 },
    { number: 4, title: 'Availability', active: currentStep === 4, completed: currentStep > 4 },
    { number: 5, title: 'Verification', active: currentStep === 5, completed: currentStep > 5 },
  ];

  const languages = ['Urdu', 'English', 'Punjabi', 'Sindhi', 'Balochi', 'Arabic', 'Other', 'Pashto'];
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Computer Science',
    'Economics', 'Accounting', 'Business Studies', 'History', 'Geography', 'Islamic Studies',
    'Pak Studies', 'Psychology', 'Sociology', 'Statistics', 'Philosophy'
  ];
  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar',
    'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languagesSpoken: prev.languagesSpoken.includes(language)
        ? prev.languagesSpoken.filter(l => l !== language)
        : [...prev.languagesSpoken, language]
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8 overflow-x-auto">
      <div className="flex items-center space-x-2 md:space-x-8 px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                step.completed ? 'bg-green-500 text-white' :
                step.active ? 'bg-blue-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {step.completed ? '✓' : step.number}
              </div>
              <span className={`mt-2 text-xs md:text-sm font-medium text-center max-w-20 ${
                step.active ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 md:w-16 h-px ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderPersonalInformation = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1e40af' }}>
          <User className="text-white" size={20} />
        </div>
        <h2 className="text-xl font-semibold text-black">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">Gender</label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 appearance-none bg-white"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 appearance-none bg-white"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            >
              <option value="">Select</option>
              {cities.map(city => (
                <option key={city} value={city.toLowerCase()}>{city}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            Area/Locality <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={formData.areaLocality}
            onChange={(e) => handleInputChange('areaLocality', e.target.value)}
            placeholder=""
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          About Yourself <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          value={formData.aboutYourself}
          onChange={(e) => handleInputChange('aboutYourself', e.target.value)}
          placeholder="Write a brief introduction about yourself, your teaching style, and teaching philosophy and your teaching experience."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-black">Profile Picture</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 text-gray-400 mb-2">
              <Upload className="w-full h-full" />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Upload a professional photo</p>
            <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3 text-black">Languages Spoken</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languages.map(language => (
            <label key={language} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.languagesSpoken.includes(language)}
                onChange={() => handleLanguageToggle(language)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{language}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQualifications = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <GraduationCap className="text-white" size={16} />
        </div>
        <h2 className="text-xl font-semibold text-black">Qualifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Degree/Diploma <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            placeholder="Bachelor in Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.fieldOfStudy || ''}
            onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
            placeholder="Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.institution}
            onChange={(e) => handleInputChange('institution', e.target.value)}
            placeholder="University/Institute Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Year of Completion
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.graduationYear}
            onChange={(e) => handleInputChange('graduationYear', e.target.value)}
            placeholder="2023"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Diploma/Degree Document
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 text-gray-400 mb-2">
              <Upload className="w-full h-full" />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Diploma/Degree Document</p>
            <p className="text-xs text-gray-500">Upload your diploma or degree certificate (PDF, JPG, PNG up to 5MB)</p>
          </div>
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-black mb-6">Teaching Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Years of Teaching Experience
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.teachingYears || ''}
              onChange={(e) => handleInputChange('teachingYears', e.target.value)}
              placeholder="2+ years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Level of Teaching
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.teachingLevel || ''}
              onChange={(e) => handleInputChange('teachingLevel', e.target.value)}
              placeholder="Primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Teaching Experience Description
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.teachingDescription || ''}
            onChange={(e) => handleInputChange('teachingDescription', e.target.value)}
            placeholder="Describe your teaching experience..."
          />
        </div>
      </div>
    </div>
  );

  const renderSubjectsExpertise = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">S</span>
        </div>
        <h2 className="text-xl font-semibold text-black">Subjects</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-3">
          Add Subject
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Subject"
        />
        
        <div className="flex flex-wrap gap-2">
          {['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'English', 'Urdu'].map(subject => (
            <span key={subject} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-black mb-6">Certification & Additional Qualifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Certification Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.certificationName || ''}
              onChange={(e) => handleInputChange('certificationName', e.target.value)}
              placeholder="e.g. TEFL Microsoft Certified Educator"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Institute Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.instituteName || ''}
              onChange={(e) => handleInputChange('instituteName', e.target.value)}
              placeholder="e.g. Cambridge English, Microsoft"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Date of Issue
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.certificationDate || ''}
                onChange={(e) => handleInputChange('certificationDate', e.target.value)}
                placeholder="mm/dd/yyyy"
              />
              <div className="absolute right-3 top-3.5">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.certificationExpiry || ''}
              onChange={(e) => handleInputChange('certificationExpiry', e.target.value)}
              placeholder="2025"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Certificate Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 text-gray-400 mb-2">
                <Upload className="w-full h-full" />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Upload a Certificate Document</p>
              <p className="text-xs text-gray-500">Upload your certificate (PDF, JPG, PNG up to 5MB)</p>
            </div>
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
          </div>
        </div>
      </div>
    </div>
  );

  // State for availability component
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startTime, setStartTime] = useState({ hour: 12, minute: 0, ampm: 'AM' });
  const [endTime, setEndTime] = useState({ hour: 12, minute: 0, ampm: 'AM' });

  const renderAvailability = () => {

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Add the days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
      }
      
      return days;
    };

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const days = getDaysInMonth(currentMonth);

    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">A</span>
          </div>
          <h2 className="text-xl font-semibold text-black">Availability</h2>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-2">Weekly Availability</h3>
          <p className="text-gray-600 text-sm mb-4">Select the time slots when you're available to teach</p>
          
          <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium mb-6">
            📅 Manage Availability
          </button>

          {/* Calendar */}
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <h4 className="text-lg font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              <button 
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      className={`w-full h-full flex items-center justify-center text-sm rounded hover:bg-blue-100 ${
                        day === 5 ? 'bg-teal-600 text-white' : 
                        selectedDate === day ? 'bg-blue-500 text-white' : 
                        'text-gray-700'
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-center"
                  value={startTime.hour}
                  onChange={(e) => setStartTime({...startTime, hour: parseInt(e.target.value)})}
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
                <span>:</span>
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-center"
                  value={startTime.minute}
                  onChange={(e) => setStartTime({...startTime, minute: parseInt(e.target.value)})}
                >
                  <option value={0}>00</option>
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                </select>
                <select 
                  className="border border-gray-300 rounded px-3 py-2"
                  value={startTime.ampm}
                  onChange={(e) => setStartTime({...startTime, ampm: e.target.value})}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">To</span>
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-center"
                  value={endTime.hour}
                  onChange={(e) => setEndTime({...endTime, hour: parseInt(e.target.value)})}
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
                <span>:</span>
                <select 
                  className="border border-gray-300 rounded px-3 py-2 text-center"
                  value={endTime.minute}
                  onChange={(e) => setEndTime({...endTime, minute: parseInt(e.target.value)})}
                >
                  <option value={0}>00</option>
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                </select>
                <select 
                  className="border border-gray-300 rounded px-3 py-2"
                  value={endTime.ampm}
                  onChange={(e) => setEndTime({...endTime, ampm: e.target.value})}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVerification = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">V</span>
        </div>
        <h2 className="text-xl font-semibold text-black">Verification</h2>
      </div>

      {/* Identity Verification Section */}
      <div className="bg-white border-l-4 border-green-500 p-6 shadow-sm border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xs">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-black">Identity Verification</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Note: To ensure the safety and trust of our platform, we require all tutors to verify their identity. Please provide the following documents:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
          <li>National ID card (CNIC) - front and back</li>
          <li>Passport* (passport must <strong>clearly</strong> show face)</li>
        </ul>
        <p className="text-xs text-gray-500">
          All documents will be securely stored and encrypted according to our <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </p>

        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              CNIC Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.cnicNumber || ''}
              onChange={(e) => handleInputChange('cnicNumber', e.target.value)}
              placeholder="e.g., 12345-1234567-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload CNIC Front
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500">Max file size: 5MB (JPG, PNG, PDF)</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload CNIC Back
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500">Max file size: 5MB (JPG, PNG, PDF)</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload Passport Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500">Max file size: 5MB (JPG, PNG, PDF)</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>
        </div>
      </div>

      {/* Qualification Verification Section */}
      <div className="bg-white border-l-4 border-green-500 p-6 shadow-sm border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xs">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-black">Qualification Verification</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Note: Upload any educational certificates and relevant documents to verify your qualifications. This helps build trust with parents and increases your chances of getting students.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload Degree Certificate
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500">Max file size: 5MB (JPG, PNG, PDF)</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload Teaching Experience Certificate (if any)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500">Max file size: 5MB (JPG, PNG, PDF)</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload Additional Certificates (if any)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium mb-1" style={{ color: '#10b981' }}>Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500">Max file size: 5MB (JPG, PNG, PDF)</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Information Section */}
      <div className="bg-white border-l-4 border-green-500 p-6 shadow-sm border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xs">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-black">Background Information</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Note: This information helps us ensure the safety and security of our platform. Your answers will be kept confidential.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-black mb-2">Do you have any criminal record?</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="criminalRecord" value="no" className="mr-2" />
                <span className="text-sm">No</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="criminalRecord" value="yes" className="mr-2" />
                <span className="text-sm">Yes (Please explain)</span>
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-black mb-2">Have you ever been restricted from a teaching position?</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="teachingRestriction" value="no" className="mr-2" />
                <span className="text-sm">No</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="teachingRestriction" value="yes" className="mr-2" />
                <span className="text-sm">Yes (Please explain)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Reference Contact (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Process Section */}
      <div className="bg-white border-l-4 border-green-500 p-6 shadow-sm border border-gray-200 rounded-lg">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-xs">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-black">Verification Process</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Note: Our verification process typically takes 3-5 business days. We will carefully review and audit your information to complete your profile.
        </p>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-black">What happens next?</h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                <span className="text-white text-xs">•</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">Document Submission</p>
                <p className="text-xs text-gray-600">Submit all required documents through this form</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                <span className="text-white text-xs">•</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">Document Review</p>
                <p className="text-xs text-gray-600">Our team will review your documents for accuracy and completeness</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                <span className="text-white text-xs">•</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">Background Check</p>
                <p className="text-xs text-gray-600">We conduct professional background checks as per our policy</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3 mt-0.5 flex items-center justify-center">
                <span className="text-white text-xs">•</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">Profile Goes Live</p>
                <p className="text-xs text-gray-600">Your profile becomes visible to students looking for tutors</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              I confirm that all information provided is accurate and complete. I understand that providing false information may result in the rejection of my application or removal from the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSubmit = () => {
    // Handle form submission logic here
    alert('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Tutor Application Form</h1>
          <p className="text-gray-600 text-sm sm:text-lg mb-4 sm:mb-6">Join our community of verified tutors and start connecting with students across Pakistan.</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-6 sm:mb-12">
          <div className="flex justify-center px-2 sm:px-4">
            <div className="flex items-center justify-between w-full max-w-3xl">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step.completed ? 'bg-green-500 text-white' :
                      step.active ? 'bg-blue-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {step.completed ? '✓' : step.number}
                    </div>
                    <span className={`mt-1 sm:mt-2 text-xs font-medium text-center w-14 sm:w-16 leading-tight ${
                      step.active ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-2 sm:mx-3 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-12">
          {currentStep === 1 && renderPersonalInformation()}
          {currentStep === 2 && renderQualifications()}
          {currentStep === 3 && renderSubjectsExpertise()}
          {currentStep === 4 && renderAvailability()}
          {currentStep === 5 && renderVerification()}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-6 sm:mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg font-medium text-sm order-2 sm:order-1 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            
            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-medium px-6 sm:px-8 py-3 rounded-lg text-sm order-1 sm:order-2"
              >
                Next: {steps[currentStep]?.title}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 sm:px-10 py-3 rounded-lg text-sm order-1 sm:order-2"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorApplicationForm;
