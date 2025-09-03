import React from 'react';
import { TrendingUp, ShoppingCart, Package, DollarSign, BarChart2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Key Metrics Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Sales Card */}
        <div className="flex items-center bg-white shadow-md p-6 rounded-xl">
          <div className="bg-success-lime/20 mr-4 p-3 rounded-lg">
            <TrendingUp className="w-8 h-8 text-success-lime" />
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">Ventes Totales</h3>
            <span className="font-bold text-gray-800 text-3xl">Ar67,842</span>
            <p className="mt-1 text-gray-500 text-xs">Ce mois-ci</p>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="flex items-center bg-white shadow-md p-6 rounded-xl">
          <div className="bg-primary-cyan/20 mr-4 p-3 rounded-lg">
            <ShoppingCart className="w-8 h-8 text-primary-cyan" />
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">Commandes Totales</h3>
            <span className="font-bold text-gray-800 text-3xl">194</span>
            <p className="mt-1 text-gray-500 text-xs">Ce mois-ci</p>
          </div>
        </div>

        {/* Inventory Items Card */}
        <div className="flex items-center bg-white shadow-md p-6 rounded-xl">
          <div className="bg-highlight-yellow/20 mr-4 p-3 rounded-lg">
            <Package className="w-8 h-8 text-highlight-yellow" />
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">Articles en Stock</h3>
            <span className="font-bold text-gray-800 text-3xl">342</span>
            <p className="mt-1 text-gray-500 text-xs">Total en stock</p>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="flex items-center bg-white shadow-md p-6 rounded-xl">
          <div className="bg-error-red/20 mr-4 p-3 rounded-lg">
            <DollarSign className="w-8 h-8 text-error-red" />
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">Dépenses Totales</h3>
            <span className="font-bold text-gray-800 text-3xl">Ar28,475</span>
            <p className="mt-1 text-gray-500 text-xs">Ce mois-ci</p>
          </div>
        </div>
      </div>

      {/* Sales Overview and Recent Orders */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-6">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-2 bg-white shadow-md p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-gray-800 text-lg">Aperçu des Ventes</h2>
            <div className="flex space-x-2">
              <button className="bg-primary-cyan px-4 py-1 rounded-full text-white text-sm">30 Jours</button>
              <button className="bg-gray-200 px-4 py-1 rounded-full text-gray-700 text-sm">90 Jours</button>
            </div>
          </div>
          <div className="flex justify-center items-center bg-gray-100 rounded-lg h-64 text-gray-500">
            <div className="text-center">
              <BarChart2 className="mx-auto w-12 h-12 text-gray-400" />
              <p className="mt-2">La visualisation du graphique des ventes apparaîtrait ici</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="mb-6 font-semibold text-gray-800 text-lg">Commandes Récentes</h2>
          <div className="space-y-4">
            {/* Order Item 1 */}
            <div className="flex justify-between items-center pb-4 border-gray-200 border-b">
              <div className="flex items-center">
                <div className="flex justify-center items-center bg-success-lime/20 mr-3 rounded-full w-10 h-10 font-bold text-success-lime">
                  #
                </div>
                <div>
                  <h4 className="font-medium">Commande #1247</h4>
                  <p className="text-gray-500 text-sm">Impression DTF personnalisée</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">Ar89.50</p>
                <div className="inline-block bg-success-lime mt-1 px-2 py-1 rounded-full text-white text-xs">Terminé</div>
              </div>
            </div>

            {/* Order Item 2 */}
            <div className="flex justify-between items-center pb-4 border-gray-200 border-b">
              <div className="flex items-center">
                <div className="flex justify-center items-center bg-highlight-yellow/20 mr-3 rounded-full w-10 h-10 font-bold text-highlight-yellow">
                  #
                </div>
                <div>
                  <h4 className="font-medium">Commande #1246</h4>
                  <p className="text-gray-500 text-sm">Commande de T-shirt en gros</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">Ar245.00</p>
                <div className="inline-block bg-highlight-yellow mt-1 px-2 py-1 rounded-full text-white text-xs">En traitement</div>
              </div>
            </div>

            {/* Order Item 3 */}
            <div className="flex justify-between items-center pb-4 border-gray-200 border-b">
              <div className="flex items-center">
                <div className="flex justify-center items-center bg-primary-cyan/20 mr-3 rounded-full w-10 h-10 font-bold text-primary-cyan">
                  #
                </div>
                <div>
                  <h4 className="font-medium">Commande #1245</h4>
                  <p className="text-gray-500 text-sm">Impression de logo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">Ar156.75</p>
                <div className="inline-block bg-gray-500 mt-1 px-2 py-1 rounded-full text-white text-xs">Livré</div>
              </div>
            </div>

            {/* Order Item 4 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex justify-center items-center bg-secondary-magenta/20 mr-3 rounded-full w-10 h-10 font-bold text-secondary-magenta">
                  #
                </div>
                <div>
                  <h4 className="font-medium">Commande #1244</h4>
                  <p className="text-gray-500 text-sm">Impression de sweat à capuche personnalisée</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">Ar198.25</p>
                <div className="inline-block bg-secondary-magenta mt-1 px-2 py-1 rounded-full text-white text-xs">En production</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;