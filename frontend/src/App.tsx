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
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import BecomeATutor from './components/BecomeTutor/BecomeATutor';
import TutorApplicationForm from './components/BecomeTutor/TutorApplicationForm';
import FindTutor from './components/FindTutor/FindTutor';
import TutorProfile from './components/FindTutor/TutorProfile';
import TutorAvailability from './components/FindTutor/TutorAvailability';

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
  const hideFooter = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/forgot-password' || location.pathname === '/reset-password' || location.pathname === '/tutor-application' || location.pathname.startsWith('/tutor/') || location.pathname.startsWith('/tutor-availability/');

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/become-a-tutor" element={<BecomeATutor />} />
        <Route path="/tutor-application" element={<TutorApplicationForm />} />
        <Route path="/find-tutor" element={<FindTutor />} />
        <Route path="/tutors-listing" element={<FindTutor />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="/tutor-availability/:id" element={<TutorAvailability />} />
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