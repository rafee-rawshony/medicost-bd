import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClasses = "px-4 py-2 rounded-full text-lg font-medium text-gray-600 hover:bg-gray-100 hover:text-primary-dark transition-all duration-300";
  const activeNavLinkClasses = "bg-primary-light text-primary-dark";
  
  const mobileNavLinkClasses = "block text-center text-3xl font-bold text-gray-700 hover:text-primary-dark py-4 transition-colors duration-300";
  const mobileActiveNavLinkClasses = "text-primary";

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center" aria-label="Go to homepage">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl font-bold text-primary-dark ml-3">MediCost</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-2">
              <li>
                <NavLink to="/hospitals" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="View hospitals">
                  Hospitals
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="About MediCost">
                  About
                </NavLink>
              </li>
              <li>
                <Link to="/appointment">
                  <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ml-2" aria-label="Book an appointment">
                    Appointment
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-6">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close menu"
            >
              <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-16">
          <ul className="space-y-6">
            <li>
              <NavLink to="/" end className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/hospitals" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}>Hospitals</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}>About</NavLink>
            </li>
            <li>
              <Link to="/appointment" className="mt-8 block">
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-2xl" aria-label="Book an appointment">
                  Appointment
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
