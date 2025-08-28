
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../data/adminData';
import { useAuthModal } from '../context/AuthModalContext';

// --- Icon Components for the new design ---

const LogoIcon: React.FC<{ className?: string }> = ({ className = "h-10 w-10 text-primary" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm-1 14H8v-3H5v-2h3V8h2v3h3v2h-3v3z"/>
    </svg>
);

const CalendarIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className = "h-7 w-7" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className = "h-7 w-7" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Icons for Mobile Nav
const NavIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="mr-4 w-6 h-6">{children}</span>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const { openLoginModal } = useAuthModal();

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClasses = "relative px-1 py-2 text-base font-semibold text-gray-700 transition-colors duration-300 hover:text-primary-dark after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full";
  const activeNavLinkClasses = "text-primary-dark after:w-full";

  const mobileNavLinkClasses = "flex items-center w-full px-4 py-3 text-lg font-semibold text-gray-700 rounded-lg hover:bg-primary-light transition-colors duration-200";
  const mobileActiveNavLinkClasses = "bg-primary-light text-primary-dark";

  return (
    <>
      <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center" aria-label="Go to homepage">
            <LogoIcon />
            <h1 className="text-3xl font-bold text-primary-dark ml-3">MediCost</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/hospitals" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="View hospitals">
              Hospitals
            </NavLink>
            <NavLink to="/compare" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="Compare costs">
              Compare
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="About MediCost">
              About
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} aria-label="Go to Dashboard">
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="px-4 py-2 text-base font-semibold text-red-600 rounded-lg hover:bg-red-50 transition-colors" aria-label="Logout">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={openLoginModal} className="px-4 py-2 text-base font-semibold text-primary-dark rounded-lg hover:bg-primary-light/50 transition-colors" aria-label="Login">
                Login
              </button>
            )}
            <Link to="/appointment">
              <button className="flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" aria-label="Book an appointment">
                <CalendarIcon />
                Appointment
              </button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="font-bold text-primary-dark text-xl">Menu</h2>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
        </div>
        <nav className='p-4'>
          <ul className="space-y-2">
            <li><NavLink to="/" end className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg></NavIcon>Home</NavLink></li>
            <li><NavLink to="/hospitals" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6v-1a6 6 0 00-9-5.197" /></svg></NavIcon>Hospitals</NavLink></li>
            <li><NavLink to="/compare" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.354-6.044-.994m10.5-11.458c-1.218-.34-2.474-.6-3.75-.793l-2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.354-6.044-.994M5.25 4.97c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.354-6.044-.994" /></svg></NavIcon>Compare</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg></NavIcon>About</NavLink></li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
           <Link to="/appointment" className="mb-4 block">
              <button className="flex items-center justify-center w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-lg" aria-label="Book an appointment">
                <CalendarIcon />
                Appointment
              </button>
            </Link>
            {user ? (
                <div className="space-y-2">
                    <NavLink to="/admin" className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? mobileActiveNavLinkClasses : ''}`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M3.75 3h16.5M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008h-.008V6z" /></svg></NavIcon>Dashboard</NavLink>
                    <button onClick={handleLogout} className={`${mobileNavLinkClasses} !text-red-600 !font-bold hover:!bg-red-50`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg></NavIcon>Logout</button>
                </div>
            ) : (
                <button onClick={openLoginModal} className={`${mobileNavLinkClasses} w-full`}><NavIcon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H9" /></svg></NavIcon>Login</button>
            )}
        </div>
      </div>
    </>
  );
};

export default Header;
