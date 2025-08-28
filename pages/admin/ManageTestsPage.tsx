import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTests, deleteTest, getHospitalById } from '../../data/adminData';
import type { Test } from '../../types';
import { EditIcon, DeleteIcon } from '../../components/admin/Icons';

const ManageTestsPage: React.FC = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [tests, setTests] = useState<Test[]>([]);
  const [hospitalName, setHospitalName] = useState('');

  const hospitalIdNum = Number(hospitalId);
  
  useEffect(() => {
    const hospital = getHospitalById(hospitalIdNum);
    if (hospital) {
        setHospitalName(hospital.name);
        setTests(getTests().filter(t => t.hospitalId === hospitalIdNum));
    }
  }, [hospitalIdNum]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      deleteTest(id);
      setTests(getTests().filter(t => t.hospitalId === hospitalIdNum));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">
                Manage Medical Tests
            </h1>
            <p className="text-lg text-gray-600">For: <span className="font-semibold">{hospitalName}</span></p>
        </div>
        <Link
          to={`/admin/hospitals/${hospitalId}/tests/new`}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <span>&#43;</span>
          <span>Add New Test</span>
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/4">Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tests.map(test => (
              <tr key={test.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 px-6">{test.name}</td>
                <td className="py-4 px-6 whitespace-nowrap">৳ {test.cost.toLocaleString()}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <Link to={`/admin/hospitals/${hospitalId}/tests/edit/${test.id}`} className="text-blue-600 hover:text-blue-900" title="Edit Test"><EditIcon /></Link>
                    <button onClick={() => handleDelete(test.id)} className="text-red-600 hover:text-red-900" title="Delete Test"><DeleteIcon /></button>
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

export default ManageTestsPage;
