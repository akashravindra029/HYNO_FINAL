// Utility functions for localStorage operations

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Specific functions for app data
export const saveUser = (user) => {
  saveToLocalStorage('currentUser', user);
};

export const getCurrentUser = () => {
  return getFromLocalStorage('currentUser');
};

export const saveAdmin = (admin) => {
  saveToLocalStorage('currentAdmin', admin);
};

export const getCurrentAdmin = () => {
  return getFromLocalStorage('currentAdmin');
};

export const saveProducts = (products) => {
  saveToLocalStorage('products', products);
};

export const getProducts = () => {
  return getFromLocalStorage('products');
};

export const saveUsers = (users) => {
  saveToLocalStorage('users', users);
};

export const getUsers = () => {
  return getFromLocalStorage('users');
};

export const saveOrders = (orders) => {
  saveToLocalStorage('orders', orders);
};

export const getOrders = () => {
  return getFromLocalStorage('orders');
};
