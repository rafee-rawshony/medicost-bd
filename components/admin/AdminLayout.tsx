import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../../data/adminData';
import { HomeIcon, HospitalIcon, UsersIcon, MedKitIcon, TestTubeIcon, BuildingIcon, LogoutIcon, GlobeIcon } from './Icons';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) return null; // Should be handled by ProtectedRoute

  const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200";
  const activeNavLinkClasses = "bg-primary text-white hover:bg-primary-dark";

  const isHospitalUser = user.role === 'hospital';
  const isSuperAdmin = user.role === 'superadmin';
  const isAdminOrSuper = user.role === 'admin' || user.role === 'superadmin';

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 text-center border-b border-gray-700">
          <Link to="/admin" className="text-2xl font-bold text-white">MediCost</Link>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
        <nav className="px-4 py-6 flex-grow">
          <ul className="space-y-2">
            <li><NavLink to="/admin" end className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><HomeIcon />Dashboard</NavLink></li>
            
            {isAdminOrSuper && (
                <li><NavLink to="/admin/hospitals" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><HospitalIcon />Hospitals</NavLink></li>
            )}
            
            {isHospitalUser && (
              <>
                <li><NavLink to={`/admin/hospitals/edit/${user.hospitalId}`} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><BuildingIcon />My Hospital</NavLink></li>
                <li><NavLink to={`/admin/hospitals/${user.hospitalId}/doctors`} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><MedKitIcon />My Doctors</NavLink></li>
                <li><NavLink to={`/admin/hospitals/${user.hospitalId}/tests`} className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><TestTubeIcon />My Tests</NavLink></li>
              </>
            )}

            {isSuperAdmin && (
              <li><NavLink to="/admin/users" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}><UsersIcon />Users</NavLink></li>
            )}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
            <Link to="/" className="flex items-center justify-center w-full px-4 py-2 text-gray-300 rounded-lg border border-gray-600 hover:bg-gray-700 hover:text-white transition-colors duration-200 mb-2">
                <GlobeIcon /> Public Site
            </Link>
            <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 text-red-400 rounded-lg border border-red-800 hover:bg-red-900/50 hover:text-white transition-colors duration-200">
                <LogoutIcon /> Logout
            </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col">
          {/* Top Header */}
          <header className="bg-white shadow-sm p-4 flex justify-end items-center">
              <div className="text-right">
                  <p className="font-semibold text-gray-800">{user.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role} Access</p>
              </div>
          </header>
          {/* Page Content */}
          <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full h-full">
                <Outlet />
            </div>
          </main>
      </div>
    </div>
  );
};

export default AdminLayout;
