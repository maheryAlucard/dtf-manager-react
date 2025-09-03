import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous implémenteriez la logique pour envoyer un lien de réinitialisation
    // Pour l'instant, nous simulons juste une réponse réussie
    alert(`Un lien de réinitialisation a été envoyé à ${email}`);
  };

  const handleBackToSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 w-full min-h-screen">
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

        <div className="text-center">
          <h3 className="font-bold text-gray-900 text-xl">Réinitialiser Votre Mot de Passe</h3>
          <p className="mt-2 text-gray-500 text-sm">
            Entrez votre adresse email ou nom d'utilisateur et nous vous enverrons
            un lien pour réinitialiser votre mot de passe
          </p>
        </div>

        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          {/* Email/Username Field */}
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Adresse Email ou Nom d'utilisateur
            </label>
            <div className="relative shadow-sm mt-1 rounded-md">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block shadow-sm px-3 py-3 border border-gray-300 focus:border-cyan-500 rounded-md focus:outline-none focus:ring-cyan-500 w-full appearance-none placeholder-gray-400"
                placeholder="Entrer votre email ou nom d'utilisateur"
                required
              />
              <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          {/* Send Reset Link Button */}
          <div>
            <button
              type="submit"
              className="group relative flex justify-center bg-cyan-600 hover:bg-cyan-700 px-4 py-3 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full font-medium text-white text-sm"
            >
              <span className="left-0 absolute inset-y-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-cyan-500 group-hover:text-cyan-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              Envoyer le Lien de Réinitialisation
            </button>
          </div>
        </form>

        {/* Back to Sign In */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Vous vous souvenez de votre mot de passe?{' '}
            <button
              onClick={handleBackToSignIn}
              className="font-medium text-cyan-600 hover:text-cyan-500"
            >
              Retour à la Connexion
            </button>
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

export default ForgotPasswordPage;