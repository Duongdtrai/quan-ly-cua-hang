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
        id: string
        name: string;
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
    address: string;
    createdAt: string;
    id: number;
    isDeleted: boolean;
    name: string;
    phoneNumber: string;
}

export interface OrderProduct {
    id: number;
    quantity: number;
    tax: number;
    product: Product;
}