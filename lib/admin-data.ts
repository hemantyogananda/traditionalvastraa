import { Order, Enquiry } from "./types";

export const mockOrders: Order[] = [
  {
    id: "TV483920",
    date: "2026-09-02",
    customerName: "Ritu Agarwal",
    items: [{ name: "Maroon & Gold Bangle Set", quantity: 1, price: 249 }],
    total: 249,
    status: "Delivered",
    paymentMethod: "UPI",
  },
  {
    id: "TV271044",
    date: "2026-08-18",
    customerName: "Divya Menon",
    items: [{ name: "Blush Pink Floral Kurti", quantity: 2, price: 699 }],
    total: 1398,
    status: "Shipped",
    paymentMethod: "COD",
  },
  {
    id: "TV109233",
    date: "2026-08-05",
    customerName: "Priya Ramesh",
    items: [{ name: "Deep Maroon Silk Saree", quantity: 1, price: 1899 }],
    total: 1899,
    status: "Delivered",
    paymentMethod: "UPI",
  },
  {
    id: "TV558112",
    date: "2026-09-05",
    customerName: "Sneha Pillai",
    items: [{ name: "Festive 3-Piece Kurti Set", quantity: 1, price: 1499 }],
    total: 1499,
    status: "Pending",
    paymentMethod: "COD",
  },
  {
    id: "TV902341",
    date: "2026-09-06",
    customerName: "Anjali Krishnan",
    items: [{ name: "Blush & Gold Bangle Set", quantity: 2, price: 229 }],
    total: 458,
    status: "Confirmed",
    paymentMethod: "UPI",
  },
];

export const mockEnquiries: Enquiry[] = [
  {
    id: "e1",
    customerName: "Farah Sheikh",
    message: "Do you have this saree in a different color?",
    date: "2026-09-06",
    status: "New",
  },
  {
    id: "e2",
    customerName: "Kavya Thomas",
    message: "Can I customize the bangle set colors?",
    date: "2026-09-05",
    status: "Replied",
  },
  {
    id: "e3",
    customerName: "Meena Suresh",
    message: "What's the delivery time to Coimbatore?",
    date: "2026-09-04",
    status: "Closed",
  },
];
