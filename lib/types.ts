export type ProductCategory =
  | "sarees"
  | "kurtis"
  | "dress-materials"
  | "thread-bangles"
  | "festive-combos";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  images: string[];
  price: number; // MRP
  discountedPrice: number; // selling price
  description: string;
  colors: string[];
  sizes: string[]; // empty array for bangles
  stock: number;
  stockStatus: StockStatus;
  sku: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[];

  // Thread bangle specific
  bangleSize?: string;
  bangleCount?: number;
  material?: string;
  occasions?: string[];

  // Clothing specific
  fabric?: string;
  fit?: string;
  careInstructions?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "UPI" | "COD" | "Card";
}

export interface Enquiry {
  id: string;
  customerName: string;
  message: string;
  date: string;
  status: "New" | "Replied" | "Closed";
}

export interface OrderItemSummary {
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface OrderEmailDetails {
  orderId: string;
  transactionId?: string;
  paymentMethod: "UPI" | "COD" | "Card";
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItemSummary[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
}
