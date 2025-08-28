import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTestById, addTest, updateTest, getLoggedInUser, getHospitalById } from '../../data/adminData';

const TestFormPage: React.FC = () => {
  const { hospitalId, testId } = useParams<{ hospitalId: string, testId?: string }>();
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const isEditing = Boolean(testId);
  
  const [formData, setFormData] = useState({
    name: '',
    cost: 0,
    hospitalId: Number(hospitalId),
  });
  const [hospitalName, setHospitalName] = useState('');

  useEffect(() => {
    if (hospitalId) {
      const hospital = getHospitalById(Number(hospitalId));
      if (hospital) setHospitalName(hospital.name);
    }
    
    if (isEditing && testId) {
      const test = getTestById(Number(testId));
      if (test) {
        if (user?.role === 'hospital' && user.hospitalId !== test.hospitalId) {
            alert("You are not authorized to edit this test.");
            navigate(`/admin/hospitals/${hospitalId}/tests`);
            return;
        }
        setFormData(test);
      }
    }
  }, [hospitalId, testId, isEditing, user, navigate]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? (parseFloat(value) || 0) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const testData = { ...formData, hospitalId: Number(hospitalId) };
    if (isEditing && testId) {
      updateTest({ ...testData, id: Number(testId) });
    } else {
      addTest(testData);
    }
    navigate(`/admin/hospitals/${hospitalId}/tests`);
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 hover:border-primary";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{isEditing ? 'Edit Test' : 'Add New Test'}</h1>
       <p className="text-gray-600 mb-8">For: <span className="font-semibold">{hospitalName}</span></p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-8 border border-gray-200 rounded-lg bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Test Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost (৳)</label>
                    <input type="number" name="cost" id="cost" value={formData.cost} onChange={handleChange} className={inputClasses} required />
                </div>
            </div>
        </div>
        <div className="flex items-center space-x-4">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
            {isEditing ? 'Update Test' : 'Save Test'}
          </button>
          <Link to={`/admin/hospitals/${hospitalId}/tests`} className="text-gray-600 hover:underline">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default TestFormPage;
