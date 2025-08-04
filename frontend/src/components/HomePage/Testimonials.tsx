import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "Parent",
      content: "Finding a qualified mathematics tutor for my daughter was so easy with Pasdaan. The tutor is excellent and my daughter's grades have improved significantly.",
      rating: 5,
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Ahmed Ali",
      role: "Student",
      content: "The quality of tutors on Pasdaan is exceptional. My chemistry tutor explains complex concepts in a way that's easy to understand. Highly recommend!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Sarah Ahmed",
      role: "Parent",
      content: "As a working mother, I needed help with my son's education. Pasdaan connected us with an amazing tutor who comes to our home. Very convenient!",
      rating: 5,
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Omar Hassan",
      role: "Student",
      content: "I struggled with physics until I found my tutor through Pasdaan. Now I actually enjoy the subject and my confidence has grown tremendously.",
      rating: 5,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What Parents & Students Say</h2>
            <p className="text-xl text-gray-600">Real feedback from our learning community</p>
          </div>
          <button className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;