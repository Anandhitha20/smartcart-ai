import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  // ✅ Load product
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // ✅ Load similar products
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/recommend/${id}/`)
      .then(res => setRecommended(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <h2 className="p-10">Loading...</h2>;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      {/* 🧾 PRODUCT DETAILS */}
      <div className="bg-white p-8 rounded-xl shadow flex gap-10">

        <img
          src={product.image}
          className="w-80 h-80 object-cover rounded-xl"
        />

        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="text-green-600 text-2xl mt-2">
              ₹{product.price}
            </p>

            <p className="text-yellow-500 mt-2">
              ⭐⭐⭐⭐☆ (120 reviews)
            </p>

            <p className="mt-4 text-gray-600">
              {product.description || "No description"}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-orange-600 hover:scale-105 transition transform"
          >
            Add to Cart
          </button>

        </div>
      </div>

      {/* 🔥 SIMILAR PRODUCTS */}
      {recommended.length > 0 && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            🔥 Similar Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {recommended.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >

                <img
                  src={item.image}
                  className="w-full h-32 object-cover rounded"
                />

                <h4 className="font-semibold mt-2">{item.name}</h4>

                <p className="text-green-600">₹{item.price}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🚨 prevent navigation
                    addToCart(item);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2 w-full"
                >
                  Add
                </button>

              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;