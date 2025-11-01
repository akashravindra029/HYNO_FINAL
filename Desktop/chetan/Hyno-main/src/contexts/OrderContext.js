import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getOrders, saveOrders } from '../utils/localStorage';

// Order Context
const OrderContext = createContext();

// Order Reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'ADD_ORDER':
      const newOrders = [...state.orders, action.payload];
      saveOrders(newOrders);
      return {
        ...state,
        orders: newOrders,
      };
    case 'UPDATE_ORDER':
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id ? { ...order, ...action.payload } : order
      );
      saveOrders(updatedOrders);
      return {
        ...state,
        orders: updatedOrders,
      };
    case 'CANCEL_ORDER':
      const cancelledOrders = state.orders.map(order =>
        order.id === action.payload ? { ...order, status: 'Cancelled' } : order
      );
      saveOrders(cancelledOrders);
      return {
        ...state,
        orders: cancelledOrders,
      };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  orders: [],
};

// Order Provider Component
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = getOrders();
    if (savedOrders) {
      dispatch({ type: 'SET_ORDERS', payload: savedOrders });
    }
  }, []);

  // Order Actions
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(), // Simple ID generation
      orderDate: new Date().toISOString(),
      trackingNumber: `TRK${Date.now()}`,
      status: 'Pending',
      shipmentStatus: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          description: 'Your order has been successfully placed',
        },
      ],
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    return newOrder.id;
  };

  const updateOrder = (orderId, updates) => {
    dispatch({ type: 'UPDATE_ORDER', payload: { id: orderId, ...updates } });
  };

  const cancelOrder = (orderId) => {
    dispatch({ type: 'CANCEL_ORDER', payload: orderId });
  };

  const getOrderById = (orderId) => {
    return state.orders.find(order => order.id === orderId);
  };

  const getOrdersByUser = (userId) => {
    return state.orders.filter(order => order.userId === userId);
  };

  const updateShipmentStatus = (orderId, newStatus, description = '') => {
    const order = getOrderById(orderId);
    if (order) {
      const updatedShipmentStatus = [
        ...order.shipmentStatus,
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          description: description || `Order status updated to ${newStatus}`,
        },
      ];
      updateOrder(orderId, { status: newStatus, shipmentStatus: updatedShipmentStatus });
    }
  };

  const value = {
    orders: state.orders,
    addOrder,
    updateOrder,
    cancelOrder,
    getOrderById,
    getOrdersByUser,
    updateShipmentStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use Order Context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
