import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  // ✅ CORRECT TOTAL (WITH QUANTITY)
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handlePayment = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ SEND ITEMS WITH QUANTITY
    const items = cart.map(item => ({
      id: item.id,
      quantity: item.quantity || 1
    }));

    axios.post(
      "http://127.0.0.1:8000/api/products/order/",
      { items },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      alert("✅ Payment Successful!");

      setCart([]);
      localStorage.removeItem("cart");

      navigate("/success");
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">💳 Checkout</h2>

      {cart.map((item, index) => (
        <div key={index} className="bg-white p-4 mb-3 rounded shadow flex justify-between">
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price} × {item.quantity || 1}</p>
          </div>

          <p className="font-bold">
            ₹{item.price * (item.quantity || 1)}
          </p>
        </div>
      ))}

      {/* ✅ TOTAL */}
      <h3 className="text-xl font-bold mt-4">
        Total Amount: ₹{total}
      </h3>

      {/* ✅ PAYMENT BUTTON */}
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-green-700"
      >
        Confirm Payment
      </button>

    </div>
  );
}

export default Checkout;