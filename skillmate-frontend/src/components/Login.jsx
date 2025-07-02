import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // Important for cookies
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token and userId properly
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        // ✅ Navigate after storing
        navigate("/portfolio");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Log In</button>
      <a className="link" href="/signup">Don't have an account? Sign up</a>
    </div>
  );
};

export default Login;
