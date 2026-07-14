import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RouteIllustration from "../components/RouteIllustration";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", barangay: "", contactNumber: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await api.post("/auth/register", form);
      setMessage("Registration successful! Welcome, " + response.data.fullName);
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
      <div className="auth-page">
        <div className="auth-visual">
          <div className="auth-visual-brand">🗑️ BasuraTrack</div>
          <div>
            <h2 className="auth-visual-tagline">Join your barangay's collection network.</h2>
            <p className="auth-visual-sub">
              Register once to view schedules, get reminders, and report
              missed pickups near you.
            </p>
            <RouteIllustration />
          </div>
          <div className="auth-visual-footer">Cebu Waste Collection Monitoring System</div>
        </div>

        <div className="auth-panel">
          <div className="auth-form-wrap">
            <h2>Create your account</h2>
            <p className="auth-subtitle">Sign up as a resident</p>

            {message && <div className="auth-message success">{message}</div>}
            {error && <div className="auth-message error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" type="text" name="fullName" placeholder="Juan Dela Cruz"
                       value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder="you@email.com"
                       value={form.email} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="••••••••"
                       value={form.password} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label htmlFor="barangay">Barangay</label>
                <input id="barangay" type="text" name="barangay" placeholder="Barangay Lahug"
                       value={form.barangay} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label htmlFor="contactNumber">Contact Number</label>
                <input id="contactNumber" type="text" name="contactNumber" placeholder="09XX XXX XXXX"
                       value={form.contactNumber} onChange={handleChange} />
              </div>
              <button type="submit" className="auth-submit">Register</button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
  );
}