import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No items in cart 😔
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-green-600">₹{item.price}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>

                <div className="flex gap-2 items-center">

                  <button
                    onClick={() => {
                      const updated = cart.map((p, i) =>
                        i === index
                          ? { ...p, quantity: (p.quantity || 1) + 1 }
                          : p
                      );
                      setCart(updated);
                    }}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      const updated = cart
                        .map((p, i) =>
                          i === index
                            ? { ...p, quantity: (p.quantity || 1) - 1 }
                            : p
                        )
                        .filter(p => (p.quantity || 1) > 0);

                      setCart(updated);
                    }}
                    className="bg-yellow-500 text-white px-3 rounded"
                  >
                    -
                  </button>

                  <button
                    onClick={() => {
                      setCart(cart.filter((_, i) => i !== index));
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* TOTAL CARD */}
          <div className="bg-white p-6 mt-6 rounded-xl shadow text-right">
            <h3 className="text-xl font-bold">
              Total: ₹{total}
            </h3>

            <button
              onClick={() => {
                const token = localStorage.getItem("token");

                if (!token) {
                  navigate("/login");
                  return;
                }

                navigate("/checkout");
              }}
              className="bg-orange-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-orange-600 hover:scale-105 transition transform"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;