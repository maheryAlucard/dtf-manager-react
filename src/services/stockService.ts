import { type StockItem } from "../types/stock";


const mockStock: StockItem[] = [
  { id: 'S001', name: 'Film Type X', type: 'Film', quantity: 150, lowStockThreshold: 10 },
  { id: 'S002', name: 'Ink Color Y', type: 'Ink', quantity: 75, lowStockThreshold: 5 },
  { id: 'S003', name: 'T-Shirt White M', type: 'T-Shirt', quantity: 500, lowStockThreshold: 50 },
  { id: 'S004', name: 'Film Type Z', type: 'Film', quantity: 5, lowStockThreshold: 10 },
  { id: 'S005', name: 'Ink Color Black', type: 'Ink', quantity: 2, lowStockThreshold: 5 },
];

export const stockService = {
  async getStockItems(): Promise<StockItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStock;
  },

  async getStockItemById(id: string): Promise<StockItem | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockStock.find(item => item.id === id);
  },

  async addStock(newItem: Omit<StockItem, 'id'>): Promise<StockItem> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const item: StockItem = { ...newItem, id: `S00${mockStock.length + 1}` };
    mockStock.push(item);
    return item;
  },

  async updateStockQuantity(id: string, quantityChange: number): Promise<StockItem | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const itemIndex = mockStock.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      mockStock[itemIndex].quantity += quantityChange;
      return mockStock[itemIndex];
    }
    return undefined;
  },
};