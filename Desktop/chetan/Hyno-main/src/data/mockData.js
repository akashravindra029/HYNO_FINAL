// Mock data for the pharmacy app

import { getOrders } from '../utils/localStorage';

export const products = [
  {
    id: 1,
    name: 'Metformin 500mg',
    category: 'Diabetes',
    price: 15.99,
    image: 'https://via.placeholder.com/300x200?text=Metformin',
    stock: 50,
    description: 'Oral diabetes medicine that helps control blood sugar levels.',
  },
  {
    id: 2,
    name: 'Insulin Glargine',
    category: 'Diabetes',
    price: 89.99,
    image: 'https://via.placeholder.com/300x200?text=Insulin+Glargine',
    stock: 30,
    description: 'Long-acting insulin used to control high blood sugar in adults and children.',
  },
  {
    id: 3,
    name: 'Paracetamol 500mg',
    category: 'Fever',
    price: 8.99,
    image: 'https://via.placeholder.com/300x200?text=Paracetamol',
    stock: 100,
    description: 'Pain reliever and fever reducer.',
  },
  {
    id: 4,
    name: 'Ibuprofen 200mg',
    category: 'Painkillers',
    price: 12.99,
    image: 'https://via.placeholder.com/300x200?text=Ibuprofen',
    stock: 75,
    description: 'Nonsteroidal anti-inflammatory drug (NSAID) used for pain relief.',
  },
  {
    id: 5,
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins & Supplements',
    price: 19.99,
    image: 'https://via.placeholder.com/300x200?text=Vitamin+D3',
    stock: 60,
    description: 'Essential vitamin for bone health and immune function.',
  },
  {
    id: 6,
    name: 'Baby Shampoo 200ml',
    category: 'Baby Care',
    price: 9.99,
    image: 'https://via.placeholder.com/300x200?text=Baby+Shampoo',
    stock: 40,
    description: 'Gentle shampoo for babies and toddlers.',
  },
  {
    id: 7,
    name: 'Folic Acid 400mcg',
    category: 'Women Care',
    price: 14.99,
    image: 'https://via.placeholder.com/300x200?text=Folic+Acid',
    stock: 80,
    description: 'Important for women planning pregnancy and during early pregnancy.',
  },
];

export const categories = [
  'Diabetes',
  'Fever',
  'Painkillers',
  'Vitamins & Supplements',
  'Baby Care',
  'Women Care',
];

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, State 12345',
    dob: '1990-01-01',
    gender: 'Male',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    address: '456 Oak Ave, City, State 12345',
    dob: '1985-05-15',
    gender: 'Female',
  },
];

const mockOrders = [
  {
    id: 1,
    userId: 1,
    userName: 'John Doe',
    items: [
      { id: 1, name: 'Metformin 500mg', quantity: 2, price: 15.99 },
      { id: 3, name: 'Paracetamol 500mg', quantity: 1, price: 8.99 },
    ],
    total: 40.97,
    status: 'Delivered',
    date: '2023-10-01',
    prescription: null,
  },
  {
    id: 2,
    userId: 2,
    userName: 'Jane Smith',
    items: [
      { id: 5, name: 'Vitamin D3 1000IU', quantity: 1, price: 19.99 },
    ],
    total: 19.99,
    status: 'Processing',
    date: '2023-10-05',
    prescription: 'prescription1.jpg',
  },
];

export const orders = getOrders() || mockOrders;

export const adminCredentials = {
  email: 'admin@hynopharmacy.com',
  password: 'admin123',
};
