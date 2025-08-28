
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../data/adminData';

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


const SuperAdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(username, password);
    if (user && user.role === 'superadmin') {
      navigate('/admin');
    } else {
      setError('Invalid Super Admin credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <Link to="/" className="flex items-center justify-center" aria-label="Go to homepage">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <h1 className="text-3xl font-bold text-primary-dark ml-3">MediCost</h1>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-gray-700">
                Super Admin Login
            </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password-input" className="text-sm font-bold text-gray-600 block">Password</label>
            <div className="relative">
                <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                required
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
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300"
            >
              Log In
            </button>
          </div>
        </form>
         <div className="text-center text-sm text-gray-500">
            <Link to="/" className="font-medium text-secondary-dark hover:underline">
                &larr; Back to Public Site
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLoginPage;
