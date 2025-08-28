
import React from 'react';
import type { ComparisonState } from '../pages/ComparePage';
import type { Hospital } from '../types';

interface SummaryProps {
    option1: ComparisonState & { totalCost: number, hospital?: Hospital | null };
    option2: ComparisonState & { totalCost: number, hospital?: Hospital | null };
}

const formatCurrency = (amount: number) => `৳ ${amount.toLocaleString('en-IN')}`;

const ComparisonSummary: React.FC<SummaryProps> = ({ option1, option2 }) => {

    const doctorFee1 = option1.selectedDoctor?.fee ?? 0;
    const testsTotal1 = option1.selectedTests.reduce((acc, test) => acc + test.cost, 0);

    const doctorFee2 = option2.selectedDoctor?.fee ?? 0;
    const testsTotal2 = option2.selectedTests.reduce((acc, test) => acc + test.cost, 0);

    const hasSelections = option1.totalCost > 0 || option2.totalCost > 0;
    
    if (!hasSelections) {
        return null; // Don't show the summary if nothing is selected yet.
    }

    const option1Cheaper = option1.totalCost > 0 && (option1.totalCost < option2.totalCost || option2.totalCost === 0);
    const option2Cheaper = option2.totalCost > 0 && (option2.totalCost < option1.totalCost || option1.totalCost === 0);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-primary sticky top-4 z-20">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Comparison Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                
                {/* Headers */}
                <div className="hidden md:block"></div>
                <div className="font-bold text-primary-dark text-xl p-2 rounded-t-lg bg-primary-light/50">
                    <h3>Option 1</h3>
                    <p className="text-sm font-normal text-gray-600 truncate">{option1.hospital?.name ?? 'No Hospital Selected'}</p>
                </div>
                <div className="font-bold text-primary-dark text-xl p-2 rounded-t-lg bg-primary-light/50">
                    <h3>Option 2</h3>
                    <p className="text-sm font-normal text-gray-600 truncate">{option2.hospital?.name ?? 'No Hospital Selected'}</p>
                </div>

                {/* Doctor Fee */}
                <div className="md:text-right font-semibold text-gray-600 text-lg self-center">Doctor's Fee</div>
                <div className="bg-gray-50 p-3 rounded-lg"><span className="md:hidden">Option 1: </span>{formatCurrency(doctorFee1)}</div>
                <div className="bg-gray-50 p-3 rounded-lg"><span className="md:hidden">Option 2: </span>{formatCurrency(doctorFee2)}</div>

                {/* Tests Total */}
                <div className="md:text-right font-semibold text-gray-600 text-lg self-center">Tests Total ({option1.selectedTests.length} / {option2.selectedTests.length})</div>
                <div className="bg-gray-50 p-3 rounded-lg"><span className="md:hidden">Option 1: </span>{formatCurrency(testsTotal1)}</div>
                <div className="bg-gray-50 p-3 rounded-lg"><span className="md:hidden">Option 2: </span>{formatCurrency(testsTotal2)}</div>
                
                {/* Divider */}
                <div className="col-span-1 md:col-span-3 border-t-2 border-primary-light my-2"></div>
                
                {/* Grand Total */}
                <div className="md:text-right font-bold text-primary-dark text-xl self-center">Total Estimated Cost</div>
                <div className={`p-4 rounded-lg transition-all duration-300 ${option1Cheaper ? 'bg-green-100 border-2 border-green-400' : 'bg-primary-light/30'}`}>
                    <div className="text-4xl font-extrabold text-primary">{formatCurrency(option1.totalCost)}</div>
                    {option1Cheaper && <div className="mt-1 text-sm font-bold text-green-700">Best Value</div>}
                </div>
                <div className={`p-4 rounded-lg transition-all duration-300 ${option2Cheaper ? 'bg-green-100 border-2 border-green-400' : 'bg-primary-light/30'}`}>
                    <div className="text-4xl font-extrabold text-primary">{formatCurrency(option2.totalCost)}</div>
                    {option2Cheaper && <div className="mt-1 text-sm font-bold text-green-700">Best Value</div>}
                </div>
            </div>
        </div>
    );
};

export default ComparisonSummary;
