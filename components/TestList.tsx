import React from 'react';
import type { Test } from '../types';
import TestItem from './TestItem';

interface TestListProps {
  tests: Test[];
  selectedTests: Test[];
  onToggleTest: (test: Test) => void;
}

const TestList: React.FC<TestListProps> = ({ tests, selectedTests, onToggleTest }) => {
  if (tests.length === 0) {
    return (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <p>No tests found for the selected hospital.</p>
        </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
      <div className="space-y-3">
        {tests.map((test) => (
          <TestItem
            key={test.id}
            test={test}
            isSelected={selectedTests.some(t => t.id === test.id)}
            onToggle={onToggleTest}
          />
        ))}
      </div>
    </div>
  );
};

export default TestList;