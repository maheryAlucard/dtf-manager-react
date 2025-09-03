import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Pen,
  Shirt,
  Boxes,
  AlertTriangle,
  Plus,
  ArrowRight,
  FileText,
  History,
  Eye,
  Download
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StockDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-gray-800 text-3xl">Gestion des Stocks</h1>
        <div className="flex space-x-3">
          <Button onClick={() => navigate('/dashboard/stock/add-update')} className="flex items-center bg-primary text-white">
            <Plus className="mr-2 w-5 h-5" /> Ajouter Stock
          </Button>
          <Button onClick={() => navigate('/dashboard/stock/movements')} className="flex items-center bg-secondary">
            <Eye className="mr-2 w-5 h-5" /> Voir Mouvements
          </Button>
          <Button className="flex items-center bg-highlight text-white">
            <Download className="mr-2 w-5 h-5" /> Exporter Rapport
          </Button>
        </div>
      </div>

      <p className="mb-8 text-gray-600">Surveillez les niveaux d'inventaire et gérez les stocks par catégorie.</p>

      {/* Category Overview */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="flex items-center mb-2 text-gray-500">
              <Package className="mr-2 w-5 h-5" />
              <span className="font-semibold">Films</span>
            </div>
            <p className="font-bold text-gray-900 text-2xl">156</p>
            <p className="text-gray-500">Articles Totaux</p>
            <p className="text-gray-500">Valeur Totale: 12 450 Ar</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </Card>

        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="flex items-center mb-2 text-gray-500">
              <Pen className="mr-2 w-5 h-5" />
              <span className="font-semibold">Encres</span>
            </div>
            <p className="font-bold text-gray-900 text-2xl">89</p>
            <p className="text-gray-500">Articles Totaux</p>
            <p className="text-gray-500">Valeur Totale: 8 920 Ar</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </Card>

        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="flex items-center mb-2 text-gray-500">
              <Shirt className="mr-2 w-5 h-5" />
              <span className="font-semibold">T-Shirts</span>
            </div>
            <p className="font-bold text-gray-900 text-2xl">342</p>
            <p className="text-gray-500">Articles Totaux</p>
            <p className="text-gray-500">Valeur Totale: 6 840 Ar</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </Card>

        <Card className="flex justify-between items-center p-5">
          <div>
            <div className="flex items-center mb-2 text-gray-500">
              <Boxes className="mr-2 w-5 h-5" />
              <span className="font-semibold">Accessoires</span>
            </div>
            <p className="font-bold text-gray-900 text-2xl">78</p>
            <p className="text-gray-500">Articles Totaux</p>
            <p className="text-gray-500">Valeur Totale: 2 340 Ar</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </Card>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Low Stock Alerts */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold text-gray-800 text-xl">Alertes de Stock Faible</h2>
            <p className="mb-4 text-gray-600">Articles nécessitant une attention immédiate.</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="mr-3 w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Film DTF Blanc</p>
                    <p className="text-gray-600 text-sm">Films</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="mr-2 font-bold text-yellow-700">12</p>
                  <span className="mr-4 text-gray-600">rouleaux</span>
                  <p className="text-gray-500 text-sm">Min: 50 rouleaux</p>
                  <Button className="bg-secondary ml-4 text-white">Réapprovisionner</Button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="mr-3 w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Encre Pigmentée Noire</p>
                    <p className="text-gray-600 text-sm">Encres</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="mr-2 font-bold text-yellow-700">3</p>
                  <span className="mr-4 text-gray-600">bouteilles</span>
                  <p className="text-gray-500 text-sm">Min: 10 bouteilles</p>
                  <Button className="bg-secondary ml-4 text-white">Réapprovisionner</Button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="mr-3 w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-gray-800">T-Shirts Coton Moyen</p>
                    <p className="text-gray-600 text-sm">T-Shirts</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="mr-2 font-bold text-yellow-700">25</p>
                  <span className="mr-4 text-gray-600">pièces</span>
                  <p className="text-gray-500 text-sm">Min: 100 pièces</p>
                  <Button className="bg-secondary ml-4 text-white">Réapprovisionner</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions and Recent Movements */}
        <div>
          <Card className="mb-6 p-6">
            <h2 className="mb-4 font-semibold text-gray-800 text-xl">Actions Rapides</h2>
            <p className="mb-4 text-gray-600">Tâches courantes de gestion des stocks.</p>
            <div className="gap-4 grid grid-cols-2">
              <Link to="/stock/add-update">
                <Button className="flex flex-col justify-center items-center w-full h-24">
                  <Plus className="mb-2 w-6 h-6" />
                  <span>Ajouter Nouveau Stock</span>
                </Button>
              </Link>
              <Link to="/stock/movements">
                <Button className="flex flex-col justify-center items-center w-full h-24">
                  <ArrowRight className="mb-2 w-6 h-6" />
                  <span>Mouvements de Stock</span>
                </Button>
              </Link>
              <Button className="flex flex-col justify-center items-center w-full h-24">
                <FileText className="mb-2 w-6 h-6" />
                <span>Générer Rapport</span>
              </Button>
              <Button className="flex flex-col justify-center items-center w-full h-24">
                <History className="mb-2 w-6 h-6" />
                <span>Auditer Inventaire</span>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 font-semibold text-gray-800 text-xl">Mouvements Récents</h2>
            <p className="mb-4 text-gray-600">Dernières transactions de stock.</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Badge className="bg-lime-500 mr-3 text-white">+50</Badge>
                  <div>
                    <p className="font-semibold text-gray-800">Film DTF Clair</p>
                    <p className="text-gray-600 text-sm">2024-01-15 • Admin</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Badge className="bg-red-500 mr-3 text-white">-5</Badge>
                  <div>
                    <p className="font-semibold text-gray-800">Cartouche d'Encre Noire</p>
                    <p className="text-gray-600 text-sm">2024-01-15 • Opérateur1</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Badge className="bg-lime-500 mr-3 text-white">+100</Badge>
                  <div>
                    <p className="font-semibold text-gray-800">T-Shirts Coton Large</p>
                    <p className="text-gray-600 text-sm">2024-01-14 • Admin</p>
                  </div>
                </div>
              </div>

              <Link to="/dashboard/stock/movements" className="flex items-center mt-4 text-primary">
                Voir Tous les Mouvements <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDashboardPage;