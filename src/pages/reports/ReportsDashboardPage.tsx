import React from 'react';
import { Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ReportsDashboardPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-gray-800 text-3xl">Rapports et Analyses</h1>
          <p className="text-gray-600">Tableau de bord analytique complet pour votre atelier DTF</p>
        </div>
        <Button variant="primary" className="flex items-center">
          <Download className="mr-2 w-5 h-5" />
          Exporter les Données
        </Button>
      </div>

      {/* Key Metric Cards */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="bg-blue-100 mb-2 p-3 rounded-lg">
              <div className="bg-blue-600 rounded-md w-8 h-8"></div>
            </div>
            <p className="font-bold text-gray-800 text-3xl">1,247</p>
            <p className="text-gray-500 text-sm">Travaux d'impression</p>
          </div>
          <span className="font-semibold text-green-500 text-sm">+12.5%</span>
        </Card>

        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="bg-yellow-100 mb-2 p-3 rounded-lg">
              <div className="bg-yellow-500 rounded-md w-8 h-8"></div>
            </div>
            <p className="font-bold text-gray-800 text-3xl">2.4h</p>
            <p className="text-gray-500 text-sm">Temps Moyen de Production</p>
          </div>
          <span className="font-semibold text-red-500 text-sm">-8.2%</span>
        </Card>

        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="bg-green-100 mb-2 p-3 rounded-lg">
              <div className="bg-green-600 rounded-md w-8 h-8"></div>
            </div>
            <p className="font-bold text-gray-800 text-3xl">€785k</p>
            <p className="text-gray-500 text-sm">Chiffre d'Affaires Total</p>
          </div>
          <span className="font-semibold text-green-500 text-sm">+18.7%</span>
        </Card>

        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="bg-gray-100 mb-2 p-3 rounded-lg">
              <div className="bg-gray-800 rounded-md w-8 h-8"></div>
            </div>
            <p className="font-bold text-gray-800 text-3xl">94.2%</p>
            <p className="text-gray-500 text-sm">Efficacité de Production</p>
          </div>
          <span className="font-semibold text-green-500 text-sm">+2.1%</span>
        </Card>
      </div>

      {/* Monthly Revenue vs Expenses Chart */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Revenus vs Dépenses Mensuelles</h2>
        <div className="flex justify-end mb-4">
          <Button variant="secondary" size="small" className="mr-2">Mensuel</Button>
          <Button variant="secondary" size="small">Annuel</Button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <span className="flex items-center text-gray-600 text-sm">
            <span className="block bg-blue-600 mr-2 rounded-full w-3 h-3"></span> Revenus
          </span>
          <span className="flex items-center text-gray-600 text-sm">
            <span className="block bg-yellow-500 mr-2 rounded-full w-3 h-3"></span> Dépenses
          </span>
        </div>
        <div className="items-end gap-2 grid grid-cols-12 h-64">
          {/* Dummy data for demonstration */}
          {[
            { month: 'Jan', revenue: 60, expenses: 40 },
            { month: 'Fév', revenue: 70, expenses: 50 },
            { month: 'Mar', revenue: 80, expenses: 60 },
            { month: 'Avr', revenue: 90, expenses: 70 },
            { month: 'Mai', revenue: 75, expenses: 55 },
            { month: 'Jun', revenue: 95, expenses: 65 },
            { month: 'Jul', revenue: 100, expenses: 70 },
            { month: 'Aoû', revenue: 85, expenses: 60 },
            { month: 'Sep', revenue: 105, expenses: 75 },
            { month: 'Oct', revenue: 110, expenses: 80 },
            { month: 'Nov', revenue: 120, expenses: 85 },
            { month: 'Déc', revenue: 130, expenses: 90 },
          ].map((data, index) => (
            <div key={index} className="flex flex-col items-center col-span-1">
              <div className="flex flex-1 items-end w-full">
                <div
                  className="bg-blue-600 rounded-t-md w-1/2"
                  style={{ height: `${data.revenue}%` }}
                ></div>
                <div
                  className="bg-yellow-500 rounded-t-md w-1/2"
                  style={{ height: `${data.expenses}%` }}
                ></div>
              </div>
              <span className="mt-1 text-gray-500 text-xs">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cost per Order Breakdown */}
      <div className="bg-white shadow-lg mb-6 p-6 rounded-xl">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">Répartition des Coûts par Commande</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-700">
              <span className="block bg-blue-600 mr-3 rounded-full w-3 h-3"></span> Matériaux DTF
            </span>
            <span className="font-semibold text-gray-800">€18,500 <span className="text-gray-500 text-sm">43.5%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-700">
              <span className="block bg-yellow-500 mr-3 rounded-full w-3 h-3"></span> Encre et Poudre
            </span>
            <span className="font-semibold text-gray-800">€12,300 <span className="text-gray-500 text-sm">28.9%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-700">
              <span className="block bg-green-600 mr-3 rounded-full w-3 h-3"></span> Main-d'œuvre
            </span>
            <span className="font-semibold text-gray-800">€8,200 <span className="text-gray-500 text-sm">19.3%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-700">
              <span className="block bg-red-500 mr-3 rounded-full w-3 h-3"></span> Électricité
            </span>
            <span className="font-semibold text-gray-800">€2,100 <span className="text-gray-500 text-sm">4.9%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-700">
              <span className="block bg-purple-600 mr-3 rounded-full w-3 h-3"></span> Maintenance
            </span>
            <span className="font-semibold text-gray-800">€1,400 <span className="text-gray-500 text-sm">3.3%</span></span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-gray-200 border-t">
            <span className="font-bold text-gray-800 text-lg">Coût Moyen par Commande</span>
            <span className="font-bold text-blue-600 text-lg">€42.50</span>
          </div>
        </div>
      </div>

      {/* Yearly Profit Trends Chart and Performance Metrics */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-gray-700 text-xl">Tendance des Bénéfices Annuels</h2>
          <div className="relative bg-gray-200 p-4 rounded-lg h-64">
            {/* Placeholder for a line chart */}
            <div className="right-0 bottom-0 left-0 absolute flex items-end h-full">
              {[10, 20, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45].map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-green-500 opacity-70"
                  style={{ height: `${value * 1.5}%`, marginLeft: '2px', marginRight: '2px' }}
                ></div>
              ))}
            </div>
            <div className="top-0 right-0 bottom-0 left-0 absolute flex flex-col justify-between p-2 text-gray-500 text-xs">
              <span>€50k</span>
              <span>€40k</span>
              <span>€30k</span>
              <span>€20k</span>
              <span>€10k</span>
              <span>€0k</span>
            </div>
            <div className="right-0 bottom-0 left-0 absolute flex justify-around mt-1 text-gray-500 text-xs">
              {['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((year, index) => (
                <span key={index}>{year}</span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-gray-700 text-xl">Métriques de Performance</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Commandes Traitées</span>
              <span className="font-bold text-gray-800 text-lg">1,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux de Réussite des Jobs</span>
              <span className="font-bold text-green-600 text-lg">98.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temps Moyen de Traitement</span>
              <span className="font-bold text-gray-800 text-lg">1.8h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Coût Moyen par Job</span>
              <span className="font-bold text-gray-800 text-lg">€35.20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Satisfaction Client</span>
              <span className="font-bold text-blue-600 text-lg">4.9/5</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsDashboardPage;