# 🛒 SmartCart 

SmartCart is a full-stack e-commerce web application built using React and Django.  
It allows users to browse products, add items to cart, and place orders with a clean and modern UI.

---

## 🚀 Features

- 🔐 User Authentication (Login & Register using JWT)
- 🛍 Product Listing with Search and Category Filter
- 🤖 AI-Based Product Recommendation (based on category)
- 🛒 Cart with Quantity Management
- 💳 Checkout and Order Placement
- 📦 Order History for each user
- 👤 User Profile Page
- ➕ Add Product (from frontend)
- 🎨 Responsive UI using Tailwind CSS

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios

**Backend:**
- Django
- Django REST Framework
- JWT Authentication

**Database:**
- SQLite

---

## 🧠 How Recommendation Works

When a user views a product, the system suggests similar products based on the same category.  
This improves user experience by helping users discover related items.

---

## 📸 Screenshots

### 🏠 Home Page
![Home](screenshots/home.png)

### 🛒 Cart Page
![Cart](screenshots/cart.png)

### 📦 Orders Page
![Orders](screenshots/orders.png)

### 📱 Product Details
![Product](screenshots/product.png)

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

git clone https://github.com/Anandhitha20/smartcart-ai.git

cd smartcart-ai

### 2️⃣ Backend setup

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py runserver

### 3️⃣ Frontend setup

cd frontend

npm install

npm run dev


---

## 💡 Key Highlights

- Dynamic category system (auto updates based on products)
- Persistent cart using localStorage
- Quantity-based cart system
- Clean and consistent UI design
- Complete user flow (Login → Browse → Cart → Checkout → Orders)

---

## 🚧 Future Improvements

- 💳 Payment Gateway Integration
- ❤️ Wishlist Feature
- 📊 Admin Dashboard
- 🔍 Advanced AI Recommendations

