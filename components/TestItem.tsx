
import React from 'react';
import type { Test } from '../types';

interface TestItemProps {
  test: Test;
  isSelected: boolean;
  onToggle: (test: Test) => void;
}

const TestItem: React.FC<TestItemProps> = ({ test, isSelected, onToggle }) => {
  return (
    <label htmlFor={`test-${test.id}`} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-secondary-light' : 'bg-gray-50 hover:bg-gray-100'}`}>
        <div className="flex items-center">
            <input
                id={`test-${test.id}`}
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(test)}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-4 text-md text-gray-800 font-medium">{test.name}</span>
        </div>
        <span className="font-semibold text-gray-700">৳ {test.cost.toLocaleString('en-IN')}</span>
    </label>
  );
};

export default TestItem;
