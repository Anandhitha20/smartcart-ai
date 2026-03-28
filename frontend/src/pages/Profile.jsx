import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/api/products/orders/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="bg-white p-8 rounded-xl shadow max-w-md mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-center">
          👤 My Profile
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">Username</p>
            <p className="font-semibold">{username || "User"}</p>
          </div>

          <div>
            <p className="text-gray-500">Total Orders</p>
            <p className="font-semibold">{orders.length}</p>
          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            window.location.href = "/";
          }}
          className="w-full bg-red-500 text-white py-2 mt-6 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;