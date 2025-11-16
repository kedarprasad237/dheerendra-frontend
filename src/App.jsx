import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ExploreServices from './components/ExploreServices';
import Instructors from './components/Instructors';
import WhyChooseUs from './components/WhyChooseUs';
import TrustedBy from './components/TrustedBy';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ExploreServices />
      <Instructors />
      <WhyChooseUs />
      <TrustedBy />
      <ContactUs />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

