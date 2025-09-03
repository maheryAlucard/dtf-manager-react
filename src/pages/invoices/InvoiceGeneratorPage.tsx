import React from 'react';
import { PlusCircle, FileDown, Eye } from 'lucide-react';

const InvoiceGeneratorPage: React.FC = () => {

  const status = 'Pending'; // Example status

  return (
    <div className="flex-1 bg-gray-50 p-6 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-gray-800 text-4xl">Générateur de factures</h1>
        <p className="mt-2 text-gray-600">Créez et gérez des factures professionnelles pour vos services d'impression DTF</p>
      </div>

      {/* Main Invoice Card */}
      <div className="bg-white shadow-lg p-8 rounded-xl">
        {/* Invoice Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-gray-900 text-2xl">Nouvelle facture</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold Ar{getStatusClasses(status)}`}>
              {status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors">
              <Eye size={18} />
              <span>Aperçu</span>
            </button>
            <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white transition-colors">
              <PlusCircle size={18} />
              <span>Générer le PDF</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 transition-colors">
              <FileDown size={18} />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Invoice Form */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* Left Column */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 md:col-span-2">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Numéro de facture</label>
              <input type="text" className="shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Statut du paiement</label>
              <select className="bg-gray-50 shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full">
                <option>En attente</option>
                <option>Payé</option>
                <option>En retard</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Date de la facture</label>
              <input type="date" className="shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Date d'échéance</label>
              <input type="date" className="shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Client</label>
              <input type="text" placeholder="Rechercher ou sélectionner un client..." className="shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full" />
            </div>
          </div>

          {/* Right Column (Summary) */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-gray-800 text-lg">Résumé de la facture</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total:</span>
                <span>Ar0.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxe:</span>
                <span>Ar0.00</span>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="flex justify-between font-bold text-gray-900 text-xl">
                <span>Total:</span>
                <span>Ar0.00</span>
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Montant de la taxe</label>
              <input type="text" placeholder="0.00" className="shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full" />
            </div>
            <div className="mt-4">
              <label className="block mb-1 font-medium text-gray-700 text-sm">Notes</label>
              <textarea rows={3} className="shadow-sm px-3 py-2 border border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-full"></textarea>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="mt-10">
          <h3 className="mb-4 font-bold text-gray-800 text-xl">Articles de la facture</h3>
          <div className="flow-root">
            <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-2 overflow-x-auto">
              <div className="inline-block sm:px-6 lg:px-8 py-2 min-w-full align-middle">
                <table className="divide-y divide-gray-200 min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pr-3 pl-4 sm:pl-0 font-semibold text-gray-900 text-sm text-left">DESCRIPTION</th>
                      <th scope="col" className="px-3 py-3.5 font-semibold text-gray-900 text-sm text-left">QUANTITÉ</th>
                      <th scope="col" className="px-3 py-3.5 font-semibold text-gray-900 text-sm text-left">TAUX</th>
                      <th scope="col" className="px-3 py-3.5 font-semibold text-gray-900 text-sm text-left">MONTANT</th>
                      <th scope="col" className="relative py-3.5 pr-4 sm:pr-0 pl-3"><span className="sr-only">Action</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Example Row */}
                    <tr>
                      <td className="py-4 pr-3 pl-4 sm:pl-0 font-medium text-gray-900 text-sm whitespace-nowrap">
                        <input type="text" defaultValue="Service d'impression DTF, Design personnalisé..." className="p-0 border-none focus:ring-0 w-full" />
                      </td>
                      <td className="px-3 py-4 text-gray-500 text-sm whitespace-nowrap">
                        <input type="number" defaultValue={1} className="shadow-sm border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-20" />
                      </td>
                      <td className="px-3 py-4 text-gray-500 text-sm whitespace-nowrap">
                        <input type="text" defaultValue="0.00" className="shadow-sm border-gray-300 focus:border-cyan-500 rounded-md focus:ring-cyan-500 w-24" />
                      </td>
                      <td className="px-3 py-4 font-medium text-gray-800 text-sm whitespace-nowrap">Ar0.00</td>
                      <td className="relative py-4 pr-4 sm:pr-0 pl-3 font-medium text-sm text-right whitespace-nowrap">
                        <button className="text-red-600 hover:text-red-800">Supprimer</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-lime-600 hover:bg-lime-700 mt-6 px-4 py-2 rounded-lg text-white transition-colors">
            <PlusCircle size={18} />
            <span>Ajouter un article</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGeneratorPage;