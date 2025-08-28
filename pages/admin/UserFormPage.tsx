import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, addUser, updateUser, getLoggedInUser, getHospitals } from '../../data/adminData';
import type { UserRole } from '../../types';

const UserFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();
  const isEditing = Boolean(id);
  const hospitals = getHospitals();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin' as UserRole,
    hospitalId: undefined as number | undefined,
  });
  
  useEffect(() => {
    if (loggedInUser?.role !== 'superadmin') {
      alert('Access Denied');
      navigate('/admin');
      return;
    }
    if (isEditing && id) {
      const user = getUserById(Number(id));
      if (user) {
        setFormData({
            username: user.username,
            password: '', // Password should not be pre-filled
            role: user.role,
            hospitalId: user.hospitalId
        });
      }
    }
  }, [id, isEditing, loggedInUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRole = e.target.value as UserRole;
      setFormData(prev => ({
          ...prev,
          role: newRole,
          hospitalId: newRole === 'hospital' ? (prev.hospitalId || hospitals[0]?.id) : undefined,
      }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In edit mode, if password is blank, we should not update it.
    // In a real app, we'd fetch the user again and merge. Here we can simulate.
    let passwordToSave = formData.password;
    if (isEditing && !passwordToSave) {
        const existingUser = getUserById(Number(id));
        passwordToSave = existingUser?.password ?? '';
    }

    if (!passwordToSave) {
        alert("Password is required.");
        return;
    }

    const userData = {
        ...formData,
        password: passwordToSave,
        hospitalId: formData.role === 'hospital' ? Number(formData.hospitalId) : undefined,
    };

    if (isEditing && id) {
      updateUser({ ...userData, id: Number(id) });
    } else {
      addUser(userData);
    }
    navigate('/admin/users');
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 hover:border-primary";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{isEditing ? 'Edit User' : 'Add New User'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-8 border border-gray-200 rounded-lg bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={inputClasses} required={!isEditing} placeholder={isEditing ? "Leave blank to keep current" : ""}/>
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" id="role" value={formData.role} onChange={handleRoleChange} className={inputClasses} required>
                        <option value="admin">Admin</option>
                        <option value="hospital">Hospital</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                {formData.role === 'hospital' && (
                    <div>
                        <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700">Link to Hospital</label>
                        <select name="hospitalId" id="hospitalId" value={formData.hospitalId} onChange={handleChange} className={inputClasses} required>
                            <option value="" disabled>-- Select a hospital --</option>
                            {hospitals.map(h => (
                            <option key={h.id} value={h.id}>{h.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
        <div className="flex items-center space-x-4">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
            {isEditing ? 'Update User' : 'Save User'}
          </button>
          <Link to="/admin/users" className="text-gray-600 hover:underline">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default UserFormPage;
