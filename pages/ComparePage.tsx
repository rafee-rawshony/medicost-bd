
import React, { useState, useMemo } from 'react';
import { getHospitals, getDoctors, getTests } from '../data/adminData';
import type { Hospital, Doctor, Test } from '../types';
import ComparisonColumn from '../components/ComparisonColumn';
import ComparisonSummary from '../components/ComparisonSummary';

export interface ComparisonState {
    selectedHospitalId: number | null;
    selectedDoctor: Doctor | null;
    selectedTests: Test[];
    searchTerm: string;
    selectedSpecialization: string;
}

const initialComparisonState: ComparisonState = {
    selectedHospitalId: null,
    selectedDoctor: null,
    selectedTests: [],
    searchTerm: '',
    selectedSpecialization: 'All',
};

const ComparePage: React.FC = () => {
    // Get all data once
    const allHospitals = useMemo(() => getHospitals(), []);
    const allDoctors = useMemo(() => getDoctors(), []);
    const allTests = useMemo(() => getTests(), []);

    const [option1, setOption1] = useState<ComparisonState>({ ...initialComparisonState, selectedHospitalId: allHospitals[0]?.id ?? null });
    const [option2, setOption2] = useState<ComparisonState>({ ...initialComparisonState, selectedHospitalId: allHospitals[1]?.id ?? allHospitals[0]?.id ?? null });

    const totalCost1 = useMemo(() => {
        const doctorFee = option1.selectedDoctor?.fee ?? 0;
        const testsTotal = option1.selectedTests.reduce((acc, test) => acc + test.cost, 0);
        return doctorFee + testsTotal;
    }, [option1.selectedDoctor, option1.selectedTests]);

    const totalCost2 = useMemo(() => {
        const doctorFee = option2.selectedDoctor?.fee ?? 0;
        const testsTotal = option2.selectedTests.reduce((acc, test) => acc + test.cost, 0);
        return doctorFee + testsTotal;
    }, [option2.selectedDoctor, option2.selectedTests]);

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">Compare Costs Side-by-Side</h1>
                <p className="text-md sm:text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                    Select two different options to see a detailed breakdown of their estimated costs. You can compare doctors and tests from the same or different hospitals.
                </p>
            </div>
            
            <ComparisonSummary 
                option1={{...option1, totalCost: totalCost1, hospital: allHospitals.find(h => h.id === option1.selectedHospitalId)}}
                option2={{...option2, totalCost: totalCost2, hospital: allHospitals.find(h => h.id === option2.selectedHospitalId)}}
            />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ComparisonColumn
                    title="Option 1"
                    state={option1}
                    onStateChange={setOption1}
                    allHospitals={allHospitals}
                    allDoctors={allDoctors}
                    allTests={allTests}
                />
                <ComparisonColumn
                    title="Option 2"
                    state={option2}
                    onStateChange={setOption2}
                    allHospitals={allHospitals}
                    allDoctors={allDoctors}
                    allTests={allTests}
                />
            </div>
        </div>
    );
};

export default ComparePage;
