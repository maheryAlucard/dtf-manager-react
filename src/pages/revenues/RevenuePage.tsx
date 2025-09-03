import React from 'react';

const RevenuePage: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-3xl">Analyse des revenus</h1>
          <p className="text-gray-600">Suivez les revenus, les dépenses et la performance financière</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 shadow px-4 py-2 rounded-lg text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Exporter les données
          </button>
          <div className="flex bg-white shadow-sm p-1 rounded-lg">
            <button className="bg-gray-200 px-3 py-1 rounded-md font-medium text-gray-700 text-sm">Mensuel</button>
            <button className="px-3 py-1 font-medium text-gray-500 hover:text-gray-700 text-sm">Annuel</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="gap-6 grid grid-cols-3 mb-6">
        {/* Revenue vs Expenses Chart */}
        <div className="col-span-2 bg-white shadow-lg p-6 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-xl">Revenus vs Dépenses</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="flex items-center text-gray-600 text-sm">
              <span className="block bg-green-500 mr-2 rounded-full w-3 h-3"></span> Revenus
            </span>
            <span className="flex items-center text-gray-600 text-sm">
              <span className="block bg-red-500 mr-2 rounded-full w-3 h-3"></span> Dépenses
            </span>
          </div>
          <div className="flex justify-center items-center bg-white border border-gray-200 rounded-lg h-64 text-gray-500">
            {/* Placeholder for a professional chart component */}
            <p>Graphique mensuel/annuel des revenus et dépenses</p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-4 col-span-1">
          <h2 className="mb-2 font-semibold text-gray-800 text-xl">Résumé Financier</h2>
          {/* Total Revenue Card */}
          <div className="bg-green-50 shadow-sm p-5 rounded-xl">
            <p className="font-medium text-green-700 text-sm">REVENUS TOTAUX</p>
            <p className="mt-1 font-bold text-green-800 text-3xl">14,151.50 Ar</p>
            <p className="text-green-600 text-sm">Ce mois-ci</p>
          </div>
          {/* Total Expenses Card */}
          <div className="bg-red-50 shadow-sm p-5 rounded-xl">
            <p className="font-medium text-red-700 text-sm">DÉPENSES TOTALES</p>
            <p className="mt-1 font-bold text-red-800 text-3xl">8,750.25 Ar</p>
            <p className="text-red-600 text-sm">Ce mois-ci</p>
          </div>
          {/* Net Profit Card */}
          <div className="bg-blue-600 shadow-lg p-5 rounded-xl text-white">
            <p className="font-medium text-blue-200 text-sm">BÉNÉFICE NET</p>
            <p className="mt-1 font-bold text-4xl">5,401.25 Ar</p>
            <p className="text-blue-200 text-sm">Ce mois-ci</p>
            <p className="mt-2 text-blue-300 text-xs">↑ +61.7% par rapport aux dépenses</p>
          </div>
          {/* Quick Stats Card */}
          <div className="bg-white shadow-sm p-5 rounded-xl">
            <h3 className="mb-3 font-semibold text-gray-800 text-lg">Statistiques Rapides</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Factures Payées</span>
                <span className="font-medium text-gray-900">5 sur 6</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Montant en Attente</span>
                <span className="font-medium text-orange-600">1,650.75 Ar</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Facture Moyenne</span>
                <span className="font-medium text-gray-900">2,358.58 Ar</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Marge Bénéficiaire</span>
                <span className="font-medium text-green-600">38.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Revenue List */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <h2 className="font-semibold text-gray-800 text-xl">Revenus des Factures</h2>
        </div>
        <table className="divide-y divide-gray-200 min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">ID Facture</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">Client</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">Montant</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">Statut</th>
              <th scope="col" className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">Articles</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Placeholder Rows */}
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">INV-2024-001</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">2024-01-15</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">PrintShop Pro</td>
              <td className="px-6 py-4 text-green-600 text-sm whitespace-nowrap">2,450.00 Ar</td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">Payée</span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">DTF Film Rolls, Pigm...</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">INV-2024-002</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">2024-01-14</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">Creative Designs Ltd</td>
              <td className="px-6 py-4 text-green-600 text-sm whitespace-nowrap">1,875.50 Ar</td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">Payée</span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">DTF Powder, Producti...</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">INV-2024-003</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">2024-01-13</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">Local T-Shirt Co</td>
              <td className="px-6 py-4 text-green-600 text-sm whitespace-nowrap">3,200.00 Ar</td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">Payée</span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">Bulk DTF Transfer Pr...</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">INV-2024-004</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">2024-01-12</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">Fashion Forward</td>
              <td className="px-6 py-4 text-orange-600 text-sm whitespace-nowrap">1,650.75 Ar</td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <span className="inline-flex bg-orange-100 px-2 rounded-full font-semibold text-orange-800 text-xs leading-5">En attente</span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">Custom DTF Prints</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenuePage;