import http from "./http";

export async function getDashboardStats() {
  const res = await http.get("/dashboard/stats");
  return res.data;
}

export async function getChartData() {
  const res = await http.get("/dashboard/charts");
  return res.data;
}
