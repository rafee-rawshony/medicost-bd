
import React from 'react';
import type { Hospital } from '../types';

interface HospitalSelectorProps {
  hospitals: Hospital[];
  selectedHospitalId: number | null;
  onSelectHospital: (id: number) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const HospitalSelector: React.FC<HospitalSelectorProps> = ({ hospitals, selectedHospitalId, onSelectHospital, searchTerm, onSearchChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <label htmlFor="hospital-select" className="block text-xl font-semibold text-gray-700 mb-4">
            Select a Hospital
        </label>
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out text-lg"
                aria-label="Search for a hospital"
            />
            <select
                id="hospital-select"
                value={selectedHospitalId ?? ''}
                onChange={(e) => onSelectHospital(Number(e.target.value))}
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out text-lg"
            >
                <option value="" disabled>-- Choose a hospital --</option>
                {hospitals.length > 0 ? (
                    hospitals.map((hospital) => (
                        <option key={hospital.id} value={hospital.id}>
                            {hospital.name} - {hospital.location}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No hospitals found</option>
                )}
            </select>
        </div>
    </div>
  );
};

export default HospitalSelector;
