import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, ChevronDown, FileText, Copy, Eye } from 'lucide-react'; // Import Eye icon

const OrdersListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (orderId: string) => {
    navigate(`/dashboard/orders/Ar${orderId}`);
  };

  return (
    <div className="p-8 font-inter">
      <h1 className="mb-2 font-bold text-gray-900 text-4xl">Commandes</h1>
      <p className="mb-8 text-gray-600">Gérez et suivez toutes les commandes clients dans votre pipeline de production</p>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center bg-white shadow-lg mb-6 p-6 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="status-filter" className="text-gray-700">Statut:</label>
            <select id="status-filter" className="px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:ring-blue-700">
              <option>Tous les statuts</option>
              <option>En attente</option>
              <option>En cours</option>
              <option>Terminé</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="client-filter" className="text-gray-700">Client:</label>
            <input type="text" id="client-filter" placeholder="Rechercher des clients..." className="px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:ring-blue-700" />
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="date-filter" className="text-gray-700">Date:</label>
            <input type="date" id="date-filter" className="px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:ring-blue-700" />
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 shadow-md px-5 py-2 rounded-lg text-white">
            <Plus width="20" height="20" />
            <span>Nouvelle commande</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-gray-50 shadow-md px-5 py-2 border border-gray-300 rounded-lg text-gray-700">
            <Upload width="20" height="20" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 border-gray-200 border-b text-gray-600 text-sm uppercase">
              <th className="px-5 py-3 text-left">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  ID COMMANDE
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  CLIENT
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  PRODUIT
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  QUANTITÉ
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  MONTANT
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  STATUT
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  DATE
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">
                <div className="flex items-center">
                  PAIEMENT
                  <ChevronDown width="16" height="16" className="ml-1" />
                </div>
              </th>
              <th className="px-5 py-3 font-semibold text-xs text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder Rows */}
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1247')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-blue-100 mr-2 rounded-full w-6 h-6 font-bold text-blue-700 text-xs">#</span>
                  #1247
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Acme Corp</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Impression DTF personnalisée</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">50 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar89.50</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-emerald-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-emerald-200 opacity-50 rounded-full"></span>
                  <span className="relative">Terminé</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">15 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-emerald-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Payé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1247')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1246')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-yellow-100 mr-2 rounded-full w-6 h-6 font-bold text-yellow-600 text-xs">#</span>
                  #1246
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Tech Solutions</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Commande de T-shirts en gros</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">100 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar245.00</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-yellow-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                  <span className="relative">En cours</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">14 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-red-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Impayé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="bg-emerald-500 hover:bg-emerald-600 mr-3 px-3 py-1 rounded-md text-white text-xs">Marquer payé</button>
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1246')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1245')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-gray-200 mr-2 rounded-full w-6 h-6 font-bold text-gray-600 text-xs">#</span>
                  #1245
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Creative Agency</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Impression de logo</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">25 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar156.75</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-gray-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                  <span className="relative">En attente</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">13 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-red-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Impayé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="bg-emerald-500 hover:bg-emerald-600 mr-3 px-3 py-1 rounded-md text-white text-xs">Marquer payé</button>
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1245')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1244')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-blue-100 mr-2 rounded-full w-6 h-6 font-bold text-blue-700 text-xs">#</span>
                  #1244
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Sports Club</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Impression de sweat à capuche personnalisée</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">75 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar198.25</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-emerald-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-emerald-200 opacity-50 rounded-full"></span>
                  <span className="relative">Terminé</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">12 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-emerald-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Payé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1244')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1243')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-yellow-100 mr-2 rounded-full w-6 h-6 font-bold text-yellow-600 text-xs">#</span>
                  #1243
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Local Business</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">T-shirts d'événement</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">200 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar450.00</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-yellow-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                  <span className="relative">En cours</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">11 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-emerald-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Payé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1243')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1242')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-gray-200 mr-2 rounded-full w-6 h-6 font-bold text-gray-600 text-xs">#</span>
                  #1242
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">School District</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Impressions d'uniformes</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">150 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar325.50</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-gray-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                  <span className="relative">En attente</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">10 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-red-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Impayé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="bg-emerald-500 hover:bg-emerald-600 mr-3 px-3 py-1 rounded-md text-white text-xs">Marquer payé</button>
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1242')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1241')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-blue-100 mr-2 rounded-full w-6 h-6 font-bold text-blue-700 text-xs">#</span>
                  #1241
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Restaurant Chain</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Chemises du personnel</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">80 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar180.00</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-emerald-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-emerald-200 opacity-50 rounded-full"></span>
                  <span className="relative">Terminé</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">9 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-emerald-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Payé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1241')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-gray-200 border-b cursor-pointer" onClick={() => handleRowClick('1240')}>
              <td className="px-5 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded w-4 h-4 text-blue-700 form-checkbox" />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="inline-flex justify-center items-center bg-yellow-100 mr-2 rounded-full w-6 h-6 font-bold text-yellow-600 text-xs">#</span>
                  #1240
                </div>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Fitness Center</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Client</p>
              </td>
              <td className="px-5 py-4">
                <p className="text-gray-900 whitespace-no-wrap">Vêtements de sport</p>
                <p className="text-gray-600 text-xs whitespace-no-wrap">Service d'impression DTF</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">60 unités</td>
              <td className="px-5 py-4 whitespace-nowrap">Ar275.25</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-block relative px-3 py-1 font-semibold text-yellow-900 leading-tight">
                  <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                  <span className="relative">En cours</span>
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <p className="text-gray-900">8 janv.</p>
                <p className="text-gray-600 text-xs">2024</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="bg-red-500 mr-2 rounded-full w-2.5 h-2.5"></span>
                  Impayé
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-right whitespace-nowrap">
                <button className="bg-emerald-500 hover:bg-emerald-600 mr-3 px-3 py-1 rounded-md text-white text-xs">Marquer payé</button>
                <button className="mr-3 text-gray-600 hover:text-gray-900">
                  <FileText width="20" height="20" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <Copy width="20" height="20" />
                </button>
                <button onClick={() => handleRowClick('1240')} className="ml-3 text-blue-600 hover:text-blue-800">
                  <Eye width="20" height="20" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersListPage;