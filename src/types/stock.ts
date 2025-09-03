export interface StockItem {
  id: string;
  name: string;
  type: 'Film' | 'Ink' | 'T-Shirt' | 'Accessory';
  quantity: number;
  lowStockThreshold: number;
}