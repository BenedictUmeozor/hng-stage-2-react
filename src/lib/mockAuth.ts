import type { User } from "@/types";

const MOCK_USERS = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Demo User",
    email: "demo@ticketflow.com",
    password: "demo123",
  },
  {
    id: "3",
    name: "Test Admin",
    email: "admin@ticketflow.com",
    password: "admin123",
  },
];

const userStore = [...MOCK_USERS];

export const mockLogin = (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userStore.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        const token = btoa(`${email}:${Date.now()}`);
        resolve({
          user: { id: user.id, name: user.name, email: user.email },
          token,
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
};

export const mockSignup = (
  name: string,
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = userStore.find((u) => u.email === email);

      if (exists) {
        reject(new Error("Email already registered"));
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      userStore.push(newUser);
      const token = btoa(`${email}:${Date.now()}`);

      resolve({
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token,
      });
    }, 800);
  });
};
