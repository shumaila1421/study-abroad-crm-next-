// client/services/auth.api.ts

import http from "./http";
import { User } from "../types/user";

export async function login(
  email: string,
  password: string,
): Promise<{ user: User; token: string }> {
  const res = await http.post("/auth/login", { email, password });
  return res.data;
}

export async function register(
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<{ user: User; token: string }> {
  const res = await http.post("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return res.data;
}

export async function logoutApi(): Promise<void> {
  localStorage.clear();
}
