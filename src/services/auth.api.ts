import axios from "axios";

const backendAPI =
  import.meta.env.VITE_BACKEND_API ?? "http://localhost:8000";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt?: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

const authClient = axios.create({
  baseURL: `${backendAPI}/auth`,
});

// Attach the bearer token to every request if it exists
authClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("skysense_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function signup(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await authClient.post<AuthResponse>("/signup", {
    name,
    email,
    password,
  });
  return res.data;
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await authClient.post<AuthResponse>("/login", {
    email,
    password,
  });
  return res.data;
}

export async function getMe(): Promise<AuthUser> {
  const res = await authClient.get<AuthUser>("/me");
  return res.data;
}