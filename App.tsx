import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HospitalsPage from './pages/HospitalsPage';
import AboutPage from './pages/AboutPage';
import AppointmentPage from './pages/AppointmentPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-primary-light/30 font-sans text-gray-800 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="*" element={
                <div className="text-center container mx-auto p-4 md:p-6 lg:p-8" style={{minHeight: 'calc(100vh - 200px)'}}>
                    <h1 className="text-4xl font-bold text-primary-dark">404 - Page Not Found</h1>
                    <p className="text-lg mt-4 text-gray-600">The page you are looking for does not exist.</p>
                </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
