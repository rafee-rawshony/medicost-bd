
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HospitalsPage from './pages/HospitalsPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import AboutPage from './pages/AboutPage';
import AppointmentPage from './pages/AppointmentPage';
import SuperAdminLoginPage from './pages/SuperAdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedProtectedRoute from './components/RoleBasedProtectedRoute';
import { AuthModalProvider } from './context/AuthModalContext';
import LoginModal from './components/LoginModal';


// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageHospitalsPage from './pages/admin/ManageHospitalsPage';
import HospitalFormPage from './pages/admin/HospitalFormPage';
import ManageDoctorsPage from './pages/admin/ManageDoctorsPage';
import DoctorFormPage from './pages/admin/DoctorFormPage';
import ManageTestsPage from './pages/admin/ManageTestsPage';
import TestFormPage from './pages/admin/TestFormPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import UserFormPage from './pages/admin/UserFormPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/superadmin" element={<SuperAdminLoginPage />} />
        
        {/* Admin Panel Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <Routes>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  
                  {/* Hospital Management (Top Level) */}
                  <Route path="hospitals" element={<ManageHospitalsPage />} />
                  <Route path="hospitals/edit/:hospitalId" element={<HospitalFormPage />} />
                  <Route path="hospitals/new" element={
                    <RoleBasedProtectedRoute allowedRoles={['superadmin', 'admin']}>
                      <HospitalFormPage />
                    </RoleBasedProtectedRoute>
                  } />

                  {/* Nested Doctor & Test Management */}
                  <Route path="hospitals/:hospitalId/doctors" element={<ManageDoctorsPage />} />
                  <Route path="hospitals/:hospitalId/doctors/new" element={<DoctorFormPage />} />
                  <Route path="hospitals/:hospitalId/doctors/edit/:doctorId" element={<DoctorFormPage />} />
                  
                  <Route path="hospitals/:hospitalId/tests" element={<ManageTestsPage />} />
                  <Route path="hospitals/:hospitalId/tests/new" element={<TestFormPage />} />
                  <Route path="hospitals/:hospitalId/tests/edit/:testId" element={<TestFormPage />} />

                  {/* Super Admin Only Routes */}
                  <Route path="users" element={
                    <RoleBasedProtectedRoute allowedRoles={['superadmin']}>
                      <ManageUsersPage />
                    </RoleBasedProtectedRoute>
                  } />
                  <Route path="users/new" element={
                    <RoleBasedProtectedRoute allowedRoles={['superadmin']}>
                      <UserFormPage />
                    </RoleBasedProtectedRoute>
                  } />
                  <Route path="users/edit/:id" element={
                    <RoleBasedProtectedRoute allowedRoles={['superadmin']}>
                      <UserFormPage />
                    </RoleBasedProtectedRoute>
                  } />
                </Route>
              </Routes>
            </ProtectedRoute>
          } 
        />

        {/* Public Site Routes */}
        <Route path="/*" element={
          <AuthModalProvider>
            <PublicSite />
          </AuthModalProvider>
        } />
      </Routes>
    </Router>
  );
};

// Component to wrap the public-facing site with its own layout
const PublicSite = () => (
  <div className="min-h-screen bg-primary-light/30 font-sans text-gray-800 flex flex-col">
    <Header />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/hospitals/:hospitalId" element={<HospitalDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="*" element={
            <div className="text-center container mx-auto p-4 md:p-6 lg:p-8" style={{minHeight: 'calc(100vh - 200px)'}}>
                <h1 className="text-4xl font-bold text-primary-dark">404 - Page Not Found</h1>
                <p className="text-lg mt-4 text-gray-600">The page you are looking for does not exist.</p>
            </div>
        } />
      </Routes>
    </main>
    <Footer />
    <LoginModal />
  </div>
);


export default App;
