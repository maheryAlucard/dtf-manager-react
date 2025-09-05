import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { resetPassword, isLoading, error } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setMessage('Token de réinitialisation manquant.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage('Token de réinitialisation manquant.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    const success = await resetPassword(token, newPassword);
    if (success) {
      setMessage('Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setMessage(error || 'Échec de la réinitialisation du mot de passe. Le jeton est peut-être invalide ou a expiré.');
    }
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
            Veuillez entrer votre nouveau mot de passe.
          </p>
        </div>

        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Nouveau Mot de Passe
            </label>
            <div className="relative shadow-sm mt-1 rounded-md">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block shadow-sm px-3 py-3 border border-gray-300 focus:border-cyan-500 rounded-md focus:outline-none focus:ring-cyan-500 w-full appearance-none placeholder-gray-400"
                placeholder="Entrer votre nouveau mot de passe"
                required
              />
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Confirmer le Nouveau Mot de Passe
            </label>
            <div className="relative shadow-sm mt-1 rounded-md">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block shadow-sm px-3 py-3 border border-gray-300 focus:border-cyan-500 rounded-md focus:outline-none focus:ring-cyan-500 w-full appearance-none placeholder-gray-400"
                placeholder="Confirmer votre nouveau mot de passe"
                required
              />
            </div>
          </div>

          {/* Reset Password Button */}
          <div>
            <button
              type="submit"
              className="group relative flex justify-center bg-cyan-600 hover:bg-cyan-700 px-4 py-3 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 w-full font-medium text-white text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le Mot de Passe'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md text-center ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

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

export default ResetPasswordPage;