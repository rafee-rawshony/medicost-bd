
import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getHospitals, getDoctors, getTests } from '../data/adminData';
import type { Hospital, Doctor, Test } from '../types';
import HospitalSelector from '../components/HospitalSelector';
import DoctorList from '../components/DoctorList';
import TestList from '../components/TestList';
import CostCalculator from '../components/CostCalculator';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Get data on each render to reflect potential admin changes
  const hospitals = getHospitals();
  const doctors = getDoctors();
  const tests = getTests();

  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(() => {
    const hospitalIdFromUrl = searchParams.get('hospitalId');
    if (hospitalIdFromUrl) {
      const id = parseInt(hospitalIdFromUrl, 10);
      if (!isNaN(id) && hospitals.some(h => h.id === id)) {
        return id;
      }
    }
    return hospitals[0]?.id ?? null;
  });
  
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');

  const handleSelectHospital = useCallback((id: number) => {
    setSelectedHospitalId(id);
    setSelectedDoctor(null);
    setSelectedTests([]);
    setSelectedSpecialization('All'); // Reset specialization filter on new hospital
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
  
  const handleSpecializationChange = useCallback((spec: string) => {
    setSelectedSpecialization(spec);
    setSelectedDoctor(null); // Deselect doctor when changing filter
  }, []);

  const filteredHospitals = useMemo(() => {
    if (!searchTerm) return hospitals;
    const lowercasedTerm = searchTerm.toLowerCase();
    return hospitals.filter(h =>
      h.name.toLowerCase().includes(lowercasedTerm) ||
      h.location.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, hospitals]);

  const availableSpecializations = useMemo(() => {
    if (!selectedHospitalId) return [];
    const specializationsForHospital = doctors
        .filter(d => d.hospitalId === selectedHospitalId)
        .map(d => d.specialization);
    // Return a unique, sorted list with 'All' at the beginning
    // FIX: Replaced Array.from with spread syntax for better type inference to resolve `unknown[]` type error.
    return ['All', ...[...new Set(specializationsForHospital)].sort()];
  }, [selectedHospitalId, doctors]);

  const filteredDoctors = useMemo(() => {
    if (!selectedHospitalId) return [];
    let doctorsForHospital = doctors.filter(d => d.hospitalId === selectedHospitalId);
    if (selectedSpecialization !== 'All') {
        doctorsForHospital = doctorsForHospital.filter(d => d.specialization === selectedSpecialization);
    }
    return doctorsForHospital;
  }, [selectedHospitalId, selectedSpecialization, doctors]);

  const filteredTests = useMemo(() => {
    if (!selectedHospitalId) return [];
    return tests.filter(t => t.hospitalId === selectedHospitalId);
  }, [selectedHospitalId, tests]);

  const selectedHospital = useMemo(() => {
    return hospitals.find(h => h.id === selectedHospitalId) || null;
  }, [selectedHospitalId, hospitals]);
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <CostCalculator
        selectedDoctor={selectedDoctor}
        selectedTests={selectedTests}
      />
      <div className="mt-8">
        <HospitalSelector
          hospitals={filteredHospitals}
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={handleSelectHospital}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
              specializations={availableSpecializations}
              selectedSpecialization={selectedSpecialization}
              onSpecializationChange={handleSpecializationChange}
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