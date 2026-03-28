import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ products = [], addToCart, getRecommendations, recommended = [] }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);


  // 🔍 Filter logic
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || p.category === category)
  );

  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-center py-6 text-2xl font-bold shadow mb-6">
        Welcome to SmartCart 🚀
      </div>

      <div className="flex">

        {/* 📌 SIDEBAR */}
        <div className="w-1/5 bg-white p-4 shadow">
          <h3 className="font-bold mb-3">Categories</h3>

          {categories.map(cat => (
            <p
              key={cat}
              className={`cursor-pointer mb-2 ${
                (cat === "All" && category === "") || category === cat
                  ? "text-orange-500 font-semibold"
                  : "hover:text-orange-500"
              }`}
              onClick={() => setCategory(cat === "All" ? "" : cat)}
            >
              {cat}
            </p>
          ))}
        </div>

        {/* 🛍 MAIN CONTENT */}
        <div className="w-4/5 p-6">

          {/* 🔍 SEARCH BAR */}
          <input
            placeholder="Search products..."
            className="w-full p-2 border rounded mb-6"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ⏳ LOADING SKELETON */}
          {loading && (
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-40 animate-pulse rounded"></div>
              ))}
            </div>
          )}

          {/* 🛒 PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition transform hover:scale-105"
              >

                {/* IMAGE */}
                <img
                  src={product.image || "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"}
                  className="w-full h-40 object-cover rounded cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />

                {/* NAME */}
                <h3
                  className="mt-2 font-semibold cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>

                {/* PRICE */}
                <p className="text-green-600 font-bold">₹{product.price}</p>

                {/* ⭐ RATING */}
                <div className="text-yellow-400 text-sm">⭐⭐⭐⭐☆</div>

                {/* BUTTONS */}
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => getRecommendations(product.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Similar
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🤖 AI RECOMMENDATIONS */}
          {recommended.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                🔥 Recommended for you
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommended.map(item => (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >

                    <img
                      src={item.image || "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"}
                      className="w-full h-32 object-cover rounded"
                    />

                    <h4 className="font-semibold mt-2">{item.name}</h4>
                    <p className="text-green-600">₹{item.price}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 prevent redirect
                        addToCart(item);
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded mt-2 w-full"
                    >
                      Add
                    </button>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Home;