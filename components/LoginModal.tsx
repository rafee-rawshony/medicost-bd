import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../data/adminData';
import { useAuthModal } from '../context/AuthModalContext';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuthModal();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Reset form state when modal opens/closes
    if (!isLoginModalOpen) {
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isLoginModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = login(username, password);
    if (user && user.role !== 'superadmin') {
      closeLoginModal();
      navigate('/admin');
    } else {
      setError('Invalid credentials or access level for this portal.');
    }
  };

  if (!isLoginModalOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={closeLoginModal}
        role="dialog"
        aria-modal="true"
    >
        <div 
            className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transform animate-scale-in"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-700">Manager & Hospital Login</h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                <div>
                    <label htmlFor="username-modal" className="text-sm font-bold text-gray-600 block">Username</label>
                    <input
                        id="username-modal"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        autoComplete="username"
                    />
                </div>
                <div>
                    <label htmlFor="password-modal" className="text-sm font-bold text-gray-600 block">Password</label>
                    <input
                        id="password-modal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        autoComplete="current-password"
                    />
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
                <p>Super Admin? <a href="/#/superadmin" className="font-medium text-secondary-dark hover:underline">Login here</a>.</p>
            </div>
        </div>
        <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.2s ease-out; }
            .animate-scale-in { animation: scale-in 0.2s ease-out; }
        `}</style>
    </div>
  );
};

export default LoginModal;
