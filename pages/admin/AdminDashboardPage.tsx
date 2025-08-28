import React from 'react';
import { getHospitals, getDoctors, getTests, getLoggedInUser, getUsers } from '../../data/adminData';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: number | string; link?: string; bgColor: string; borderColor: string; }> = ({ title, value, link, bgColor, borderColor }) => {
  const content = (
    <div className={`p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 ${borderColor} ${bgColor}`}>
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-5xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
  return link ? <Link to={link} className="block">{content}</Link> : <div className="block">{content}</div>;
};

const QuickAction: React.FC<{ title: string; link: string; description: string; }> = ({ title, link, description }) => (
    <Link to={link} className="block p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary transition-all duration-200">
        <h4 className="font-bold text-primary-dark">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
    </Link>
);


const AdminDashboardPage: React.FC = () => {
    const user = getLoggedInUser();

    const isHospitalUser = user?.role === 'hospital';
    const isSuperAdmin = user?.role === 'superadmin';
    
    let hospitalName = '';
    let doctorCount = 0;
    let testCount = 0;
    
    // Links for hospital user's stat cards
    let doctorLink = '/admin/hospitals';
    let testLink = '/admin/hospitals';

    if (isHospitalUser && user.hospitalId) {
        hospitalName = getHospitals().find(h => h.id === user.hospitalId)?.name ?? 'Your';
        doctorCount = getDoctors().filter(d => d.hospitalId === user.hospitalId).length;
        testCount = getTests().filter(t => t.hospitalId === user.hospitalId).length;
        doctorLink = `/admin/hospitals/${user.hospitalId}/doctors`;
        testLink = `/admin/hospitals/${user.hospitalId}/tests`;
    }

    const welcomeMessage = isHospitalUser
        ? `Welcome to the ${hospitalName} Portal`
        : `Welcome back, ${user?.username}!`;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{welcomeMessage}</h1>
            <p className="text-gray-500 mb-8">Here's a summary of the system's status.</p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {!isHospitalUser && (
                    <StatCard title="Total Hospitals" value={getHospitals().length} link="/admin/hospitals" bgColor="bg-blue-50" borderColor="border-blue-500" />
                )}
                 {isSuperAdmin && (
                    <StatCard title="System Users" value={getUsers().length} link="/admin/users" bgColor="bg-yellow-50" borderColor="border-yellow-500" />
                )}
                 {isHospitalUser && (
                     <>
                        <StatCard title="Your Doctors" value={doctorCount} link={doctorLink} bgColor="bg-green-50" borderColor="border-green-500" />
                        <StatCard title="Your Tests" value={testCount} link={testLink} bgColor="bg-indigo-50" borderColor="border-indigo-500" />
                     </>
                 )}
            </div>

            {/* Quick Actions for Admins */}
            {!isHospitalUser && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <QuickAction title="Add New Hospital" description="Onboard a new healthcare facility." link="/admin/hospitals/new" />
                        {isSuperAdmin && <QuickAction title="Manage Users" description="Add or edit system administrators." link="/admin/users" />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;