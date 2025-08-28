
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../data/adminData';
import { useAuthModal } from '../context/AuthModalContext';

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

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuthModal();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset form state when modal opens/closes
    if (!isLoginModalOpen) {
      setUsername('');
      setPassword('');
      setError('');
      setShowPassword(false);
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
                    <div className="relative">
                        <input
                            id="password-modal"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                            required
                            autoComplete="current-password"
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
