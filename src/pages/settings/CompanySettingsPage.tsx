import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const CompanySettingsPage: React.FC = () => {
  const [currency, setCurrency] = useState('EUR');

  const currencyOptions = [
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'USD', label: 'Dollar ($)' },
    { value: 'MGA', label: 'Ariary (Ar)' },
  ];

  return (
    <div className="p-4">
      <Card title="Informations de l'Entreprise">
        <p className="mb-6 text-gray-500 text-sm">
          Configurez les détails de votre entreprise pour les factures et documents
        </p>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <Input label="Nom de l'Entreprise" placeholder="Saisissez le nom" />

          <Select
            label="Devise"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={currencyOptions}
          />

          <Input label="Taux de TVA (%)" type="number" placeholder="ex: 20" />

          <Input label="Préfixe Facture" placeholder="ex: FAC-" />

          <Input label="Numéro de Facture Suivant" placeholder="ex: 1001" />

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700 text-sm">Logo de l'Entreprise</label>
            <input
              type="file"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button variant="primary">Enregistrer les Paramètres</Button>
        </div>
      </Card>
    </div>
  );
};

export default CompanySettingsPage;