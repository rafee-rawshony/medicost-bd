import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHospitals, deleteHospital, getLoggedInUser } from '../../data/adminData';
import type { Hospital } from '../../types';
import { EditIcon, DeleteIcon, MedKitIcon, TestTubeIcon } from '../../components/admin/Icons';

const ManageHospitalsPage: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const user = getLoggedInUser();

  useEffect(() => {
    const allHospitals = getHospitals();
    if (user?.role === 'hospital') {
      setHospitals(allHospitals.filter(h => h.id === user.hospitalId));
    } else {
      setHospitals(allHospitals);
    }
  }, [user]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this hospital and all its associated doctors and tests?')) {
      deleteHospital(id);
      setHospitals(getHospitals());
    }
  };

  const isHospitalUser = user?.role === 'hospital';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isHospitalUser ? 'My Hospital Information' : 'Manage Hospitals'}
        </h1>
        {!isHospitalUser && (
          <Link
            to="/admin/hospitals/new"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <span>&#43;</span>
            <span>Add New Hospital</span>
          </Link>
        )}
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hospitals.map(hospital => (
              <tr key={hospital.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 px-6 whitespace-nowrap">{hospital.name}</td>
                <td className="py-4 px-6 whitespace-nowrap">{hospital.location}</td>
                <td className="py-4 px-6 whitespace-nowrap">{hospital.contact}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <Link to={`/admin/hospitals/edit/${hospital.id}`} className="text-blue-600 hover:text-blue-900" title="Edit Hospital Details"><EditIcon /></Link>
                    {!isHospitalUser && (
                      <>
                        <Link to={`/admin/hospitals/${hospital.id}/doctors`} className="text-green-600 hover:text-green-900" title="Manage Doctors"><MedKitIcon /></Link>
                        <Link to={`/admin/hospitals/${hospital.id}/tests`} className="text-indigo-600 hover:text-indigo-900" title="Manage Tests"><TestTubeIcon /></Link>
                        <button onClick={() => handleDelete(hospital.id)} className="text-red-600 hover:text-red-900" title="Delete Hospital"><DeleteIcon /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHospitalsPage;
