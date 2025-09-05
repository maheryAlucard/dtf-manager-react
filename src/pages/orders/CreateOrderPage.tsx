import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, PlusCircle, Trash2 } from 'lucide-react';
import useStock from '../../hooks/useStock';
import type { StockItem } from '../../types/stock';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

interface OrderItem {
  stockItem: StockItem | null;
  quantity: number;
  unitPrice: number;
  total: number;
}

const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { stock, loading, error } = useStock();

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { stockItem: null, quantity: 0, unitPrice: 0, total: 0 },
  ]);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { stockItem: null, quantity: 0, unitPrice: 0, total: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: any
  ) => {
    const newOrderItems = [...orderItems];
    if (field === 'stockItem') {
      const selectedStockItem = stock.find(item => item.id === value);
      newOrderItems[index].stockItem = selectedStockItem || null;
      newOrderItems[index].unitPrice = selectedStockItem?.type === 'Film' ? 1000 : 500; // Example price based on type
    } else {
      (newOrderItems[index] as any)[field] = value;
    }

    // Calculate total
    const quantity = newOrderItems[index].quantity;
    const unitPrice = newOrderItems[index].unitPrice;
    newOrderItems[index].total = quantity * unitPrice;

    setOrderItems(newOrderItems);
  };

  const handleBackClick = () => {
    navigate('/dashboard/orders');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('New order created with items:', orderItems);
    navigate('/dashboard/orders'); // Redirect to orders list after creation
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleBackClick} className="flex items-center text-blue-700 hover:text-blue-900 transition-colors duration-200">
          <ArrowLeft size={20} className="mr-2" />
          <span>Retour aux commandes</span>
        </button>
      </div>

      <h1 className="mb-8 font-extrabold text-gray-900 text-4xl">Créer une nouvelle commande</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-xl p-6 rounded-xl">
        {/* Client Information */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Informations client</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label htmlFor="clientName" className="block font-medium text-gray-700 text-sm">Nom du client</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="Nom du client"
                required
              />
            </div>
            <div>
              <label htmlFor="clientEmail" className="block font-medium text-gray-700 text-sm">Email</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label htmlFor="clientPhone" className="block font-medium text-gray-700 text-sm">Téléphone</label>
              <input
                type="text"
                id="clientPhone"
                name="clientPhone"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="+1 (123) 456-7890"
              />
            </div>
            <div>
              <label htmlFor="clientAddress" className="block font-medium text-gray-700 text-sm">Adresse</label>
              <input
                type="text"
                id="clientAddress"
                name="clientAddress"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                placeholder="123 Business Ave, City, State, ZIP"
              />
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Détails de la commande</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label htmlFor="orderDate" className="block font-medium text-gray-700 text-sm">Date de commande</label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block font-medium text-gray-700 text-sm">Date d'échéance</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="orderStatus" className="block font-medium text-gray-700 text-sm">Statut de la commande</label>
              <select
                id="orderStatus"
                name="orderStatus"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                defaultValue="En attente"
              >
                <option>En attente</option>
                <option>En cours</option>
                <option>Terminé</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentStatus" className="block font-medium text-gray-700 text-sm">Statut du paiement</label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                className="block shadow-sm mt-1 px-3 py-2 border border-gray-300 focus:border-blue-700 rounded-md focus:outline-none focus:ring-blue-700 w-full sm:text-sm"
                defaultValue="Impayé"
              >
                <option>Payé</option>
                <option>Impayé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="mb-4 font-bold text-gray-900 text-2xl">Articles de la commande</h2>
          {loading && <p>Chargement du stock...</p>}
          {error && <p className="text-red-500">Erreur: {error}</p>}

          {orderItems.map((item, index) => (
            <div key={index} className="bg-gray-50 shadow-sm mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  onClick={() => handleRemoveItem(index)}
                  disabled={orderItems.length === 1}
                >
                  <Trash2 size={18} className="text-red-500" />
                </Button>
              </div>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
                <Select
                  label="Article"
                  options={stock.map((sItem) => ({ value: sItem.id, label: `${sItem.name} (${sItem.quantity} en stock)` }))}
                  value={item.stockItem?.id || ''}
                  onChange={(e) => handleItemChange(index, 'stockItem', e.target.value)}
                />
                <Input
                  label="Quantité"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  placeholder="0"
                  min="0"
                />
                <Input
                  label="Prix unitaire (Ar)"
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                  placeholder="0.00"
                  step="0.01"
                  readOnly={!!item.stockItem} // Make read-only if stock item is selected
                />
                <Input
                  label="Total (Ar)"
                  type="text"
                  value={item.total.toFixed(2)}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <Button type="button" variant="secondary" onClick={handleAddItem} className="flex items-center space-x-2">
              <PlusCircle size={20} />
              <span>Ajouter un article</span>
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 shadow-md px-5 py-2 rounded-lg text-white transition-colors duration-200"
          >
            <Save size={20} />
            <span>Créer la commande</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderPage;