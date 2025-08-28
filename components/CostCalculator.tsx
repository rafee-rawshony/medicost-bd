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
      
      <div className="space-y-4">
        {/* Selected Doctor Block */}
        {selectedDoctor && (
          <div className="p-4 bg-primary-light/20 rounded-lg border-l-4 border-primary">
              <h3 className="font-bold text-primary-dark text-lg">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
          </div>
        )}

        <div className="flex justify-between items-center text-lg">
          <span className="text-gray-600">Doctor's Fee:</span>
          <span className={`font-semibold ${doctorFee > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
            {formatCurrency(doctorFee)}
          </span>
        </div>

        {/* Medical Tests Block: Combines total and scrollable list for clarity */}
        <div className="p-4 bg-secondary-light/20 rounded-lg border-l-4 border-secondary">
          <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-secondary-dark text-lg">Medical Tests ({selectedTests.length})</h3>
              <p className={`text-xl font-bold ${testsTotal > 0 ? 'text-secondary-dark' : 'text-gray-400'}`}>
                  {formatCurrency(testsTotal)}
              </p>
          </div>
          <div className="max-h-36 overflow-y-auto custom-scrollbar pr-2">
              {selectedTests.length > 0 ? (
                  <ul className="space-y-1 text-gray-700">
                      {selectedTests.map(test => (
                          <li key={test.id} className="flex justify-between items-center text-base">
                              <span className="truncate pr-2">{test.name}</span>
                              <span className="font-semibold whitespace-nowrap">{formatCurrency(test.cost)}</span>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-base text-gray-500 italic">No tests selected.</p>
              )}
          </div>
        </div>
        
        <div className="border-t-2 border-primary-light my-4 !mt-6"></div>

        <div className="text-center p-4 bg-primary-light/30 rounded-lg">
          <p className="text-lg font-semibold text-primary-dark mb-1">Total Estimated Cost</p>
          <p className="text-5xl font-extrabold text-primary drop-shadow-sm">{formatCurrency(totalCost)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;