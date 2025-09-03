import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Upload, Plus } from 'lucide-react';

const ClientProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'payments'>('orders');

  const handleBackClick = () => {
    navigate('/dashboard/clients');
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleBackClick} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <ArrowLeft className="mr-2 w-5 h-5" />
          Retour aux clients
        </button>
        <div className="flex space-x-3">
          <button className="flex items-center bg-blue-600 hover:bg-cyan-700 shadow-md px-4 py-2 rounded-lg text-white transition-colors duration-200">
            <Edit className="mr-2 w-5 h-5" />
            Modifier le client
          </button>
          <button className="flex items-center bg-gray-200 hover:bg-gray-300 shadow-md px-4 py-2 rounded-lg text-gray-800 transition-colors duration-200">
            <Upload className="mr-2 w-5 h-5" />
            Exporter les données
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="gap-8 grid grid-cols-3">
        {/* Left Column: Client Details */}
        <div className="space-y-6 col-span-1">
          {/* Personal Information Card */}
          <div className="bg-white shadow-lg p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="flex flex-shrink-0 justify-center items-center bg-primary-100 rounded-full w-12 h-12 font-bold text-primary-800 text-xl">J</div>
              <div className="ml-4">
                <h2 className="font-semibold text-gray-900 text-xl">John Smith</h2>
                <p className="text-gray-600 text-sm">Acme Corp</p>
                <span className="flex items-center mt-1 text-green-600 text-sm">
                  <span className="bg-green-500 mr-2 rounded-full w-2 h-2"></span>
                  Actif
                </span>
              </div>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center text-sm">
                <Mail className="mr-3 w-5 h-5 text-gray-500" />
                john@acmecorp.com
              </p>
              <p className="flex items-center text-sm">
                <Phone className="mr-3 w-5 h-5 text-gray-500" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-start text-sm">
                <MapPin className="flex-shrink-0 mr-3 w-5 h-5 text-gray-500" />
                123 Business Ave, Suite 100<br />New York, NY 10001
              </p>
              <p className="flex items-center text-sm">
                <Calendar className="mr-3 w-5 h-5 text-gray-500" />
                Client depuis le 15 Jan, 2023
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="gap-4 grid grid-cols-2">
            <div className="bg-white shadow-lg p-5 rounded-xl text-center">
              <p className="font-bold text-gray-900 text-2xl">12</p>
              <p className="text-gray-600 text-sm">COMMANDES TOTALES</p>
            </div>
            <div className="bg-white shadow-lg p-5 rounded-xl text-center">
              <p className="font-bold text-gray-900 text-2xl">Ar2450.75</p>
              <p className="text-gray-600 text-sm">TOTAL DÉPENSÉ</p>
            </div>
          </div>

          {/* Outstanding Balance Card */}
          <div className="bg-white shadow-lg p-6 rounded-xl text-center">
            <p className="font-bold text-green-600 text-3xl">Ar0.00</p>
            <p className="text-gray-600 text-sm">SOLDE IMPAYÉ</p>
            <p className="mt-1 text-green-500 text-sm">Payé</p>
          </div>
        </div>

        {/* Right Column: Client Activity */}
        <div className="space-y-6 col-span-2">
          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h2 className="mb-4 font-semibold text-gray-800 text-xl">Activité du client</h2>
            <div className="flex mb-4 border-gray-200 border-b">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-4 text-sm font-medium ${activeTab === 'orders'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Historique des commandes
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-2 px-4 text-sm font-medium ${activeTab === 'payments'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Historique des paiements
              </button>
            </div>

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 text-lg">Commandes récentes</h3>
                  <button className="flex items-center bg-primary hover:bg-cyan-700 shadow-md px-3 py-1 rounded-lg text-white text-sm transition-colors duration-200">
                    <Plus className="mr-2 w-4 h-4" />
                    Nouvelle commande
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Order Item */}
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="mr-3 font-medium text-gray-900">ORD-1234</span>
                        <span className="bg-green-100 mr-2 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Terminé</span>
                        <span className="bg-green-100 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Payé</span>
                      </div>
                      <p className="text-gray-700 text-sm">T-shirts personnalisés (50 pcs)</p>
                      <p className="text-gray-500 text-xs">15 Jan, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 text-base">Ar275.00</p>
                      <a href="#" className="text-primary hover:text-cyan-700 text-sm">Voir les détails</a>
                    </div>
                  </div>
                  {/* Order Item */}
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="mr-3 font-medium text-gray-900">ORD-1233</span>
                        <span className="bg-green-100 mr-2 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Terminé</span>
                        <span className="bg-green-100 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Payé</span>
                      </div>
                      <p className="text-gray-700 text-sm">Hoodies (25 pcs)</p>
                      <p className="text-gray-500 text-xs">10 Jan, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 text-base">Ar450.00</p>
                      <a href="#" className="text-primary hover:text-cyan-700 text-sm">Voir les détails</a>
                    </div>
                  </div>
                  {/* Order Item */}
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="mr-3 font-medium text-gray-900">ORD-1232</span>
                        <span className="bg-green-100 mr-2 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Terminé</span>
                        <span className="bg-green-100 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Payé</span>
                      </div>
                      <p className="text-gray-700 text-sm">Débardeurs (30 pcs)</p>
                      <p className="text-gray-500 text-xs">5 Jan, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 text-base">Ar180.00</p>
                      <a href="#" className="text-primary hover:text-cyan-700 text-sm">Voir les détails</a>
                    </div>
                  </div>
                  {/* Order Item */}
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="mr-3 font-medium text-gray-900">ORD-1231</span>
                        <span className="bg-green-100 mr-2 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Terminé</span>
                        <span className="bg-green-100 px-2.5 py-0.5 rounded-full font-medium text-green-800 text-xs">Payé</span>
                      </div>
                      <p className="text-gray-700 text-sm">Chemises à manches longues (40 pcs)</p>
                      <p className="text-gray-500 text-xs">28 Déc, 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 text-base">Ar320.00</p>
                      <a href="#" className="text-primary hover:text-cyan-700 text-sm">Voir les détails</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div>
                <h3 className="mb-4 font-semibold text-gray-800 text-lg">Historique des paiements</h3>
                <p className="text-gray-600">Contenu de l'historique des paiements...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;