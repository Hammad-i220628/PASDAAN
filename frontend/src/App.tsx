import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import Contact from './components/Contact';
import SignUp from './components/SignUp';

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

// AppContent component
const AppContent = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/signup';

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;