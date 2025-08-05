import React from 'react';
import { Calculator, Atom, BookOpen, Globe, Monitor, Music } from 'lucide-react';

const SubjectBrowse = () => {
  const subjects = [
    { name: "Mathematics", icon: Calculator, iconColor: "bg-purple-100 text-purple-600", bgColor: "bg-purple-50" },
    { name: "Sciences", icon: Atom, iconColor: "bg-blue-100 text-blue-600", bgColor: "bg-blue-50" },
    { name: "Humanities", icon: BookOpen, iconColor: "bg-orange-100 text-orange-600", bgColor: "bg-orange-50" },
    { name: "Languages", icon: Globe, iconColor: "bg-green-100 text-green-600", bgColor: "bg-green-50" },
    { name: "Computer Science", icon: Monitor, iconColor: "bg-red-100 text-red-600", bgColor: "bg-red-50" },
    { name: "Arts & Music", icon: Music, iconColor: "bg-indigo-100 text-indigo-600", bgColor: "bg-indigo-50" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Browse by Subject</h2>
            <p className="text-xl text-gray-600">Find tutors specializing in your specific area of study.</p>
          </div>
          <button className="text-white px-6 py-3 rounded-md transition-colors" style={{ backgroundColor: '#003366' }}>
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className={`text-center p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer ${subject.bgColor}`}>
              <div className={`w-16 h-16 ${subject.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <subject.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900">{subject.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectBrowse;