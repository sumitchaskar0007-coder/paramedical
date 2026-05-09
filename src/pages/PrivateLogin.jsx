import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminUser = "jadhavar";
    const adminPass = "jadhavar2020";

    if (username === adminUser && password === adminPass) {

      localStorage.setItem("privateAuth", true);
      navigate("/private");

    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-lg shadow-lg w-[350px]"
      >

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="mb-4 text-blue-600 hover:underline text-sm"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Private Document Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>
  );
}