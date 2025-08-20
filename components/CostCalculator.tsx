import React from 'react';
import type { Doctor, Test } from '../types';

interface CostCalculatorProps {
  selectedDoctor: Doctor | null;
  selectedTests: Test[];
}

const CostCalculator: React.FC<CostCalculatorProps> = ({ selectedDoctor, selectedTests }) => {
  const doctorFee = selectedDoctor?.fee ?? 0;
  const testsTotal = selectedTests.reduce((acc, test) => acc + test.cost, 0);
  const totalCost = doctorFee + testsTotal;

  const formatCurrency = (amount: number) => {
    return `৳ ${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-primary sticky top-4 z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cost Estimate</h2>
      <div className="space-y-3 text-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Doctor's Consultation Fee:</span>
          <span className={`font-semibold ${selectedDoctor ? 'text-secondary-dark' : 'text-gray-400'}`}>
            {formatCurrency(doctorFee)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Medical Tests ({selectedTests.length}):</span>
          <span className={`font-semibold ${testsTotal > 0 ? 'text-secondary-dark' : 'text-gray-400'}`}>
            {formatCurrency(testsTotal)}
          </span>
        </div>

        {/* Selected Tests Breakdown */}
        <div className="pl-4 border-l-2 border-secondary-light/50 ml-2 max-h-36 overflow-y-auto custom-scrollbar">
          {selectedTests.length > 0 ? (
            <ul className="space-y-1 py-1 pr-2">
              {selectedTests.map(test => (
                <li key={test.id} className="flex justify-between items-center text-sm text-gray-700">
                  <span className="truncate pr-2">{test.name}</span>
                  <span className="font-medium whitespace-nowrap">{formatCurrency(test.cost)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic py-1">No tests added yet.</p>
          )}
        </div>

        <div className="border-t border-gray-200 my-3 !mt-4"></div>
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className="text-primary-dark">Total Estimated Cost:</span>
          <span className="text-primary">{formatCurrency(totalCost)}</span>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;