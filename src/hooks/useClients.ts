import { useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  contact: string;
  orderHistory: number;
  outstandingPayments: number;
}

const mockClients: Client[] = [
  { id: 'C001', name: 'Client A', contact: 'client.a@example.com', orderHistory: 5, outstandingPayments: 0.00 },
  { id: 'C002', name: 'Client B', contact: 'client.b@example.com', orderHistory: 3, outstandingPayments: 75.00 },
  { id: 'C003', name: 'Client C', contact: 'client.c@example.com', orderHistory: 10, outstandingPayments: 0.00 },
  { id: 'C004', name: 'Entreprise DTF', contact: 'contact@entreprisedtf.com', orderHistory: 7, outstandingPayments: 120.50 },
  { id: 'C005', name: 'Studio GraphX', contact: 'hello@graphx.studio', orderHistory: 2, outstandingPayments: 0.00 },
  { id: 'C006', name: 'Imprimerie Bleu', contact: 'contact@imprimerie-bleu.fr', orderHistory: 12, outstandingPayments: 300.00 },
  { id: 'C007', name: 'Boutique Soleil', contact: 'info@boutique-soleil.com', orderHistory: 1, outstandingPayments: 0.00 },
  { id: 'C008', name: 'Agence Alpha', contact: 'sales@agence-alpha.io', orderHistory: 9, outstandingPayments: 45.00 },
];

const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setClients(mockClients);
      } catch (err) {
        setError('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
};

export default useClients;