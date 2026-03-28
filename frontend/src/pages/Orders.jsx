import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

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

      <h2 className="text-3xl font-bold mb-6">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          📦 No orders yet 😔
        </div>
      ) : (
        orders.map(order => {

          const orderTotal = order.items.reduce(
            (sum, item) => sum + (item.total || item.price),
            0
          );

          return (
            <div
              key={order.id}
              className="bg-white p-6 mb-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >

              {/* 🔥 ORDER HEADER WITH STATUS */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">
                  Order #{order.id}
                </h3>

                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm">
                  ⏳ Pending
                </span>
              </div>

              {/* 🧾 ITEMS */}
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-2"
                >
                  <span>
                    {item.name} {item.quantity ? `(x${item.quantity})` : ""}
                  </span>

                  <span className="font-medium">
                    ₹{item.total || item.price}
                  </span>
                </div>
              ))}

              {/* 💰 TOTAL */}
              <div className="text-right mt-4 font-bold text-lg">
                Total: ₹{orderTotal}
              </div>

            </div>
          );
        })
      )}

    </div>
  );
}

export default Orders;