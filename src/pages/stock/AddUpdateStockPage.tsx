import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { Check } from 'lucide-react';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';

type FormMode = 'add' | 'update';

const AddUpdateStockPage: React.FC = () => {
  const [formMode, setFormMode] = useState<FormMode>('add');
  const [productName, setProductName] = useState('');
  const [initialStockQuantity, setInitialStockQuantity] = useState(0);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('Mètres');
  const [reasonForAddition, setReasonForAddition] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!productName.trim()) {
      newErrors.productName = 'Le nom du produit est requis.';
    }
    if (initialStockQuantity < 0) {
      newErrors.initialStockQuantity = 'La quantité de stock initiale ne peut pas être négative.';
    }
    if (!reasonForAddition.trim()) {
      newErrors.reasonForAddition = 'La raison de l\'ajout est requise.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = () => {
    if (!validateForm()) {
      return;
    }
    console.log('Ajouter un produit:', {
      productName,
      initialStockQuantity,
      unitOfMeasurement,
      reasonForAddition,
      notes,
    });
    // TODO: Implement actual add product logic
  };

  const handleUpdateStock = () => {
    console.log('Logique de mise à jour du stock ici');
    // TODO: Implement actual update stock logic
  };

  return (
    <>
      <div className="p-6">
        <h1 className="mb-2 font-bold text-neutral-dark-gray text-3xl">Gestion des stocks</h1>
        <p className="mb-6 text-text-secondary">Ajouter de nouveaux produits ou mettre à jour les quantités de stock existantes</p>

        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => setFormMode('add')}
            className={`px-6 py-2 rounded-lg ${formMode === 'add'
              ? 'bg-primary-cyan text-white'
              : 'bg-light-gray text-text-primary'
              }`}
          >
            Ajouter un nouveau produit
          </Button>
          <Button
            onClick={() => setFormMode('update')}
            className={`px-6 py-2 rounded-lg ${formMode === 'update'
              ? 'bg-primary-cyan text-white'
              : 'bg-light-gray text-text-primary'
              }`}
          >
            Mettre à jour le stock existant
          </Button>
        </div>

        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-neutral-dark-gray text-2xl">
            {formMode === 'add' ? 'Ajouter un nouveau produit' : 'Mettre à jour le stock existant'}
          </h2>

          {formMode === 'add' && (
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <Input
                label="Nom du produit"
                placeholder="Entrez le nom du produit"
                value={productName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                error={errors?.productName}
              />
              <Input
                label="Quantité de stock initiale"
                type="number"
                value={initialStockQuantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInitialStockQuantity(Number(e.target.value))}
                error={errors?.initialStockQuantity}
              />
              <Select
                label="Unité de mesure"
                value={unitOfMeasurement}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUnitOfMeasurement(e.target.value)}
                options={[
                  { value: 'Meters', label: 'Mètres' },
                  { value: 'Units', label: 'Unités' },
                  { value: 'Kilograms', label: 'Kilogrammes' },
                ]}
              />
              <Input
                label="Raison de l'ajout"
                placeholder="ex: Configuration initiale de l'inventaire"
                value={reasonForAddition}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReasonForAddition(e.target.value)}
                error={errors?.reasonForAddition}
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Notes (Facultatif)"
                  placeholder=""
                  value={notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {formMode === 'update' && (
            <div>
              <p>Le formulaire de mise à jour du stock existant ira ici.</p>
              {/* TODO: Implement update stock form */}
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                // Reset form or navigate back
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={formMode === 'add' ? handleAddProduct : handleUpdateStock}
              className="flex items-center px-6 py-2 rounded-lg text-white bg-accent-emerald-green"
            >
              <Check className="mr-2 w-5 h-5" />
              {formMode === 'add' ? 'Ajouter un produit' : 'Mettre à jour le stock'}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddUpdateStockPage;