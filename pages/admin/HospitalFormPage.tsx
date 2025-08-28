import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHospitalById, addHospital, updateHospital, getLoggedInUser, addUser, getUsers } from '../../data/adminData';

const HospitalFormPage: React.FC = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const isEditing = Boolean(hospitalId);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    contact: '',
    website: '',
    specialties: '',
    imageUrl: '',
    // Fields for the associated user account, only used on create
    accountUsername: '',
    accountPassword: '',
  });

  useEffect(() => {
    const id = Number(hospitalId);
    if (user?.role === 'hospital' && isEditing && user.hospitalId !== id) {
        alert("You are not authorized to edit this hospital.");
        navigate('/admin/hospitals');
        return;
    }

    if (isEditing && id) {
      const hospital = getHospitalById(id);
      if (hospital) {
        setFormData({
            ...formData, // Keep account fields empty
            ...hospital,
            specialties: hospital.specialties.join(', '),
        });
      }
    }
  }, [hospitalId, isEditing, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hospitalData = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        contact: formData.contact,
        website: formData.website,
        imageUrl: formData.imageUrl,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (isEditing && hospitalId) {
      updateHospital({ ...hospitalData, id: Number(hospitalId) });
       navigate('/admin/hospitals');
    } else {
      // Create new hospital AND new user
      if (!formData.accountUsername || !formData.accountPassword) {
        alert("Username and password for the hospital account are required.");
        return;
      }

      // Check for unique username
      const existingUser = getUsers().find(u => u.username === formData.accountUsername);
      if (existingUser) {
        alert("This username is already taken. Please choose another one.");
        return;
      }

      const newHospital = addHospital(hospitalData);
      addUser({
        username: formData.accountUsername,
        password: formData.accountPassword,
        role: 'hospital',
        hospitalId: newHospital.id,
      });
      navigate('/admin/hospitals');
    }
  };

  const inputClasses = "mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 hover:border-primary";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{isEditing ? 'Edit Hospital' : 'Add New Hospital'}</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hospital Details Section */}
        <div className="p-8 border border-gray-200 rounded-lg bg-white">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Hospital Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className={inputClasses} required />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} className={inputClasses} rows={3} required />
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                    <input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website URL</label>
                    <input type="url" name="website" id="website" value={formData.website} onChange={handleChange} className={inputClasses} required />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">Specialties (comma-separated)</label>
                    <input type="text" name="specialties" id="specialties" value={formData.specialties} onChange={handleChange} className={inputClasses} required />
                </div>
                 <div className="md:col-span-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className={inputClasses} />
                </div>
            </div>
        </div>

        {/* Account Creation Section - Only on !isEditing */}
        {!isEditing && (
            <div className="p-8 border border-gray-200 rounded-lg bg-white">
                 <h2 className="text-xl font-semibold text-gray-700 mb-6">Create Hospital Admin Account</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div>
                        <label htmlFor="accountUsername" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" name="accountUsername" id="accountUsername" value={formData.accountUsername} onChange={handleChange} className={inputClasses} required />
                    </div>
                     <div>
                        <label htmlFor="accountPassword" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="accountPassword" id="accountPassword" value={formData.accountPassword} onChange={handleChange} className={inputClasses} required />
                    </div>
                 </div>
            </div>
        )}

        <div className="flex items-center space-x-4 pt-4">
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
            {isEditing ? 'Update Hospital' : 'Save Hospital & Create Account'}
          </button>
          <Link to="/admin/hospitals" className="text-gray-600 hover:underline">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default HospitalFormPage;
