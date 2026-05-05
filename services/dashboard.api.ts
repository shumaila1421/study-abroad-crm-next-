import http from "./http";

export async function getDashboardStats() {
  const res = await http.get("/dashboard/stats");
  return res.data;
}
