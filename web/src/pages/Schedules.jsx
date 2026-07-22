import { useState, useEffect } from "react";
import {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} from "../services/scheduleService";

const emptyForm = {
    barangay: "",
    dayOfWeek: "",
    time: "",
    wasteType: "",
    notes: "",
};

export default function Schedules() {
    const [schedules, setSchedules] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadSchedules = async () => {
        try {
            const data = await getSchedules();
            setSchedules(data);
        } catch (err) {
            setError("Failed to load schedules.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (editingId) {
                await updateSchedule(editingId, form);
            } else {
                await createSchedule(form);
            }
            setForm(emptyForm);
            setEditingId(null);
            loadSchedules();
        } catch (err) {
            const msg =
                err.response?.data?.message || "Failed to save schedule.";
            setError(msg);
        }
    };

    const handleEdit = (schedule) => {
        setForm({
            barangay: schedule.barangay || "",
            dayOfWeek: schedule.dayOfWeek || "",
            time: schedule.time || "",
            wasteType: schedule.wasteType || "",
            notes: schedule.notes || "",
        });
        setEditingId(schedule.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this schedule?")) return;
        try {
            await deleteSchedule(id);
            loadSchedules();
        } catch (err) {
            setError("Failed to delete schedule.");
        }
    };

    const handleCancel = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    return (
        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
            <h2 style={{ color: "#2e7d32" }}>BasuraTrack</h2>
            <h3>Waste Collection Schedules</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form
                onSubmit={handleSubmit}
                style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 24,
                }}
            >
                <h4>{editingId ? "Edit Schedule" : "Add New Schedule"}</h4>
                <input
                    type="text"
                    name="barangay"
                    placeholder="Barangay"
                    value={form.barangay}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="text"
                    name="dayOfWeek"
                    placeholder="Day of Week (e.g. Monday)"
                    value={form.dayOfWeek}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Time (e.g. 7:00 AM)"
                    value={form.time}
                    onChange={handleChange}
                    required
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="text"
                    name="wasteType"
                    placeholder="Waste Type (e.g. Biodegradable)"
                    value={form.wasteType}
                    onChange={handleChange}
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="text"
                    name="notes"
                    placeholder="Notes (optional)"
                    value={form.notes}
                    onChange={handleChange}
                    style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
                />

                <button type="submit" style={{ padding: "8px 16px", marginRight: 8 }}>
                    {editingId ? "Update" : "Add"} Schedule
                </button>
                {editingId && (
                    <button type="button" onClick={handleCancel} style={{ padding: "8px 16px" }}>
                        Cancel
                    </button>
                )}
            </form>

            {loading ? (
                <p>Loading schedules...</p>
            ) : schedules.length === 0 ? (
                <p>No schedules yet.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                        <th style={{ padding: 8 }}>Barangay</th>
                        <th style={{ padding: 8 }}>Day</th>
                        <th style={{ padding: 8 }}>Time</th>
                        <th style={{ padding: 8 }}>Waste Type</th>
                        <th style={{ padding: 8 }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((s) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: 8 }}>{s.barangay}</td>
                            <td style={{ padding: 8 }}>{s.dayOfWeek}</td>
                            <td style={{ padding: 8 }}>{s.time}</td>
                            <td style={{ padding: 8 }}>{s.wasteType}</td>
                            <td style={{ padding: 8 }}>
                                <button onClick={() => handleEdit(s)} style={{ marginRight: 8 }}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}