import React, { useState, useMemo, useCallback } from 'react';
import { hospitals, doctors, tests } from '../data/mockData';
import type { Hospital, Doctor, Test } from '../types';
import HospitalSelector from '../components/HospitalSelector';
import DoctorList from '../components/DoctorList';
import TestList from '../components/TestList';
import CostCalculator from '../components/CostCalculator';

const HomePage: React.FC = () => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(hospitals[0]?.id ?? null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);

  const handleSelectHospital = useCallback((id: number) => {
    setSelectedHospitalId(id);
    setSelectedDoctor(null);
    setSelectedTests([]);
  }, []);

  const handleSelectDoctor = useCallback((doctor: Doctor) => {
    setSelectedDoctor(prevDoctor => (prevDoctor?.id === doctor.id ? null : doctor));
  }, []);

  const handleToggleTest = useCallback((test: Test) => {
    setSelectedTests(prevTests =>
      prevTests.some(t => t.id === test.id)
        ? prevTests.filter(t => t.id !== test.id)
        : [...prevTests, test]
    );
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!selectedHospitalId) return [];
    return doctors.filter(d => d.hospitalId === selectedHospitalId);
  }, [selectedHospitalId]);

  const filteredTests = useMemo(() => {
    if (!selectedHospitalId) return [];
    return tests.filter(t => t.hospitalId === selectedHospitalId);
  }, [selectedHospitalId]);

  const selectedHospital = useMemo(() => {
    return hospitals.find(h => h.id === selectedHospitalId) || null;
  }, [selectedHospitalId]);
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <CostCalculator
        selectedDoctor={selectedDoctor}
        selectedTests={selectedTests}
      />
      <div className="mt-8">
        <HospitalSelector
          hospitals={hospitals}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={handleSelectHospital}
        />
      </div>

      {selectedHospital ? (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Select a Doctor
            </h2>
            <DoctorList
              doctors={filteredDoctors}
              selectedDoctor={selectedDoctor}
              onSelectDoctor={handleSelectDoctor}
            />
          </div>
          <div className="mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">
              Add Medical Tests
            </h2>
            <TestList
              tests={filteredTests}
              selectedTests={selectedTests}
              onToggleTest={handleToggleTest}
            />
          </div>
        </div>
      ) : (
        <div className="text-center mt-16">
          <p className="text-xl text-gray-500">Please select a hospital to begin.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
