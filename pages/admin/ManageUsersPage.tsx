import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, getLoggedInUser, getHospitals } from '../../data/adminData';
import type { User } from '../../types';
import { EditIcon, DeleteIcon } from '../../components/admin/Icons';

const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const hospitals = getHospitals();
  const hospitalMap = new Map(hospitals.map(h => [h.id, h.name]));
  
  useEffect(() => {
    if (user?.role !== 'superadmin') {
      alert('Access Denied');
      navigate('/admin');
      return;
    }
    setUsers(getUsers());
  }, [user, navigate]);

  const handleDelete = (id: number) => {
    if (id === user?.id) {
        alert("You cannot delete your own account.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      setUsers(getUsers());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <Link
          to="/admin/users/new"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <span>&#43;</span>
          <span>Add New User</span>
        </Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Linked Hospital</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(u => (
              <tr key={u.id} className={`transition-colors duration-200 ${u.id === user?.id ? 'bg-primary-light/30' : 'hover:bg-gray-50'}`}>
                <td className="py-4 px-6 whitespace-nowrap">{u.username} {u.id === user?.id && <span className="text-xs text-primary-dark">(You)</span>}</td>
                <td className="py-4 px-6 whitespace-nowrap capitalize">{u.role}</td>
                <td className="py-4 px-6 whitespace-nowrap">{u.hospitalId ? hospitalMap.get(u.hospitalId) : 'N/A'}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                   <div className="flex items-center space-x-4">
                      <Link to={`/admin/users/edit/${u.id}`} className="text-blue-600 hover:text-blue-900" title="Edit User"><EditIcon /></Link>
                      <button onClick={() => handleDelete(u.id)} className={`text-red-600 ${u.id === user?.id ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-900'}`} disabled={u.id === user?.id} title={u.id === user?.id ? "Cannot delete self" : "Delete User"}><DeleteIcon /></button>
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

export default ManageUsersPage;
