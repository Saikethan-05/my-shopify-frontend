# Multi-Tenant Shopify Frontend Dashboard

## Overview
A React-powered analytics dashboard for multi-tenant Shopify stores. It consumes backend APIs to display products, customers, and orders along with key business metrics such as total revenue, orders by date, and top customers by spend.

## 1 .Setup Instructions

### i . Clone the repository
```bash
git clone https://github.com/Saikethan-05/my-shopify-frontend.git
cd my-shopify-frontend

### ii . Install dependencies

npm install

### iii. Run the development server

npm start


## 2 .Architecture diagram.
   ┌───────────────────┐
   │   Shopify Store    │
   └─────────▲─────────┘
             │
             │ (Data Sync)
             │
   ┌─────────┴─────────┐
   │  Backend Service   │  ← APIs: /products, /customers, /orders, /tenants
   │ (Node.js + MySQL)  │
   └─────────▲─────────┘
             │
             │ (REST API calls via Axios)
             │
   ┌─────────┴─────────┐
   │   React Frontend   │
   │  (Charts + UI)     │
   └────────────────────┘

The frontend fetches this data per-tenant and displays:

->Total Products, Customers, Orders, Revenue

->Orders by Date (line chart)

->Top 5 Customers by Spend (bar chart)



## 3. Known limitations or assumptions.


- **Authentication**: Basic Auth is only implemented on backend onboarding. Frontend has no authentication layer.  

- **Data Freshness**: Charts depend on the latest sync from Shopify → backend. If sync isn’t triggered, frontend may show stale data.  

- **Visualization**: Currently supports only line chart (orders over time) and bar chart (top customers). More advanced analytics (e.g., product sales trends, cohort analysis) can be added later.  

- **Tenant Selection**: Defaults to the first tenant in the list; dropdown is used to switch tenants.  

- **Error Handling**: Errors are logged in the console but not shown in the UI for end-users.  
