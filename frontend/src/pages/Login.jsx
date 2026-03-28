import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post("http://127.0.0.1:8000/api/products/login/", {
      username,
      password
    })
    .then(res => {
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("username", username);
      navigate("/");
    })
    .catch(() => alert("Invalid credentials"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login to SmartCart
        </h2>

        <input
          placeholder="Username"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 hover:scale-105 transition transform"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          New user?{" "}
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;