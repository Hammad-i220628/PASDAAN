import React, { useState } from 'react';
import { Upload, ChevronDown } from 'lucide-react';

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
          <span className="text-white text-lg">P</span>
        </div>
        <h2 className="text-xl font-semibold" style={{ color: '#1e40af' }}>Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
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
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
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
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
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
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>Gender</label>
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
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
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
          <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
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
        <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>
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
        <label className="block text-sm font-medium mb-2" style={{ color: '#1e40af' }}>Profile Picture</label>
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
        <label className="block text-sm font-medium mb-3" style={{ color: '#1e40af' }}>Languages Spoken</label>
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
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">Q</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Qualifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highest Education Level <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
          >
            <option value="">Select Education Level</option>
            <option value="matriculation">Matriculation</option>
            <option value="intermediate">Intermediate</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree/Field of Study <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            placeholder="e.g., Computer Science, Mathematics, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.institution}
            onChange={(e) => handleInputChange('institution', e.target.value)}
            placeholder="Enter your institution name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.graduationYear}
            onChange={(e) => handleInputChange('graduationYear', e.target.value)}
            placeholder="e.g., 2020"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Teaching Experience <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="beginner">No experience (Beginner)</option>
          <option value="1-2">1-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Certifications
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.certifications}
          onChange={(e) => handleInputChange('certifications', e.target.value)}
          placeholder="List any additional certifications, courses, or achievements"
        />
      </div>
    </div>
  );

  const renderSubjectsExpertise = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">S</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Subjects & Expertise</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Subjects You Can Teach <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {subjects.map(subject => (
            <label key={subject} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={() => handleSubjectToggle(subject)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grade Levels <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['1st-5th Grade', '6th-8th Grade', '9th-10th Grade', '11th-12th Grade', 'University Level'].map(grade => (
            <label key={grade} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{grade}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializations & Teaching Methods
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.specializations}
          onChange={(e) => handleInputChange('specializations', e.target.value)}
          placeholder="Describe your teaching methods, specializations, and what makes you unique as a tutor"
        />
      </div>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">A</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Availability</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Weekly Schedule <span className="text-red-500">*</span>
        </label>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-50">Day</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-50">Morning (8AM-12PM)</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-50">Afternoon (12PM-6PM)</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-50">Evening (6PM-10PM)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.availability).map(day => (
                <tr key={day}>
                  <td className="border border-gray-300 px-4 py-2 font-medium capitalize">{day}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Teaching Mode <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.preferredMode}
            onChange={(e) => handleInputChange('preferredMode', e.target.value)}
          >
            <option value="">Select Teaching Mode</option>
            <option value="online">Online Only</option>
            <option value="home">Home Tutoring</option>
            <option value="both">Both Online & Home</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Hourly Rate (PKR) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.hourlyRate}
            onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
            placeholder="e.g., 1500"
          />
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">V</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Verification</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CNIC Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.cnicNumber}
          onChange={(e) => handleInputChange('cnicNumber', e.target.value)}
          placeholder="e.g., 12345-1234567-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Verification Documents <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-green-600 font-medium mb-1">Upload verification documents</p>
          <p className="text-xs text-gray-500">Upload CNIC copy and educational certificates (PDF, JPG, PNG up to 10MB each)</p>
          <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• We'll review your application within 2-3 business days</li>
          <li>• You'll receive an email confirmation once approved</li>
          <li>• Complete your profile setup and start connecting with students</li>
          <li>• Our team may contact you for additional verification if needed</li>
        </ul>
      </div>
    </div>
  );

  const handleSubmit = () => {
    // Handle form submission logic here
    alert('Application submitted successfully!');
  };

return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tutor Application Form</h1>
          <p className="text-gray-600 text-lg mb-6">Join our community of verified tutors and start connecting with students across Pakistan.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center mb-12 overflow-x-auto">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.completed ? 'bg-green-500 text-white' :
                    step.active ? 'bg-blue-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? '✓' : step.number}
                  </div>
                  <span className={`mt-2 text-sm font-medium text-center whitespace-nowrap ${
                    step.active ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-px ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          {currentStep === 1 && renderPersonalInformation()}
          {currentStep === 2 && renderQualifications()}
          {currentStep === 3 && renderSubjectsExpertise()}
          {currentStep === 4 && renderAvailability()}
          {currentStep === 5 && renderVerification()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-8 py-3 rounded-lg font-medium text-sm ${
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
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-lg text-sm"
              >
                Next: {steps[currentStep]?.title}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-10 py-3 rounded-lg text-sm"
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
