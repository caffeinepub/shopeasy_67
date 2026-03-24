export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  badge?: string;
  gradient: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  name: string;
  icon: string;
  gradient: string;
}
