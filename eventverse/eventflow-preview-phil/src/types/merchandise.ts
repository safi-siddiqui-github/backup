export interface SwagItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  received: boolean;
  receivedDate?: Date;
  category: 'apparel' | 'accessories' | 'tech' | 'stationery';
}

export interface MerchandiseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  stock?: number;
}

export interface MerchandiseOrder {
  id: string;
  orderNumber: string;
  date: Date;
  items: Array<{
    product: MerchandiseProduct;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
}
