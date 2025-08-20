import React from 'react';
import type { Test } from '../types';

interface TestItemProps {
  test: Test;
  isSelected: boolean;
  onToggle: (test: Test) => void;
}

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


const TestItem: React.FC<TestItemProps> = ({ test, isSelected, onToggle }) => {
  const baseClasses = "flex items-center justify-between w-full p-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out border-2";
  
  const stateClasses = isSelected
    ? "bg-primary-light/50 border-primary shadow-md"
    : "bg-white border-gray-200 hover:border-secondary hover:shadow-sm";

  return (
    <div
      onClick={() => onToggle(test)}
      className={`${baseClasses} ${stateClasses}`}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(test); }}
    >
      <div className="flex items-center overflow-hidden">
        {/* Custom Checkbox */}
        <div 
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${isSelected ? 'bg-primary border-primary' : 'border-gray-400 bg-white'}`}
        >
          {isSelected && <CheckIcon />}
        </div>
        
        <span className="ml-4 text-md text-gray-800 font-medium truncate pr-2">{test.name}</span>
      </div>
      <span className="font-bold text-primary-dark whitespace-nowrap pl-4">
        ৳ {test.cost.toLocaleString('en-IN')}
      </span>
    </div>
  );
};

export default TestItem;