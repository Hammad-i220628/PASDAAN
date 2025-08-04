import React from 'react';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

const FeaturedTutors = () => {
  const tutors = [
    {
      name: "Sarah Khan",
      subject: "Mathematics & Physics",
      rating: 4.9,
      reviews: 127,
      experience: "5+ years",
      location: "Karachi",
      price: "Rs. 1,500/hr",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Ahmad Ali",
      subject: "Chemistry & Biology",
      rating: 4.8,
      reviews: 95,
      experience: "7+ years",
      location: "Lahore",
      price: "Rs. 1,800/hr",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Fatima Sheikh",
      subject: "English & Literature",
      rating: 4.9,
      reviews: 156,
      experience: "6+ years",
      location: "Islamabad",
      price: "Rs. 1,500/hr",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Hassan Ahmed",
      subject: "Computer Science",
      rating: 4.7,
      reviews: 89,
      experience: "4+ years",
      location: "Karachi",
      price: "Rs. 2,200/hr",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-2 sm:mb-4">Featured Tutors</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Meet our top-rated tutors ready to help</p>
          </div>
          <button className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-colors text-sm sm:text-base">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tutors.map((tutor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={tutor.image} 
                  alt={tutor.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                {/* Verified Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-1">{tutor.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2">{tutor.subject}</p>
                
                {/* Star Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(tutor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">
                    {tutor.rating} ({tutor.reviews} reviews)
                  </span>
                </div>
                
                {/* Experience */}
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  MS in Mathematics, {tutor.experience} teaching experience.
                </p>
                
                {/* Price */}
                <div className="text-sm sm:text-base font-bold text-green-500 mb-3">
                  {tutor.price}
                </div>
                
                <button className="w-full bg-blue-900 text-white py-2 sm:py-3 rounded-md hover:bg-blue-800 transition-colors font-medium text-sm sm:text-base">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;