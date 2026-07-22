import { useState, useEffect } from "react";
import { getReports, updateReportStatus, deleteReport } from "../services/reportService";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadReports = async () => {
        try {
            const data = await getReports();
            setReports(data);
        } catch (err) {
            setError("Failed to load reports.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReports();
    }, []);

    const handleResolve = async (id) => {
        try {
            await updateReportStatus(id, "RESOLVED");
            loadReports();
        } catch (err) {
            setError("Failed to update report.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this report?")) return;
        try {
            await deleteReport(id);
            loadReports();
        } catch (err) {
            setError("Failed to delete report.");
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
            <h2 style={{ color: "#2e7d32" }}>BasuraTrack</h2>
            <h3>Missed Collection Reports</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
                <p>Loading reports...</p>
            ) : reports.length === 0 ? (
                <p>No reports submitted yet.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                        <th style={{ padding: 8 }}>Reporter</th>
                        <th style={{ padding: 8 }}>Barangay</th>
                        <th style={{ padding: 8 }}>Description</th>
                        <th style={{ padding: 8 }}>Status</th>
                        <th style={{ padding: 8 }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map((r) => (
                        <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: 8 }}>
                                {r.reporterName}
                                <br />
                                <small style={{ color: "#777" }}>{r.reporterEmail}</small>
                            </td>
                            <td style={{ padding: 8 }}>{r.barangay}</td>
                            <td style={{ padding: 8 }}>{r.description}</td>
                            <td style={{ padding: 8 }}>
                  <span
                      style={{
                          color: r.status === "RESOLVED" ? "#2e7d32" : "#c62828",
                          fontWeight: "bold",
                      }}
                  >
                    {r.status}
                  </span>
                            </td>
                            <td style={{ padding: 8 }}>
                                {r.status !== "RESOLVED" && (
                                    <button onClick={() => handleResolve(r.id)} style={{ marginRight: 8 }}>
                                        Mark Resolved
                                    </button>
                                )}
                                <button onClick={() => handleDelete(r.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}