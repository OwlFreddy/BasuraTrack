import api from "./api";

export const getReports = async () => {
    const response = await api.get("/reports");
    return response.data;
};

export const updateReportStatus = async (id, status) => {
    const response = await api.put(`/reports/${id}`, { status });
    return response.data;
};

export const deleteReport = async (id) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
};