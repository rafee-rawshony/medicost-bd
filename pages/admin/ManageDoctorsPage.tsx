import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoctors, deleteDoctor, getHospitalById } from '../../data/adminData';
import type { Doctor } from '../../types';
import { EditIcon, DeleteIcon } from '../../components/admin/Icons';

const ManageDoctorsPage: React.FC = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitalName, setHospitalName] = useState('');
  
  const hospitalIdNum = Number(hospitalId);

  useEffect(() => {
    const hospital = getHospitalById(hospitalIdNum);
    if (hospital) {
      setHospitalName(hospital.name);
      setDoctors(getDoctors().filter(d => d.hospitalId === hospitalIdNum));
    }
  }, [hospitalIdNum]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      deleteDoctor(id);
      setDoctors(getDoctors().filter(d => d.hospitalId === hospitalIdNum));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
            Manage Doctors
            </h1>
            <p className="text-lg text-gray-600">For: <span className="font-semibold">{hospitalName}</span></p>
        </div>
        <Link
          to={`/admin/hospitals/${hospitalId}/doctors/new`}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <span>&#43;</span>
          <span>Add New Doctor</span>
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map(doctor => (
              <tr key={doctor.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 px-6 whitespace-nowrap">{doctor.name}</td>
                <td className="py-4 px-6 whitespace-nowrap">{doctor.specialization}</td>
                <td className="py-4 px-6 whitespace-nowrap">৳ {doctor.fee.toLocaleString()}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <Link to={`/admin/hospitals/${hospitalId}/doctors/edit/${doctor.id}`} className="text-blue-600 hover:text-blue-900" title="Edit Doctor"><EditIcon /></Link>
                    <button onClick={() => handleDelete(doctor.id)} className="text-red-600 hover:text-red-900" title="Delete Doctor"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <div className="mt-6">
          <Link to="/admin/hospitals" className="text-secondary-dark hover:underline">
            &larr; Back to Hospitals List
          </Link>
        </div>
    </div>
  );
};

export default ManageDoctorsPage;
