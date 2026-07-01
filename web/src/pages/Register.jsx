import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    barangay: "",
    contactNumber: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await api.post("/auth/register", form);
      setMessage("Registration successful! Welcome, " + response.data.fullName);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>BasuraTrack</h2>
      <h3>Create your resident account</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
        <input type="text" name="barangay" placeholder="Barangay" value={form.barangay} onChange={handleChange} required style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
        <button type="submit" style={{ width: "100%", padding: 10 }}>Register</button>
      </form>
    </div>
  );
}