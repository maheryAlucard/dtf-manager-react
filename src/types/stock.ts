export interface StockItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  lowStockThreshold: number;
  unit?: string;
  totalValue?: number;
}