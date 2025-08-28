
import React, { useMemo, useCallback } from 'react';
import type { Hospital, Doctor, Test } from '../types';
import type { ComparisonState } from '../pages/ComparePage';
import HospitalSelector from './HospitalSelector';
import DoctorList from './DoctorList';
import TestList from './TestList';

interface ComparisonColumnProps {
    title: string;
    state: ComparisonState;
    onStateChange: React.Dispatch<React.SetStateAction<ComparisonState>>;
    allHospitals: Hospital[];
    allDoctors: Doctor[];
    allTests: Test[];
}

const ComparisonColumn: React.FC<ComparisonColumnProps> = ({ title, state, onStateChange, allHospitals, allDoctors, allTests }) => {
    
    const handleHospitalSearchChange = useCallback((term: string) => {
        onStateChange(prev => ({ ...prev, searchTerm: term }));
    }, [onStateChange]);

    const handleSelectHospital = useCallback((id: number) => {
        onStateChange({
            selectedHospitalId: id,
            selectedDoctor: null,
            selectedTests: [],
            searchTerm: '',
            selectedSpecialization: 'All',
        });
    }, [onStateChange]);

    const handleSelectDoctor = useCallback((doctor: Doctor) => {
        onStateChange(prev => ({
            ...prev,
            selectedDoctor: prev.selectedDoctor?.id === doctor.id ? null : doctor
        }));
    }, [onStateChange]);

    const handleToggleTest = useCallback((test: Test) => {
        onStateChange(prev => ({
            ...prev,
            selectedTests: prev.selectedTests.some(t => t.id === test.id)
                ? prev.selectedTests.filter(t => t.id !== test.id)
                : [...prev.selectedTests, test]
        }));
    }, [onStateChange]);
    
    const handleSpecializationChange = useCallback((spec: string) => {
        onStateChange(prev => ({
            ...prev,
            selectedSpecialization: spec,
            selectedDoctor: null
        }));
    }, [onStateChange]);

    const filteredHospitals = useMemo(() => {
        if (!state.searchTerm) return allHospitals;
        const lowercasedTerm = state.searchTerm.toLowerCase();
        return allHospitals.filter(h =>
            h.name.toLowerCase().includes(lowercasedTerm) ||
            h.location.toLowerCase().includes(lowercasedTerm)
        );
    }, [state.searchTerm, allHospitals]);

    const availableSpecializations = useMemo(() => {
        if (!state.selectedHospitalId) return [];
        const specializationsForHospital = allDoctors
            .filter(d => d.hospitalId === state.selectedHospitalId)
            .map(d => d.specialization);
        return ['All', ...[...new Set(specializationsForHospital)].sort()];
    }, [state.selectedHospitalId, allDoctors]);

    const filteredDoctors = useMemo(() => {
        if (!state.selectedHospitalId) return [];
        let doctorsForHospital = allDoctors.filter(d => d.hospitalId === state.selectedHospitalId);
        if (state.selectedSpecialization !== 'All') {
            doctorsForHospital = doctorsForHospital.filter(d => d.specialization === state.selectedSpecialization);
        }
        return doctorsForHospital;
    }, [state.selectedHospitalId, state.selectedSpecialization, allDoctors]);

    const filteredTests = useMemo(() => {
        if (!state.selectedHospitalId) return [];
        return allTests.filter(t => t.hospitalId === state.selectedHospitalId);
    }, [state.selectedHospitalId, allTests]);

    const selectedHospital = useMemo(() => {
        return allHospitals.find(h => h.id === state.selectedHospitalId) || null;
    }, [state.selectedHospitalId, allHospitals]);
      
    return (
        <div className="space-y-6 bg-white/60 p-4 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-center text-2xl font-bold text-primary-dark">{title}</h2>
            
            <HospitalSelector
                hospitals={filteredHospitals}
                selectedHospitalId={state.selectedHospitalId}
                onSelectHospital={handleSelectHospital}
                searchTerm={state.searchTerm}
                onSearchChange={handleHospitalSearchChange}
            />

            {selectedHospital ? (
                <>
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2 pl-1">Select a Doctor</h3>
                        <DoctorList
                            doctors={filteredDoctors}
                            selectedDoctor={state.selectedDoctor}
                            onSelectDoctor={handleSelectDoctor}
                            specializations={availableSpecializations}
                            selectedSpecialization={state.selectedSpecialization}
                            onSpecializationChange={handleSpecializationChange}
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2 pl-1">Add Medical Tests</h3>
                        <TestList
                            tests={filteredTests}
                            selectedTests={state.selectedTests}
                            onToggleTest={handleToggleTest}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
                    <p>Please select a hospital to continue.</p>
                </div>
            )}
        </div>
    );
};

export default ComparisonColumn;
