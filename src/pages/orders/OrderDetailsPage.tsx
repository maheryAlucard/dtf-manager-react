import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Shirt, Paintbrush, Film, Edit, Download } from 'lucide-react';

const OrderDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard/orders');
  };

  const orderStatus = 'Terminé'; // This would come from actual order data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente':
        return 'text-yellow-600 bg-yellow-100';
      case 'En cours':
        return 'text-blue-600 bg-blue-100';
      case 'Terminé':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTimelineIcon = (status: string, stepStatus: string) => {
    if (status === 'Terminé' && (stepStatus === 'Terminé' || stepStatus === 'En cours')) {
      return <CheckCircle className="text-emerald-500" size={20} />;
    }
    if (stepStatus === 'En cours') {
      return <Circle className="text-blue-500" size={20} />;
    }
    if (stepStatus === 'En attente') {
      return <Circle className="text-yellow-500" size={20} />;
    }
    return <Circle className="text-gray-400" size={20} />;
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleBackClick} className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200">
          <ArrowLeft size={20} className="mr-2" />
          <span>Retour aux commandes</span>
        </button>
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderStatus)}`}>
            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${orderStatus === 'Terminé' ? 'bg-emerald-500' : orderStatus === 'En cours' ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>
            {orderStatus}
          </span>
          <button className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 shadow-md px-4 py-2 rounded-lg text-white transition-colors duration-200">
            <Edit size={18} />
            <span>Modifier la commande</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-100 shadow-sm px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors duration-200">
            <Download size={18} />
            <span>Exporter la facture</span>
          </button>
        </div>
      </div>

      <h1 className="mb-8 font-extrabold text-gray-900 text-4xl">Commande #1247</h1>

      <div className="gap-8 grid grid-cols-3">
        {/* Left Column */}
        <div className="space-y-8 col-span-2">
          {/* Order Items */}
          <div className="bg-white shadow-xl p-6 rounded-xl">
            <h2 className="mb-6 font-bold text-gray-900 text-2xl">Articles de la commande</h2>
            <p className="mb-6 text-gray-600">Détail de tous les articles de cette commande</p>
            <div className="space-y-4">
              {/* Item Row */}
              <div className="flex justify-between items-center pb-4 border-gray-200 border-b">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Film size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Rouleau de film DTF</p>
                    <p className="text-gray-500 text-sm">Film DTF de qualité supérieure pour transferts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <p className="text-gray-700">5 rouleaux</p>
                  <p className="text-gray-700">12,50 €</p>
                  <p className="font-bold text-gray-900">62,50 €</p>
                </div>
              </div>
              {/* Item Row */}
              <div className="flex justify-between items-center pb-4 border-gray-200 border-b">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Paintbrush size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Cartouche d'encre blanche</p>
                    <p className="text-gray-500 text-sm">Encre blanche haute opacité pour impression DTF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <p className="text-gray-700">2 cartouches</p>
                  <p className="text-gray-700">45,00 €</p>
                  <p className="font-bold text-gray-900">90,00 €</p>
                </div>
              </div>
              {/* Item Row */}
              <div className="flex justify-between items-center pb-4 border-gray-200 border-b">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Paintbrush size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">Jeu d'encres CMJN</p>
                    <p className="text-gray-500 text-sm">Jeu complet de cartouches d'encre CMJN</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <p className="text-gray-700">1 jeu</p>
                  <p className="text-gray-700">120,00 €</p>
                  <p className="font-bold text-gray-900">120,00 €</p>
                </div>
              </div>
              {/* Item Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Shirt size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">T-shirts en coton (Moyen)</p>
                    <p className="text-gray-500 text-sm">T-shirts en coton de qualité supérieure pour l'impression</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <p className="text-gray-700">50 pièces</p>
                  <p className="text-gray-700">8,50 €</p>
                  <p className="font-bold text-gray-900">425,00 €</p>
                </div>
              </div>
            </div>
          </div>

          {/* Production Timeline */}
          <div className="bg-white shadow-xl p-6 rounded-xl">
            <h2 className="mb-6 font-bold text-gray-900 text-2xl">Chronologie de production</h2>
            <p className="mb-6 text-gray-600">Suivez la progression de cette commande tout au long de la production</p>
            <div className="space-y-6">
              {/* Timeline Item */}
              <div className="flex items-start space-x-4">
                {getTimelineIcon(orderStatus, 'Terminé')}
                <div>
                  <p className="font-semibold text-gray-900">Commande reçue</p>
                  <p className="text-gray-500 text-sm">15 janv. 2024 - 9:30</p>
                </div>
              </div>
              {/* Timeline Item */}
              <div className="flex items-start space-x-4">
                {getTimelineIcon(orderStatus, 'En cours')}
                <div>
                  <p className="font-semibold text-gray-900">Production commencée</p>
                  <p className="text-gray-500 text-sm">16 janv. 2024 - 8:00</p>
                </div>
              </div>
              {/* Timeline Item */}
              <div className="flex items-start space-x-4">
                {getTimelineIcon(orderStatus, 'En cours')}
                <div>
                  <p className="font-semibold text-gray-900">Impression terminée</p>
                  <p className="text-gray-500 text-sm">17 janv. 2024 - 15:45</p>
                </div>
              </div>
              {/* Timeline Item */}
              <div className="flex items-start space-x-4">
                {getTimelineIcon(orderStatus, 'Terminé')}
                <div>
                  <p className="font-semibold text-gray-900">Contrôle qualité</p>
                  <p className="text-gray-500 text-sm">18 janv. 2024 - 10:15</p>
                </div>
              </div>
              {/* Timeline Item */}
              <div className="flex items-start space-x-4">
                {getTimelineIcon(orderStatus, 'Terminé')}
                <div>
                  <p className="font-semibold text-gray-900">Commande expédiée</p>
                  <p className="text-gray-500 text-sm">18 janv. 2024 - 16:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8 col-span-1">
          {/* Client Information */}
          <div className="bg-white shadow-xl p-6 rounded-xl">
            <h2 className="mb-6 font-bold text-gray-900 text-2xl">Informations client</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">NOM DU CLIENT</p>
                <p className="font-semibold text-gray-900">Acme Corp</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">EMAIL</p>
                <p className="font-semibold text-blue-700">orders@acmecorp.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">TÉLÉPHONE</p>
                <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">ADRESSE</p>
                <p className="font-semibold text-gray-900">123 Business Ave, Suite 100, New York, NY 10001</p>
              </div>
            </div>
            <button className="hover:bg-blue-50 mt-6 px-4 py-2 border border-gray-300 rounded-lg w-full text-blue-700 transition-colors duration-200">
              Contacter le client
            </button>
          </div>

          {/* Order Details */}
          <div className="bg-white shadow-xl p-6 rounded-xl">
            <h2 className="mb-6 font-bold text-gray-900 text-2xl">Détails de la commande</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-500">DATE DE COMMANDE</p>
                <p className="font-semibold text-gray-900">15 janv. 2024</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">DATE D'ÉCHÉANCE</p>
                <p className="font-semibold text-gray-900">20 janv. 2024</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">DATE DE FIN</p>
                <p className="font-semibold text-gray-900">18 janv. 2024</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">STATUT DE PAIEMENT</p>
                <p className="flex items-center font-semibold text-emerald-600">
                  <span className="bg-emerald-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Payé
                </p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white shadow-xl p-6 rounded-xl">
            <h2 className="mb-6 font-bold text-gray-900 text-2xl">Détail des coûts</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-700">Matériaux</p>
                <p className="font-semibold text-gray-900">697,50 €</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Main d'œuvre</p>
                <p className="font-semibold text-gray-900">150,00 €</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Frais généraux</p>
                <p className="font-semibold text-gray-900">75,00 €</p>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-gray-200 border-t">
                <p className="text-gray-700">Sous-total</p>
                <p className="font-semibold text-gray-900">922,50 €</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Taxe (8%)</p>
                <p className="font-semibold text-gray-900">73,80 €</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-gray-200 border-t">
                <p className="font-bold text-gray-900 text-xl">Total</p>
                <p className="font-extrabold text-gray-900 text-xl">996,30 €</p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-6 font-medium text-emerald-600">
              <CheckCircle size={20} className="mr-2" />
              <span>Paiement reçu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;