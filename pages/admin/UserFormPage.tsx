
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, addUser, updateUser, getLoggedInUser, getHospitals } from '../../data/adminData';
import type { UserRole } from '../../types';

const EyeIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
  </svg>
);

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
  const [showPassword, setShowPassword] = useState(false);
  
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
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${inputClasses} pr-10`}
                            required={!isEditing}
                            placeholder={isEditing ? "Leave blank to keep current" : ""}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
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
