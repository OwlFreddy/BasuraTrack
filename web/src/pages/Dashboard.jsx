import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    const fullName = user?.fullName || "Resident";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dash-shell">
            <aside className="dash-sidebar">
                <div className="dash-sidebar-brand">🗑️ BasuraTrack</div>
                <nav className="dash-nav">
                    <div className="dash-nav-item active">Dashboard</div>
                    <div className="dash-nav-item">Schedule</div>
                    <div className="dash-nav-item">Reports</div>
                    <div className="dash-nav-item">Announcements</div>
                    <div className="dash-nav-item">Profile</div>
                </nav>
                <div className="dash-sidebar-footer">Cebu Waste Collection Monitoring System</div>
            </aside>

            <div className="dash-main">
                <header className="dash-topbar">
                    <h1>Dashboard</h1>
                    <button className="dash-logout" onClick={handleLogout}>Log Out</button>
                </header>

                <main className="dash-content">
                    <div className="dash-content-inner">
                        <h2>Welcome, {fullName}</h2>
                        <p className="dash-subtitle">Here's your collection overview for today.</p>

                        <div className="dash-grid">
                            <div className="dash-card">
                                <span className="dash-card-label">Next Collection</span>
                                <span className="dash-card-value">Not scheduled yet</span>
                            </div>
                            <div className="dash-card">
                                <span className="dash-card-label">Your Barangay</span>
                                <span className="dash-card-value">{user?.barangay || "—"}</span>
                            </div>
                            <div className="dash-card">
                                <span className="dash-card-label">Reports Submitted</span>
                                <span className="dash-card-value">0</span>
                            </div>
                        </div>

                        <div className="dash-panels">
                            <div className="dash-placeholder">
                                Schedule, reminders, and reporting tools will appear here.
                            </div>
                            <div className="dash-side-panel">
                                <h3>Announcements</h3>
                                <p className="dash-subtitle" style={{ marginBottom: 0 }}>
                                    No announcements yet.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}