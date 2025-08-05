import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import AboutUs from './components/AboutUs';

// HomePage component
const HomePage = () => (
  <>
    <Hero />
    <WhyChoose />
    <HowItWorks />
    <FeaturedTutors />
    <SubjectBrowse />
    <Testimonials />
    <FAQ />
    <CTA />
  </>
);

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Router>
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;