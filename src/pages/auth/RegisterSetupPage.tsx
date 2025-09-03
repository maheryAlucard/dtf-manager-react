import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterSetupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle account creation logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 w-full min-h-screen font-inter">
      <div className="bg-white shadow-lg my-8 p-8 rounded-xl w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8L12 14L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h2 className="font-bold text-gray-800 text-2xl">DTF Manager</h2>
          <p className="mt-1 text-gray-500 text-sm">Direct-to-Film Production Suite</p>
        </div>

        <h3 className="mb-6 font-semibold text-xl text-center">Créer Votre Compte</h3>

        <p className="mb-6 text-gray-600 text-sm text-center">
          Rejoignez DTF Manager pour simplifier votre flux de production
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm" htmlFor="fullName">Nom Complet</label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Entrez votre nom complet"
                  className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 w-full"
                  required
                />
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm" htmlFor="email">Adresse Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Entrez votre adresse email"
                  className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 w-full"
                  required
                />
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm" htmlFor="username">Nom d'utilisateur</label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choisissez un nom d'utilisateur"
                  className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 w-full"
                  required
                />
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm" htmlFor="password">Mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Créez un mot de passe sécurisé"
                  className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 w-full"
                  required
                />
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm" htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  className="px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 w-full"
                  required
                />
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="border-gray-300 rounded focus:ring-cyan-500 w-4 h-4 text-cyan-600"
                required
              />
              <label htmlFor="terms" className="block ml-2 text-gray-700 text-sm">
                J'accepte les Conditions d'utilisation et la Politique de confidentialité
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="flex justify-center bg-cyan-600 hover:bg-cyan-700 shadow-sm mt-6 px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full font-medium text-white text-sm transition-colors duration-200"
          >
            Créer un compte
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte? {' '}
            <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-500 transition-colors duration-200">
              Retour à la connexion
            </Link>
          </p>
        </div>

        <div className="mt-8 text-gray-500 text-xs text-center">
          © 2024 DTF Manager. Tous droits réservés.
        </div>
      </div>
    </div>
  );
};

export default RegisterSetupPage;