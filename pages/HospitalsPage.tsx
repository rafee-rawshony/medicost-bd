
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getHospitals } from '../data/adminData';
import type { Hospital } from '../types';

type SortKey = 'name' | 'location';
type SortDirection = 'asc' | 'desc';

const HospitalsPage: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const hospitals = getHospitals();

  const filteredAndSortedHospitals = useMemo(() => {
    const filtered = hospitals.filter(h =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [sortConfig, searchTerm, hospitals]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4 text-center">Our Partner Hospitals</h1>
      <p className="text-md sm:text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Explore our network of trusted hospitals. Click on a card to learn more about their services and specialties.
      </p>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
            aria-label="Search hospitals"
        />
        <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 hidden sm:inline">Sort by:</span>
            <button
              onClick={() => handleSort('name')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${sortConfig.key === 'name' ? 'bg-primary text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Name {getSortIndicator('name')}
            </button>
            <button
              onClick={() => handleSort('location')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${sortConfig.key === 'location' ? 'bg-primary text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Location {getSortIndicator('location')}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedHospitals.map(hospital => (
          <Link key={hospital.id} to={`/hospitals/${hospital.id}`} className="block h-full">
            <HospitalCard hospital={hospital} />
          </Link>
        ))}
      </div>
    </div>
  );
};


const HospitalCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
  const websitePreviewUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(hospital.website)}?w=400&h=250`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
      <img 
        src={websitePreviewUrl} 
        alt={`${hospital.name} website preview`} 
        className="w-full h-48 object-cover object-top bg-gray-200"
        onError={(e) => {
          // In case the screenshot service fails, show a placeholder
          e.currentTarget.src = `https://via.placeholder.com/400x250.png/14b8a6/ffffff?text=${encodeURIComponent(hospital.name)}`;
          e.currentTarget.onerror = null;
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-secondary-dark mb-2">{hospital.name}</h2>
        <p className="text-gray-600 flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {hospital.location}
        </p>
        <p className="text-gray-700 mb-4 text-sm flex-grow">{hospital.description}</p>
        
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Key Specialties:</h3>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map(specialty => (
              <span key={specialty} className="bg-primary-light/50 text-primary-dark text-xs font-semibold px-2.5 py-1 rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-auto">
          <p className="text-sm text-gray-600 flex items-center mb-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.024 11.024 0 005.175 5.175l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            {hospital.contact}
          </p>
          <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-dark hover:text-secondary-darker font-medium flex items-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
};


export default HospitalsPage;