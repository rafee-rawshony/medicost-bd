import React from 'react';
import type { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  specializations: string[];
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ 
  doctors, 
  selectedDoctor, 
  onSelectDoctor,
  specializations,
  selectedSpecialization,
  onSpecializationChange 
}) => {
  const showFilter = specializations.length > 1;

  if (specializations.length === 0) {
    return (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <p>No doctors found for the selected hospital.</p>
        </div>
    );
  }
  
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-4 md:p-6">
      {showFilter && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 pl-1">Filter by Specialization</h3>
          <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar-x">
            {specializations.map(spec => (
              <button
                key={spec}
                onClick={() => onSpecializationChange(spec)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm whitespace-nowrap ${
                  selectedSpecialization === spec
                    ? 'bg-primary text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
        {doctors.length > 0 ? (
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                isSelected={selectedDoctor?.id === doctor.id}
                onSelect={onSelectDoctor}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No doctors found for this specialization.</p>
            <p className="text-sm mt-1">Please select another filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;