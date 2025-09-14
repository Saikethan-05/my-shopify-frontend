
import axios from "axios";

// Your backend base URL
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Products
export const getProducts = async (tenantId) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`, {
      params: { tenantId }  // <-- send tenantId as query
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

// Customers
export const getCustomers = async (tenantId) => {
  try {
    const res = await axios.get(`${BASE_URL}/customers`, {
      params: { tenantId }  // <-- send tenantId as query
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching customers:", err);
    return [];
  }
};

// Orders
export const getOrders = async (tenantId) => {
  try {
    const res = await axios.get(`${BASE_URL}/orders`, {
      params: { tenantId }  // <-- send tenantId as query
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
};

// Tenants
export const getTenants = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tenants`);
    return res.data;
  } catch (err) {
    console.error("Error fetching tenants:", err);
    return [];
  }
};
