import { Invoice } from "../types/invoice";


const mockInvoices: Invoice[] = [
  { id: 'INV001', clientId: 'C001', clientName: 'Client A', date: '2023-01-18', dueDate: '2023-02-18', total: 150.00, status: 'Paid' },
  { id: 'INV002', clientId: 'C002', clientName: 'Client B', date: '2023-02-20', dueDate: '2023-03-20', total: 230.00, status: 'Pending' },
  { id: 'INV003', clientId: 'C003', clientName: 'Client C', date: '2023-03-01', dueDate: '2023-04-01', total: 500.00, status: 'Overdue' },
];

export const invoicesService = {
  async getInvoices(): Promise<Invoice[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockInvoices;
  },

  async getInvoiceById(id: string): Promise<Invoice | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockInvoices.find(invoice => invoice.id === id);
  },

  async createInvoice(newInvoice: Omit<Invoice, 'id' | 'status'>): Promise<Invoice> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const invoice: Invoice = { ...newInvoice, id: `INV00${mockInvoices.length + 1}`, status: 'Pending' };
    mockInvoices.push(invoice);
    return invoice;
  },

  async updateInvoiceStatus(id: string, status: 'Paid' | 'Pending' | 'Overdue'): Promise<Invoice | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const invoiceIndex = mockInvoices.findIndex(invoice => invoice.id === id);
    if (invoiceIndex > -1) {
      mockInvoices[invoiceIndex].status = status;
      return mockInvoices[invoiceIndex];
    }
    return undefined;
  },
};