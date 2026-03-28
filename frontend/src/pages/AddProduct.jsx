import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    axios.post(
      "http://127.0.0.1:8000/api/products/add/",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {
      alert("✅ Product added successfully!");
      navigate("/");
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          ➕ Add Product
        </h2>

        <input name="name" placeholder="Name" className="w-full p-2 border mb-3" onChange={handleChange} />
        <input name="price" placeholder="Price" className="w-full p-2 border mb-3" onChange={handleChange} />
        <input name="category" placeholder="Category" className="w-full p-2 border mb-3" onChange={handleChange} />
        <input name="image" placeholder="Image URL" className="w-full p-2 border mb-3" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full p-2 border mb-3" onChange={handleChange} />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Add Product
        </button>

      </div>
    </div>
  );
}

export default AddProduct;