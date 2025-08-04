import React from 'react';
import Header from './components/HomePage/Header';
import Hero from './components/HomePage/Hero';
import WhyChoose from './components/HomePage/WhyChoose';
import HowItWorks from './components/HomePage/HowItWorks';
import FeaturedTutors from './components/HomePage/FeaturedTutors';
import SubjectBrowse from './components/HomePage/SubjectBrowse';
import Testimonials from './components/HomePage/Testimonials';
import FAQ from './components/HomePage/FAQ';
import CTA from './components/HomePage/CTA';
import Footer from './components/HomePage/Footer';

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <FeaturedTutors />
      <SubjectBrowse />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;