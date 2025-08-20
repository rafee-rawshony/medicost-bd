
import React from 'react';
import type { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, isSelected, onSelect }) => {
  const baseClasses = "bg-white rounded-xl shadow-md p-5 border-2 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl";
  const selectedClasses = "border-primary ring-2 ring-primary-light";
  const unselectedClasses = "border-transparent hover:border-primary-light";

  return (
    <div className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`} onClick={() => onSelect(doctor)}>
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-bold text-primary-dark">{doctor.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{doctor.title}</p>
        <div className="my-3">
          <span className="inline-block bg-secondary-light text-secondary-dark text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {doctor.specialization}
          </span>
        </div>
        <div className="mt-auto pt-3 text-right">
          <p className="text-lg font-semibold text-gray-800">Fee: <span className="text-secondary text-xl">৳ {doctor.fee.toLocaleString('en-IN')}</span></p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
