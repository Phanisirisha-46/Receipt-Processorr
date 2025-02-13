# Receipt Processing System

## Overview
The Receipt Processing System is designed to efficiently manage and process receipts. It allows users to add items, generate receipts with unique IDs, and earn points based on their purchases.

## Features
- Add items with their respective prices.
- Automatically generate a unique Receipt ID.
- Process receipts and store transaction details.
- Calculate and display reward points based on the total amount.

## Example Transaction

### User Details
- **Name:** Vaish  
- **Date:** 14-02-2025  
- **Time:** 15:09  
- **Total Amount:** $100  

### Items Purchased

| Item Name | Item Price |
|-----------|------------|
| Hat       | $100       |

### Processed Receipt
- **Receipt ID:** `67adbde872c4a6ebcea46d96`  
- **Earned Points:** `115`  

## Usage
1. Add items with their respective prices.
2. Click **Process Receipt** to generate a unique Receipt ID.
3. Click **Get Points** to view the reward points earned.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Installation

# **Receipt Processor API**

## **1. Clone the Repository**
To get started, clone the repository using Git:
```bash
git clone https://github.com/Phanisirisha-46/Receipt-Processor.git
cd Receipt-Processor
```

---

## **2. Click on the Deployed Link**
- Open your browser and visit:
  ```
  https://receipt-processorr.onrender.com/
  ```
  This will open the homepage of the Receipt Processing System.

---

## **3. Test API Endpoints Using Postman**

### **a) Submit a Receipt (`POST /receipts/process`)**
1. Open **Postman**.
2. Select **POST** method.
3. Enter the URL:
   ```
   https://receipt-processorr.onrender.com/receipts/process
   ```
4. Go to **Body** → **raw** → **JSON**.
5. Add the following JSON data:
   ```json
   {
     "retailer": "StoreX",
     "purchaseDate": "2025-02-13",
     "purchaseTime": "14:30",
     "items": [
       { "shortDescription": "Item A", "price": "5.00" },
       { "shortDescription": "Item B", "price": "2.50" }
     ],
     "total": "7.50"
   }
   ```
6. Click **Send**.

- **Response Example:**
  ```json
  { "id": "65cf1f3e2a9b7c0012345678" }
  ```

---

### **b) Retrieve Points for a Receipt (`GET /receipts/:id/points`)**
1. Replace `:id` with the **receipt ID** received from the previous request.
2. Open **Postman**.
3. Select **GET** method.
4. Enter the URL:
   ```
   https://receipt-processorr.onrender.com/receipts/67ade1474fd81787633862e6/points
   ```
5. Click **Send**.

- **Response Example:**
  ```json
  { "receiptId": "67ade1474fd81787633862e6", "points": 78 }
  ```
