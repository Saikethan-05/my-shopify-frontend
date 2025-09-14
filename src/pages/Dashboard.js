
import React, { useEffect, useState } from "react";
import { getTenants, getProducts, getCustomers, getOrders } from "../services";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

const Dashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    const tenantList = await getTenants();
    setTenants(tenantList);
    if (tenantList.length > 0) {
      setSelectedTenant(tenantList[0].id); // default first tenant
    }
  };

  useEffect(() => {
    if (selectedTenant) {
      fetchData(selectedTenant);
    }
  }, [selectedTenant]);

  const fetchData = async (tenantId) => {
    const [prods, custs, ords] = await Promise.all([
      getProducts(tenantId),
      getCustomers(tenantId),
      getOrders(tenantId),
    ]);
    setProducts(prods);
    setCustomers(custs);
    setOrders(ords);
  };

  // Revenue calculation
  const totalRevenue = orders.reduce((acc, o) => acc + parseFloat(o.total_price || 0), 0);

  // Orders by date
  const ordersByDateMap = {};
  orders.forEach((o) => {
    const date = o.created_at ? o.created_at.split("T")[0] : "Unknown";
    ordersByDateMap[date] = (ordersByDateMap[date] || 0) + 1;
  });
  const ordersByDate = Object.keys(ordersByDateMap).map((date) => ({ date, orders: ordersByDateMap[date] }));


  // Top 5 customers by spend
const topCustomers = customers
  .map((c) => {
    const spend = orders
      .filter((o) => o.customer_id === c.shopifyId)   // FIX HERE
      .reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);

    return { 
      name: `${c.first_name || ""} ${c.last_name || ""}`.trim() || c.email,
      spend 
    };
  })
  .sort((a, b) => b.spend - a.spend)
  .slice(0, 5);




  return (
    <div style={{ padding: "20px" }}>
      <h1>Multi-Tenant Shopify Dashboard</h1>

      {/* Tenant selector */}
      <div>
        <label>Select Store: </label>
        <select value={selectedTenant || ""} onChange={(e) => setSelectedTenant(e.target.value)}>
          {tenants.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <p>Total Products: {products.length}</p>
      <p>Total Customers: {customers.length}</p>
      <p>Total Orders: {orders.length}</p>
      <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>

      <h2>Orders by Date</h2>
      <LineChart width={600} height={300} data={ordersByDate}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
      </LineChart>

      <h2>Top 5 Customers by Spend</h2>
      <BarChart width={600} height={300} data={topCustomers}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="spend" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;

