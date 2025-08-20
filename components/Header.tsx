import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const navLinkClasses = "text-gray-700 hover:text-primary-dark font-semibold transition-colors duration-200 text-lg";
  const activeNavLinkClasses = "text-primary-dark underline underline-offset-4";

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center" aria-label="Go to homepage">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <h1 className="text-3xl font-bold text-primary-dark ml-3">MediCost BD</h1>
        </Link>

        <nav className="w-full md:w-auto mt-4 md:mt-0">
          <ul className="flex items-center justify-center md:justify-end space-x-4 sm:space-x-6">
            <li>
              <NavLink to="/hospitals" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="View hospitals">
                Hospitals
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="About MediCost BD">
                About
              </NavLink>
            </li>
            <li>
              <Link to="/appointment">
                <button className="bg-primary text-white font-bold py-2 px-5 rounded-full hover:bg-primary-dark transition-colors duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5" aria-label="Book an appointment">
                  Appointment
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
