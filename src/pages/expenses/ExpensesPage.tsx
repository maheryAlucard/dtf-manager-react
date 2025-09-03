import React from 'react';
import { Plus, Search, CalendarDays, Tag, Wallet, TrendingUp, LayoutGrid } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

const ExpensesPage: React.FC = () => {
  const expenseCategories = [
    { value: 'raw_materials', label: 'Matières Premières' },
    { value: 'electricity', label: 'Électricité' },
    { value: 'salaries', label: 'Salaires' },
    { value: 'equipment', label: 'Équipement' },
    { value: 'utilities', label: 'Services Publics' },
    { value: 'other', label: 'Autre' },
  ];

  const expenseStatus = [
    { value: 'all', label: 'Tous les Statuts' },
    { value: 'paid', label: 'Payé' },
    { value: 'pending', label: 'En Attente' },
  ];

  const expenses = [
    { id: 'EXP-2024-001', date: '2024-01-15', category: 'Matières Premières', description: 'Rouleau de film DTF - 24inch x 3 rouleaux', amount: 450.00, status: 'Payé', company: 'PrintTech Solutions' },
    { id: 'EXP-2024-002', date: '2024-01-14', category: 'Électricité', description: 'Facture mensuelle d\'électricité', amount: 280.50, status: 'Payé', company: 'City Power Company' },
    { id: 'EXP-2024-003', date: '2024-01-13', category: 'Salaires', description: 'Salaire de l\'opérateur - Janvier', amount: 3200.00, status: 'Payé', company: 'Interne' },
    { id: 'EXP-2024-004', date: '2024-01-12', category: 'Matières Premières', description: 'Kit d\'encre pigmentée - CMYK', amount: 180.75, status: 'En Attente', company: 'Ink Supplies Co' },
    { id: 'EXP-2024-005', date: '2024-01-11', category: 'Équipement', description: 'Maintenance de la presse à chaud', amount: 125.00, status: 'Payé', company: 'TechFix Services' },
    { id: 'EXP-2024-006', date: '2024-01-10', category: 'Matières Premières', description: 'Poudre DTF - Blanche 25kg', amount: 320.00, status: 'Payé', company: 'PrintTech Solutions' },
    { id: 'EXP-2024-007', date: '2024-01-09', category: 'Services Publics', description: 'Services Internet & Téléphone', amount: 95.00, status: 'Payé', company: 'TeleComm Inc' },
    { id: 'EXP-2024-008', date: '2024-01-08', category: 'Salaires', description: 'Salaire administratif - Janvier', amount: 2800.00, status: 'Payé', company: 'Interne' },
  ];

  const totalExpensesThisMonth = expenses.reduce((sum, expense) => {
    if (expense.status === 'Payé') return sum + expense.amount;
    return sum;
  }, 0);

  const pendingExpenses = expenses.reduce((sum, expense) => {
    if (expense.status === 'En Attente') return sum + expense.amount;
    return sum;
  }, 0);

  const uniqueCategories = [...new Set(expenses.map(expense => expense.category))].length;

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-bold text-gray-800 text-3xl">Gestion des Dépenses</h1>
            <p className="text-gray-600">Suivez et gérez toutes les dépenses et sorties financières de l'atelier.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary">Effacer les Filtres</Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Plus className="mr-2 w-5 h-5" />
              Ajouter une Dépense
            </Button>
          </div>
        </div>

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="mb-6 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="flex items-center font-semibold text-gray-700 text-xl">
                  <Wallet className="mr-2 w-6 h-6 text-gray-500" />
                  Registres de Dépenses
                </h2>
                <span className="font-bold text-gray-800 text-lg">Total: Ar{totalExpensesThisMonth.toFixed(2)}</span>
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-6">
                <div className="relative">
                  <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <Input className="pl-10" placeholder="Rechercher des dépenses..." />
                </div>
                <Select options={expenseCategories} label="Toutes les Catégories" />
                <div className="relative">
                  <CalendarDays className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
                  <Input className="pl-10" type="month" placeholder="Mois" />
                </div>
                <Select options={expenseStatus} label="Tous les Statuts" />
              </div>

              <Table
                headers={[
                  { key: 'id', label: 'ID Dépense' },
                  { key: 'company', label: 'Entreprise' },
                  { key: 'date', label: 'Date' },
                  { key: 'category', label: 'Catégorie' },
                  { key: 'description', label: 'Description' },
                  { key: 'amount', label: 'Montant' },
                  { key: 'status', label: 'Statut' },
                ]}
                data={expenses.map(expense => ({
                  ...expense,
                  amount: `Ar${expense.amount.toFixed(2)}`,
                  category: <Badge variant={expense.category === 'Matières Premières' ? 'primary' : expense.category === 'Électricité' ? 'warning' : expense.category === 'Salaires' ? 'success' : expense.category === 'Équipement' ? 'danger' : 'info'}>{expense.category}</Badge>,
                  status: <Badge variant={expense.status === 'Payé' ? 'success' : 'warning'}>{expense.status}</Badge>,
                }))}
                renderRow={(expense: { id: string; date: string; category: React.ReactNode; description: string; amount: string; status: React.ReactNode; company: string; }) => (
                  <tr key={expense.id}>
                    <td className="px-4 py-2 border-b">{expense.id}</td>
                    <td className="px-4 py-2 border-b">{expense.company}</td>
                    <td className="px-4 py-2 border-b">{expense.date}</td>
                    <td className="px-4 py-2 border-b">{expense.category}</td>
                    <td className="px-4 py-2 border-b">{expense.description}</td>
                    <td className="px-4 py-2 border-b">{expense.amount}</td>
                    <td className="px-4 py-2 border-b">{expense.status}</td>
                  </tr>
                )}
              />
              <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
                <span>Affichage de {expenses.length} dépenses</span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="small">Précédent</Button>
                  <Button variant="ghost" size="small">1</Button>
                  <Button variant="ghost" size="small">Suivant</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <Card className="p-6">
              <h2 className="flex items-center mb-4 font-semibold text-gray-700 text-xl">
                <TrendingUp className="mr-2 w-6 h-6 text-gray-500" />
                Aperçu Mensuel
              </h2>
              <div className="flex justify-center items-center bg-gray-100 mb-4 rounded-lg h-48 text-gray-500">
                {/* Chart Placeholder */}
                <LayoutGrid className="w-12 h-12 text-gray-400" />
              </div>
              <div className="gap-2 grid grid-cols-2 text-sm">
                <div className="flex items-center">
                  <span className="bg-blue-500 mr-2 rounded-full w-3 h-3"></span> Matières Premières
                </div>
                <div className="flex items-center">
                  <span className="bg-green-500 mr-2 rounded-full w-3 h-3"></span> Salaires
                </div>
                <div className="flex items-center">
                  <span className="bg-yellow-500 mr-2 rounded-full w-3 h-3"></span> Services Publics
                </div>
                <div className="flex items-center">
                  <span className="bg-red-500 mr-2 rounded-full w-3 h-3"></span> Équipement
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="flex items-center mb-4 font-semibold text-gray-700 text-xl">
                <Tag className="mr-2 w-6 h-6 text-gray-500" />
                Statistiques Rapides
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ce Mois</span>
                  <span className="font-bold text-gray-800 text-lg">Ar{totalExpensesThisMonth.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">En Attente</span>
                  <span className="font-bold text-yellow-600 text-lg">Ar{pendingExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Catégories</span>
                  <span className="font-bold text-green-600 text-lg">{uniqueCategories}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesPage;
