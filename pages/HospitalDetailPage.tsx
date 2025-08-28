
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHospitals } from '../data/adminData';

const HospitalDetailPage: React.FC = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const hospitals = getHospitals();
  const hospital = hospitals.find(h => h.id === Number(hospitalId));

  if (!hospital) {
    return (
      <div className="text-center container mx-auto p-4 md:p-6 lg:p-8" style={{minHeight: 'calc(100vh - 200px)'}}>
        <h1 className="text-4xl font-bold text-primary-dark">404 - Hospital Not Found</h1>
        <p className="text-lg mt-4 text-gray-600">The hospital you are looking for does not exist.</p>
        <Link to="/hospitals" className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-all duration-300">
          Back to Hospitals List
        </Link>
      </div>
    );
  }

  const websitePreviewUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(hospital.website)}?w=800&h=500`;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:grid md:grid-cols-3">
          <div className="md:col-span-1">
            <img
              src={websitePreviewUrl}
              alt={`${hospital.name} website preview`}
              className="w-full h-64 md:h-full object-cover object-top bg-gray-200"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/800x500.png/14b8a6/ffffff?text=${encodeURIComponent(hospital.name)}`;
                e.currentTarget.onerror = null;
              }}
            />
          </div>
          <div className="p-8 md:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-2">{hospital.name}</h1>
            <p className="text-gray-600 flex items-center mb-6 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {hospital.location}
            </p>

            <p className="text-gray-700 mb-6 text-base">{hospital.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-xl border-b pb-2">Key Specialties:</h3>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map(specialty => (
                  <span key={specialty} className="bg-primary-light/50 text-primary-dark text-sm font-semibold px-3 py-1 rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-xl">Contact Information</h3>
                <div className="space-y-3 text-gray-700">
                    <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.024 11.024 0 005.175 5.175l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                        <a href={`tel:${hospital.contact}`} className="hover:text-primary">{hospital.contact}</a>
                    </p>
                    <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>
                        <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-secondary-dark hover:text-secondary-darker font-medium transition-colors">
                            Visit Website
                        </a>
                    </p>
                </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/hospitals" className="w-full sm:w-auto text-center px-6 py-3 rounded-full font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-300">
                    Back to List
                </Link>
                <Link to={`/?hospitalId=${hospital.id}`} className="w-full sm:w-auto text-center px-6 py-3 rounded-full font-bold text-white bg-primary hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Go to Cost Calculator
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;