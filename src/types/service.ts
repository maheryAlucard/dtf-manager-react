export interface ServiceElement {
  stockItemId: string;
  quantity: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number; // Price in Ar (integer cents)
  elements: ServiceElement[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}