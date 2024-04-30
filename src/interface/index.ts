export interface Order {
  code: string;
  createdAt: string;
  employeeId: number;
  id: number | string;
  importOrderProducts: Array<OrderProduct> | undefined;
  note: string | undefined;
  payment: number;
  status: boolean;
  supplier: {
    id: number | string;
    name: string;
  };
  tax: number;
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
  taxCode: string | undefined;
}

export interface OrderProduct {
  id: number;
  quantity: number;
  importPrice: number;
  product: Product;
}

export interface Employee {
  id: number,
  name: string,
  username: string,
  password: string,
  phoneNumber: string,
  dateOfBirth: string,
  address: string,
  homeTown: string,
  gender: string
}
