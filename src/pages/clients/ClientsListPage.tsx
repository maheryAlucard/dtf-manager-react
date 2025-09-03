import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientsListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewClient = (clientId: string) => {
    navigate(`/dashboard/clients/${clientId}`);
  };

  return (
    <div className="p-8">
      <h1 className="mb-2 font-bold text-gray-800 text-3xl">Clients</h1>
      <p className="mb-6 text-gray-600">Gérez et suivez tous vos clients et leur historique de commandes</p>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center bg-white shadow-lg mb-6 p-4 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="bg-gray-100 focus:bg-white px-4 py-2 pr-8 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none text-gray-700 leading-tight appearance-none">
              <option>Tous les statuts</option>
              <option>Actif</option>
              <option>Inactif</option>
            </select>
            <div className="right-0 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <input type="text" placeholder="Rechercher des clients..." className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nouveau client
          </button>
          <button className="flex items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Exporter
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <table className="divide-y divide-gray-200 min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <div className="flex items-center">
                  Nom du client
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <div className="flex items-center">
                  Contact
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <div className="flex items-center">
                  Commandes
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <div className="flex items-center">
                  Total dépensé
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <div className="flex items-center">
                  Statut
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                <div className="flex items-center">
                  Dernière commande
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Placeholder Rows */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-cyan-100 rounded-full w-10 h-10 font-bold text-cyan-800">A</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Acme Corp</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">john@acmecorp.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 123-4567</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">12</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar2450.75</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 15, 2024</div>
                <div className="text-green-600 text-sm">Payé</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-a')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-gray-200 rounded-full w-10 h-10 font-bold text-gray-800">C</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Creative Agency</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">mike@creativeagency.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 345-6789</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">5</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar980.25</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 13, 2024</div>
                <div className="text-red-600 text-sm">En souffrance: Ar156.75</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-c')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-yellow-100 rounded-full w-10 h-10 font-bold text-yellow-800">F</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Fitness Center</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">amy@fitnesscenter.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 890-1234</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">9</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar2125.00</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 8, 2024</div>
                <div className="text-red-600 text-sm">En souffrance: Ar275.25</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-f')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-yellow-100 rounded-full w-10 h-10 font-bold text-yellow-800">L</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Local Business</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">tom@localbusiness.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 567-8901</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">3</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar675.50</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 11, 2024</div>
                <div className="text-red-600 text-sm">En souffrance: Ar450.00</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-l')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-green-100 rounded-full w-10 h-10 font-bold text-green-800">R</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Restaurant Chain</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">david@restaurantchain.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 789-0123</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">20</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar4850.25</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 9, 2024</div>
                <div className="text-green-600 text-sm">Payé</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-r')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-gray-200 rounded-full w-10 h-10 font-bold text-gray-800">S</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">School District</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">emma@schooldistrict.edu</div>
                <div className="text-gray-500 text-sm">+1 (555) 678-9012</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">6</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar1425.75</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-gray-100 px-2 rounded-full font-semibold text-gray-800 text-xs leading-5">
                  Inactif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 10, 2024</div>
                <div className="text-red-600 text-sm">En souffrance: Ar325.50</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-s-school')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-green-100 rounded-full w-10 h-10 font-bold text-green-800">S</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Sports Club</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">lisa@sportsclub.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 456-7890</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">15</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar3250.00</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 12, 2024</div>
                <div className="text-green-600 text-sm">Payé</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-s-sports')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="w-4 h-4 text-cyan-600 transition duration-150 ease-in-out form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 justify-center items-center bg-yellow-100 rounded-full w-10 h-10 font-bold text-yellow-800">T</div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 text-sm">Tech Solutions</div>
                    <div className="text-gray-500 text-sm">Client</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 text-sm">sarah@techsolutions.com</div>
                <div className="text-gray-500 text-sm">+1 (555) 234-5678</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">8</div>
                <div className="text-gray-500 text-sm">commandes</div>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="font-medium text-gray-900 text-sm">Ar1875.50</div>
                <div className="text-gray-500 text-sm">total dépensé</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex bg-green-100 px-2 rounded-full font-semibold text-green-800 text-xs leading-5">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                <div className="text-gray-900 text-sm">Jan 14, 2024</div>
                <div className="text-red-600 text-sm">En souffrance: Ar245.00</div>
              </td>
              <td className="px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                <button onClick={() => handleViewClient('client-t')} className="text-cyan-600 hover:text-cyan-900">Voir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsListPage;