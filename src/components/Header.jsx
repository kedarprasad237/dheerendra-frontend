import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 cursor-pointer focus:outline-none bg-transparent border-0 p-0"
            >
              <img
                src="/vmss-logo.svg"
                alt="VMSS Technologies logo"
                className="h-10 w-10 object-contain"
                loading="lazy"
              />
              <span className="text-xl md:text-2xl font-bold text-blue-600">
                VMSS TECHNOLOGIES
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('instructors')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Instructors
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search training programs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              onClick={() => navigate('/admin/login') }
              className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2"
            >
              Login
            </button>
           
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection('instructors')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Instructors
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact
              </button>
              <div className="pt-4 border-t">
                <input
                  type="text"
                  placeholder="Search training programs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={() => navigate('/admin/login') }
                  className="flex-1 text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  Login
                </button>
            
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

