import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import RouteIllustration from "../components/RouteIllustration";
import "../styles/auth.css";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await api.post("/auth/login", form);
            const { token, fullName } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(response.data));
            setSuccess("Login successful! Welcome, " + fullName);
            setTimeout(() => navigate("/dashboard"), 800);
        } catch (err) {
            console.error(err);
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-visual">
                <div className="auth-visual-brand">🗑️ BasuraTrack</div>
                <div>
                    <h2 className="auth-visual-tagline">Know your collection day. Every time.</h2>
                    <p className="auth-visual-sub">
                        Track schedules, get reminders, and report missed collections
                        across your barangay in one place.
                    </p>
                    <RouteIllustration />
                </div>
                <div className="auth-visual-footer">Cebu Waste Collection Monitoring System</div>
            </div>

            <div className="auth-panel">
                <div className="auth-form-wrap">
                    <h2>Welcome back</h2>
                    <p className="auth-subtitle">Log in to your resident account</p>

                    {success && <div className="auth-message success">{success}</div>}
                    {error && <div className="auth-message error">{error}</div>}

                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="auth-submit">Log In</button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}