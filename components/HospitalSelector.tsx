
import React from 'react';
import type { Hospital } from '../types';

interface HospitalSelectorProps {
  hospitals: Hospital[];
  selectedHospitalId: number | null;
  onSelectHospital: (id: number) => void;
}

const HospitalSelector: React.FC<HospitalSelectorProps> = ({ hospitals, selectedHospitalId, onSelectHospital }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <label htmlFor="hospital-select" className="block text-xl font-semibold text-gray-700 mb-2">
            Select a Hospital
        </label>
        <select
            id="hospital-select"
            value={selectedHospitalId ?? ''}
            onChange={(e) => onSelectHospital(Number(e.target.value))}
            className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out text-lg"
        >
            <option value="" disabled>-- Choose a hospital --</option>
            {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                    {hospital.name} - {hospital.location}
                </option>
            ))}
        </select>
    </div>
  );
};

export default HospitalSelector;
