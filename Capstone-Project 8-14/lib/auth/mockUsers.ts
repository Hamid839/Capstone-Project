import type { User } from "./types";

export type StoredUser = User & {
  password: string;
};

// Initial demo users
let users: StoredUser[] = [
  {
    id: "u1",
    name: "Hamid Shoukat",
    email: "hamid@hisabdo.com",
    phone: "0300-1234567",
    businessName: "Hamid Traders",
    password: "123456",
    createdAt: new Date().toISOString(),
  },
];

export function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  businessName?: string;
}) {
  const exists = findUserByEmail(data.email);
  if (exists) {
    throw new Error("Email already registered");
  }

  const newUser: StoredUser = {
    id: "u" + Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    businessName: data.businessName,
    password: data.password,
    createdAt: new Date().toISOString(),
  };

  users = [...users, newUser];
  return newUser;
}

export function validateLogin(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return null;
  }
  // Return user without password
  const { password: _, ...safeUser } = user;
  return safeUser;
}