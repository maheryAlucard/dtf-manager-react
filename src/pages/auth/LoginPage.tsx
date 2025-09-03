import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
    }
  }
  
  return (
    <div className="flex justify-center items-center bg-gray-50 min-w-full min-h-screen">
      <div className="space-y-8 bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600 p-4 rounded-xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
          </div>
          <h2 className="font-bold text-gray-900 text-2xl">DTF Manager</h2>
          <p className="text-gray-500 text-sm">Direct-to-Film Production Suite</p>
        </div>

        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          {/* Username/Email Field */}
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Nom d'utilisateur ou Email
            </label>
            <div className="relative shadow-sm mt-1 rounded-md">
              <input
                type="text"
                className="block shadow-sm px-3 py-3 border border-gray-300 focus:border-cyan-500 rounded-md focus:outline-none focus:ring-cyan-500 w-full appearance-none placeholder-gray-400"
                placeholder="Entrer votre nom d'utilisateur ou email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Mot de passe
            </label>
            <div className="relative shadow-sm mt-1 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                className="block shadow-sm px-3 py-3 border border-gray-300 focus:border-cyan-500 rounded-md focus:outline-none focus:ring-cyan-500 w-full appearance-none placeholder-gray-400"
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="border-gray-300 rounded focus:ring-cyan-500 w-4 h-4 text-cyan-600"
              />
              <label htmlFor="remember-me" className="block ml-2 text-gray-700 text-sm">
                Se souvenir de moi
              </label>
            </div>
            <div className="text-sm">
              <a href="/forgot-password" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} className="font-medium text-cyan-600 hover:text-cyan-500">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 px-4 py-3 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full font-medium text-white text-sm disabled:cursor-not-allowed"
            >
              <span className="left-0 absolute inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-2 text-red-600 text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Create Account Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Vous n'avez pas de compte?{' '}
            <a href="/register-setup" onClick={(e) => { e.preventDefault(); navigate('/register-setup'); }} className="font-medium text-cyan-600 hover:text-cyan-500">
              Créer un nouveau compte
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-gray-500 text-xs text-center">
          <p>© 2024 DTF Manager. Tous droits réservés.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-700">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-700">Conditions d'utilisation</a>
            <a href="#" className="hover:text-gray-700">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;