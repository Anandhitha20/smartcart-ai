import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";

function App() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // ✅ Load products
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products/")
      .then(res => setProducts(res.data));
  }, []);


const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart && savedCart !== "undefined") {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const getRecommendations = (id) => {
    axios.get(`http://127.0.0.1:8000/api/products/recommend/${id}/`)
      .then(res => setRecommended(res.data))
      .catch(err => console.error(err));
  };

  const addToCart = (product) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">

        <h2 className="text-2xl font-bold text-orange-500">
          🛒 SmartCart
        </h2>

        <div className="flex items-center gap-6 font-medium">
          <Link className="hover:text-orange-500" to="/">Home</Link>
          <Link className="hover:text-orange-500" to="/cart">
            Cart ({cart.length})
          </Link>
          <Link className="hover:text-orange-500" to="/orders">Orders</Link>

          <Link
            to="/register"
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            Register
          </Link>

          {token ? (
            <>
              <span className="text-gray-600">👤 Logged In</span>

              <button
                onClick={() => {
                  localStorage.removeItem("cart");
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
            >
              Login
            </Link>
          )}
          <Link to="/profile" className="hover:text-orange-500">
            Profile
          </Link>

          <Link to="/add-product" className="hover:text-orange-500">
            Add Product
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={
          <Home
            products={products}
            addToCart={addToCart}
            getRecommendations={getRecommendations}
            recommended={recommended}
          />
        } />

        <Route path="/cart" element={
          <Cart cart={cart} setCart={setCart} />
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/product/:id" element={
          <ProductDetails addToCart={addToCart} />
        } />

        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={
          <Checkout cart={cart} setCart={setCart} />
        } />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;