export interface Order {
  createdAt: string;
  id: number;
  status: boolean;
  products: Array<OrderProduct>;
  supplier: {
    id: string;
    name: String;
  };
}

export interface Category {
  id: number;
  isDeleted: boolean;
  name: string;
}

export interface Product {
  category: {
    id: string;
    name: string;
    isDeleted: boolean;
  };
  description: string;
  id: number | undefined;
  image: string;
  isDeleted: boolean;
  name: string;
  price: number;
  quantity: number;
}

export interface Supplier {
  createdAt?: string | undefined;
  id: number;
  name: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  address: string | undefined;
  note: string | undefined;
  [key: string]: unknown;
}

export interface OrderProduct {
  id: number;
  quantity: number;
  tax: number;
  product: Product;
}
