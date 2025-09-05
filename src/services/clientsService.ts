import { type Client } from "../types/client";

const mockClients: Client[] = [
  { id: 'C001', name: 'Client A', contact: 'client.a@example.com', orderHistory: 5, outstandingPayments: 0.00 },
  { id: 'C002', name: 'Client B', contact: 'client.b@example.com', orderHistory: 3, outstandingPayments: 75.00 },
  { id: 'C003', name: 'Client C', contact: 'client.c@example.com', orderHistory: 10, outstandingPayments: 0.00 },
];

export const clientsService = {
  async getClients(): Promise<Client[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockClients;
  },

  async getClientById(id: string): Promise<Client | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockClients.find(client => client.id === id);
  },

  async createClient(newClient: Omit<Client, 'id' | 'orderHistory' | 'outstandingPayments'>): Promise<Client> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const client: Client = { ...newClient, id: `C00${mockClients.length + 1}`, orderHistory: 0, outstandingPayments: 0 };
    mockClients.push(client);
    return client;
  },
};