import React from 'react';

const CallToAction = () => {
  return (
    <section className="text-white py-12" style={{ backgroundColor: '#003366' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-green-400">
          Ready to Start Your Tutoring Journey?
        </h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Join thousands of students across Pakistan who are achieving their academic 
          goals with the help of qualified tutors.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded transition-colors duration-200">
          Apply Now
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
