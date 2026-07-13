import { useState } from "react";
import api from "../services/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
        } catch (err) {
            console.error(err);
            setError("Invalid email or password.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", fontFamily: "sans-serif" }}>
            <h2>BasuraTrack</h2>
            <h3>Log in to your account</h3>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />
                <button type="submit" style={{ width: "100%", padding: 10 }}>
                    Log In
                </button>
            </form>
        </div>
    );
}