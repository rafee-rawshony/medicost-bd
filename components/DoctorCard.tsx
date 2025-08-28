import React from 'react';
import type { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, isSelected, onSelect }) => {
  // baseClasses ensures consistent structure, size, and border width to prevent layout shifts.
  const baseClasses = "flex justify-between items-center w-full rounded-lg p-4 cursor-pointer transition-all duration-300 ease-in-out border-2 min-h-[120px]";

  // stateClasses defines the visual appearance for selected and unselected states.
  // The selected state has a more prominent, solid background and border without increasing its size.
  const stateClasses = isSelected
    ? "bg-primary-light border-primary shadow-md"
    : "bg-white border-gray-200 hover:border-secondary hover:shadow-sm";

  return (
    <div 
      className={`${baseClasses} ${stateClasses}`}
      onClick={() => onSelect(doctor)}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(doctor); }}
    >
      <div>
        <h3 className="text-lg font-bold text-primary-dark">{doctor.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{doctor.title}</p>
        <span className="inline-block bg-secondary/20 text-secondary-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
          {doctor.specialization}
        </span>
      </div>
      <div className="text-right pl-4 flex-shrink-0">
        <p className="text-md font-semibold text-gray-700">Fee</p>
        <p className="text-secondary-dark text-xl font-bold">৳ {doctor.fee.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

export default DoctorCard;