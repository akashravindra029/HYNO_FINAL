import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// Offer Context
const OfferContext = createContext();

// Offer Reducer
const offerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return {
        ...state,
        offers: action.payload,
      };
    case 'ADD_OFFER':
      const newOffers = [...state.offers, action.payload];
      saveToLocalStorage('offers', newOffers);
      return {
        ...state,
        offers: newOffers,
      };
    case 'UPDATE_OFFER':
      const updatedOffers = state.offers.map(offer =>
        offer.id === action.payload.id ? { ...offer, ...action.payload } : offer
      );
      saveToLocalStorage('offers', updatedOffers);
      return {
        ...state,
        offers: updatedOffers,
      };
    case 'DELETE_OFFER':
      const filteredOffers = state.offers.filter(offer => offer.id !== action.payload);
      saveToLocalStorage('offers', filteredOffers);
      return {
        ...state,
        offers: filteredOffers,
      };
    case 'SET_APPLIED_OFFER':
      return {
        ...state,
        appliedOffer: action.payload,
      };
    case 'CLEAR_APPLIED_OFFER':
      return {
        ...state,
        appliedOffer: null,
      };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  offers: [],
  appliedOffer: null,
};

// Mock offers data (values in INR)
const mockOffers = [
  {
    id: 1,
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrder: 500,
    maxDiscount: 1000,
    expiryDate: '2030-12-31',
    description: '10% off on orders above ₹500',
    active: true,
    usageCount: 0,
    maxUsage: 100,
  },
  {
    id: 2,
    code: 'FLAT200',
    type: 'fixed',
    value: 200,
    minOrder: 1000,
    maxDiscount: null,
    expiryDate: '2030-12-31',
    description: '₹200 off on orders above ₹1000',
    active: true,
    usageCount: 0,
    maxUsage: 50,
  },
  {
    id: 3,
    code: 'PHARMA15',
    type: 'percentage',
    value: 15,
    minOrder: 750,
    maxDiscount: 1500,
    expiryDate: '2030-12-31',
    description: '15% off on pharmacy products above ₹750',
    active: true,
    usageCount: 0,
    maxUsage: 200,
  },
];

// Offer Provider Component
export const OfferProvider = ({ children }) => {
  const [state, dispatch] = useReducer(offerReducer, initialState);

  // Load offers from localStorage on mount
  useEffect(() => {
    const savedOffers = getFromLocalStorage('offers');
    if (savedOffers && savedOffers.length > 0) {
      dispatch({ type: 'SET_OFFERS', payload: savedOffers });
    } else {
      // Initialize with mock offers if none exist
      saveToLocalStorage('offers', mockOffers);
      dispatch({ type: 'SET_OFFERS', payload: mockOffers });
    }
  }, []);

  // Offer Actions
  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: Date.now(),
      usageCount: 0,
      active: true,
    };
    dispatch({ type: 'ADD_OFFER', payload: newOffer });
  };

  const updateOffer = (offerId, updates) => {
    dispatch({ type: 'UPDATE_OFFER', payload: { id: offerId, ...updates } });
  };

  const deleteOffer = (offerId) => {
    dispatch({ type: 'DELETE_OFFER', payload: offerId });
  };

  const validateOffer = (code, orderTotal) => {
    const offer = state.offers.find(o => o.code.toLowerCase() === code.toLowerCase());
    if (!offer) {
      return { valid: false, message: 'Invalid coupon code' };
    }
    if (!offer.active) {
      return { valid: false, message: 'This coupon is no longer active' };
    }
    if (new Date(offer.expiryDate) < new Date()) {
      return { valid: false, message: 'This coupon has expired' };
    }
    if (orderTotal < offer.minOrder) {
      return { valid: false, message: `Minimum order amount is ₹${offer.minOrder}` };
    }
    if (offer.usageCount >= offer.maxUsage) {
      return { valid: false, message: 'This coupon has reached its usage limit' };
    }
    return { valid: true, offer };
  };

  const applyOffer = (code, orderTotal) => {
    const validation = validateOffer(code, orderTotal);
    if (validation.valid) {
      dispatch({ type: 'SET_APPLIED_OFFER', payload: validation.offer });
      return { success: true, offer: validation.offer };
    }
    return { success: false, message: validation.message };
  };

  const calculateDiscount = (offer, subtotal) => {
    if (!offer) return 0;

    let discount = 0;
    if (offer.type === 'percentage') {
      discount = (subtotal * offer.value) / 100;
    } else if (offer.type === 'fixed') {
      discount = offer.value;
    }

    // Apply max discount limit if set
    if (offer.maxDiscount && discount > offer.maxDiscount) {
      discount = offer.maxDiscount;
    }

    return discount;
  };

  const clearAppliedOffer = () => {
    dispatch({ type: 'CLEAR_APPLIED_OFFER' });
  };

  const incrementOfferUsage = (offerId) => {
    const offer = state.offers.find(o => o.id === offerId);
    if (offer) {
      updateOffer(offerId, { usageCount: offer.usageCount + 1 });
    }
  };

  const value = {
    offers: state.offers,
    appliedOffer: state.appliedOffer,
    addOffer,
    updateOffer,
    deleteOffer,
    validateOffer,
    applyOffer,
    calculateDiscount,
    clearAppliedOffer,
    incrementOfferUsage,
  };

  return (
    <OfferContext.Provider value={value}>
      {children}
    </OfferContext.Provider>
  );
};

// Custom hook to use Offer Context
export const useOffer = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffer must be used within an OfferProvider');
  }
  return context;
};
