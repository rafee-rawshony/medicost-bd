
import React from 'react';
import type { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, selectedDoctor, onSelectDoctor }) => {
  if (doctors.length === 0) {
    return (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <p>No doctors found for the selected hospital.</p>
        </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          isSelected={selectedDoctor?.id === doctor.id}
          onSelect={onSelectDoctor}
        />
      ))}
    </div>
  );
};

export default DoctorList;
