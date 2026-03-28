import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being processed.
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          View Orders
        </button>

      </div>
    </div>
  );
}

export default Success;